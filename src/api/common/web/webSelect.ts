import {
  DeptWebSelectParams,
  DeptWebSelectModel
} from './model/webSelectModel';

import { lorealHttp } from '/@/utils/http/axios';

enum Api {
  DeptList = '/common/web/select/deptList',
}

export const selectMdDeptList = (params?: DeptWebSelectParams) =>
  lorealHttp.post<Array<DeptWebSelectModel>>({ url: Api.DeptList, params });





