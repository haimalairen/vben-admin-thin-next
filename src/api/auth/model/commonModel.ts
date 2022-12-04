import { BasicFetchResult } from '/@/api/model/baseModel';

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export type AuthorParams = {
  menuId:string
}

export type AuthorListModel = {
  key:string;
  id:number;
  createTime:string | null;
  creator:string | null;
  menuId:number;
  opName:string;
  opNo:string;
  opType:number;
  pageOpId:number;
  remark:string | null;
  selected:boolean;
  updateTime:string | null;
  updater:string | null;
}
export type addMenuParams = {
  clientId:string;
  menuPageOpList?:Array<AuthorListModel>
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

/**
 * @description: Request list return value
 */

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;
