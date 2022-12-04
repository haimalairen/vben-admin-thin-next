import { lorealHttp } from '/@/utils/http/axios';

import {
  PageInfoModel
} from "/@/api/md/model/PageInfo";

import {
  PageInfoParams
} from "/@/api/md/model/PageInfoParams";



enum Api {
  PageInfo = '/md/innerCar/pageInfo', //访客预约列表-查询
  Add = '/md/innerCar/addSubmit',//新增内部车辆
  Edit = '/md/innerCar/editSubmit',//编辑内部车辆
  Delete = '/md/innerCar/deleteSubmit',//删除内部车辆
}

export const getPageInfo = (params?: PageInfoParams) =>
  lorealHttp.post<PageInfoModel>({ url: Api.PageInfo, params });

export const add = (params: any) =>
  lorealHttp.post<any>({ url: Api.Add, params },{autoMessage:true,autoMessageSuccess:'添加成功！'});

export const edit = (params: any) =>
  lorealHttp.post<any>({ url: Api.Edit, params },{autoMessage:true,autoMessageSuccess:'编辑成功！'});

export const del = (params: any) =>
  lorealHttp.post<any>({ url: Api.Delete, params },{autoMessage:true,autoMessageSuccess:'删除成功！'});


