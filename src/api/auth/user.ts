import {
  MenuParams,
  AuthorParams,
  addMenuParams,
  MenuListGetResultModel,
} from './model/commonModel';
import { lorealHttp } from '/@/utils/http/axios';

enum Api {
  UserList = '/fm/fmUser/pageInfo',
  AddUser = '/fm/fmUser/add',
  EditUser = '/fm/fmUser/update',
  DelUser = '/fm/fmUser/delete',
  GetDeparts = '/common/web/select/deptList',
  GetRoles = '/fm/fmUser/getAllRoleList/tms',
  GetUserType = '/common/web/select/userTypeList',
}

export const getUserList = (params?: MenuParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.UserList, params });

export const addUser = (params: AuthorParams) =>
  lorealHttp.post<MenuListGetResultModel>(
    { url: Api.AddUser, params },
    { autoMessage: true, autoMessageSuccess: '添加成功！' },
  );

export const editUser = (params: addMenuParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.EditUser, params },{autoMessage:true,autoMessageSuccess:'编辑成功！'});

export const delUser = (id: Number) =>
  lorealHttp.post<MenuListGetResultModel>(
    { url: `${Api.DelUser}/${id}` },
    { autoMessage: true, autoMessageSuccess: '删除成功！' },
  );

export const getDepartments = () => lorealHttp.post<any>({ url: Api.GetDeparts });

export const getRoles = () => lorealHttp.post<any>({ url: Api.GetRoles });

export const getUserType = (params?):any => lorealHttp.post({ url: Api.GetUserType, params });
