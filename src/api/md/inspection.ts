import { lorealHttp } from '/@/utils/http/axios';

import {
  PageInfoModel
} from "/@/api/md/model/PageInfo";

import {
  PageInfoParams
} from "/@/api/md/model/PageInfoParams";



enum Api {
  PageInfo = '/md/innerCarCheck/pageInfo', //查询车辆检查
  Add = '/md/innerCarCheck/addInnerCarCheckItem',//新增车辆检查
  Edit = '/md/innerCarCheck/editInnerCarCheckItem',//编辑车辆检查
  GetCarCode = '/md/innerCarCheck/selectCarCode',//车辆类型编码查询
}

export const getPageInfo = (params?: PageInfoParams) =>
  lorealHttp.post<PageInfoModel>({ url: Api.PageInfo, params });

export const edit = (params: any) =>
  lorealHttp.post<any>({ url: Api.Edit, params },{autoMessage:true,autoMessageSuccess:'编辑成功！'});

export const getCarCode = (params?: any) =>
  lorealHttp.post<any>({ url: Api.GetCarCode, params });

export const add = (params: any) =>
  lorealHttp.post<any>({ url: Api.Add, params },{autoMessage:true,autoMessageSuccess:'新增成功！'});


