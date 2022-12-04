import { defHttp, lorealHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
  GetLorealList = '/fmUser/login'
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

export const getLorealMenuList = (params?:any) => {
  return lorealHttp.post<any>({ url: Api.GetLorealList,params },{isTransformResponse:false});
};
