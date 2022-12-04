/**
 * @description: Login interface parameters
 */
 import type { UserInfo } from '/#/store';
export interface LoginParams {
  userNo: string; //账号
  pwd: string; //密码
  platForm: string; //平台类型 Web、App、PC
  yzmCode:string; //验证码
  userCategory:string; //账号类别（office：Office员工（域登录）, other:其他）必填
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  clients:Array<any>;
  menus:Object;
  user:UserInfo | null;
  token:string;
  refreshToken:string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 用户名
  userName: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface RefreshParams {
  platForm: 'Web'|'App'|'PC',
  refreshToken:string
}
