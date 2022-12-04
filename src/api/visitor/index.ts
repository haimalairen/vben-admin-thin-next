import {
  MenuParams,
  AuthorParams,
  addMenuParams,
  MenuListGetResultModel,
} from './model/commonModel';
import { lorealHttp } from '/@/utils/http/axios';

enum Api {
  UserList = '/bd/visitor/appointment/pageInfo', //访客预约列表-查询
  AddUser = '/bd/visitor/appointment/internalAppointment',  //内部预约_新增
  EditUser = '/bd/visitor/appointment/update', //内部预约-修改
  DelUser = '/bd/visitor/appointment/cancel', //内部预约-取消
  UploadOrder = '/bd/visitor/appointment/updateToBUpdate', //导入访客列表
  ExportOrder = '/bd/visitor/appointment/export', //导出访客列表
  DownloadOrder = '/bd/visitor/appointment/template/visitorAppointmentImport' //下载上传模板
}

export const getUserList = (params?: MenuParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.UserList, params });

export const addUser = (params: AuthorParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.AddUser, params },{autoMessage:true,autoMessageSuccess:'新增成功！'});

export const editUser = (params: addMenuParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.EditUser, params },{autoMessage:true,autoMessageSuccess:'编辑成功！'});

export const delUser = (params: addMenuParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.DelUser, params },{autoMessage:true,autoMessageSuccess:'删除成功！'});
  
export const uploadOrder = (params:any) =>{
  return lorealHttp.uploadFile({
    url:Api.UploadOrder
  },params)
}

export const downLoadOrder = () =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.DownloadOrder },{autoMessage:true,autoMessageSuccess:'下载成功！'});

export const exportOrder = () =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.ExportOrder },{autoMessage:true,autoMessageSuccess:'导出成功！'});


