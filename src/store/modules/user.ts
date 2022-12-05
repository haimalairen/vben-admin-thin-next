import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { createSessionStorage } from '/@/utils/cache';
import { GetUserInfoModel, LoginParams, RefreshParams } from '/@/api/sys/model/userModel';
import { doLogout, getUserInfo, loginApi, refreshToken, demoLoginApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { h } from 'vue';
import { useAppStoreWithOut } from '/@/store/modules/app';
import { PermissionModeEnum } from '/@/enums/appEnum';

const ss = createSessionStorage();
const appStore = useAppStoreWithOut();
interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const permissionMode = appStore.getProjectConfig.permissionMode;
        const { token, user, menus, clients, refreshToken } =
          permissionMode === PermissionModeEnum.BACK
            ? await loginApi(loginParams, mode)
            : await demoLoginApi(loginParams, mode);
        //save menus、clients
        ss.set('menus', menus);
        ss.set('clients', clients);
        ss.set('refresh', refreshToken);
        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome, user, menus);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(
      goHome?: boolean,
      synUserInfo?: UserInfo | null,
      fromLoginMenus?,
    ): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;

      const userInfo = await this.getUserInfoAction(synUserInfo);

      const sessionTimeout = this.sessionTimeout; // token time expiration
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction(fromLoginMenus);
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(fromLoginUserInfo?): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      // get user info,if get userinfo from a special interface by call this.getUserInfo()
      // userinfo would be from session or login interface or special interface
      const userInfo = ss.get(USER_INFO_KEY) ?? fromLoginUserInfo ?? (await getUserInfo());
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    async refreshToken() {
      const params: RefreshParams = {
        refreshToken: ss.get('refresh'),
        platForm: 'Web',
      };
      console.log('params:',params);
      const {msg,obj} = await refreshToken(params);
      if(msg!='成功'){
        const {createErrorModal } = useMessage();
        const { t } = useI18n();
        createErrorModal({ title: t('sys.api.errorTip'), content: '登录已超时，请重新登录！',onOk:this.forceLogout});
        throw new Error(t('sys.api.apiRequestFailed'))
      }
      this.setToken(obj);
      return obj;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    forceLogout(){
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      router.push(PageEnum.BASE_LOGIN);
    },
    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
