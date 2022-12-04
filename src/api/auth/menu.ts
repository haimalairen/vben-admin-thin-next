import {
  MenuParams,
  AuthorParams,
  addMenuParams,
  MenuListGetResultModel,
} from './model/commonModel';
import { lorealHttp } from '/@/utils/http/axios';

enum Api {
  MenuList = '/fm/fmMenu/pageInfo',
  AuthorList = '/fm/fmMenu/listMenuPageOp',
  addMenu = '/fm/fmMenu/add',
  editMenu = '/fm/fmMenu/update',
  DelMenu = '/fm/fmMenu/delete',
}

export const getMenuList = (params?: MenuParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getAuthors = (params: AuthorParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: `${Api.AuthorList}/${params.menuId}` });

export const addMenu = (params: addMenuParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.addMenu, params },{autoMessage:true,autoMessageSuccess:'新增成功！'});

export const editMenu = (params: addMenuParams) =>
  lorealHttp.post<MenuListGetResultModel>({ url: Api.editMenu, params },{autoMessage:true,autoMessageSuccess:'编辑成功！'});

export const delMenu = (params: any) =>
  lorealHttp.post<any>({ url: `${Api.DelMenu}/${params.menuId}` },{isTransformResponse:false});
