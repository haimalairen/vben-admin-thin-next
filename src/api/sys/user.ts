import { defHttp,lorealHttp,refreshHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel,RefreshParams } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum demoApi {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

enum Api {
  Login = '/fmUser/login',
  Refresh = '/fmUser/refresh',
  Logout = '/logout',
}

/**
 * @description: user login api
 */
export function demoLoginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: demoApi.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return lorealHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
//refresh token by this interface,should be use a special 
export function refreshToken(params:RefreshParams) {
  return refreshHttp.post<any>({ url: Api.Refresh,params }, { errorMessageMode: 'none',isTransformResponse:false });
}


/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: demoApi.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: demoApi.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: demoApi.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: demoApi.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
