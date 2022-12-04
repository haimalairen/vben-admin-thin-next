import {BasicColumn, FormSchema} from '/@/components/Table';
import { selectMdDeptList } from '/@/api/common/web/webSelect';
import {useMenuStore} from "/@/views/visitor/order_list/user.store";
const menuStore = useMenuStore();
const deptWebSelectHandler = async function() {
  const deptList = await selectMdDeptList();
  menuStore.optLists = deptList.map(item=>{
    return {
      label: item.deptName,
      value: item.deptNo
    }
  });
}
await deptWebSelectHandler();
export const columns: BasicColumn[] = [
  {title: '园区', dataIndex: 'parkName', width: 100, align: 'left'},
  {title: '车牌号', dataIndex: 'plateNumber', width: 180},
  {title: '车辆类型', dataIndex: 'carTypeName', width: 100},
  {title: '部门', dataIndex: 'deptName', width: 120, align: 'left'},
  {title: '联系人', dataIndex: 'contactName', width: 120, align: 'left'},
  {title: '电话', dataIndex: 'contactTel', width: 120, align: 'left'},
  {title: '邮箱', dataIndex: 'contactEmail', width: 200, align: 'left'},
  {title: '有效期开始时间', dataIndex: '有效期开始时间', width: 150, align: 'left'},
  {title: '有效期结束时间', dataIndex: 'validTimeEnd', width: 150, align: 'left'},
  {title: '状态', dataIndex: 'status', width: 80, align: 'left', format(val){ return val === "1" ? "停用" : "启用";} },
  {title: '创建时间', dataIndex: 'createTime', width: 150, align: 'left'},
];


export const searchFormSchema: FormSchema[] = [
  /*{
    field: 'clientId',
    label: '应用名称',
    component: 'Select',
    colProps: { span: 8 },
    defaultValue: menuStore.clientIdList[0].value,
    componentProps: {
      options: menuStore.clientIdList,
      onChange:(e)=>{
        menuStore.setClientID(e);
      },
    },
  },*/
  {
    field: 'parkName',
    label: '园区',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'deptNo',
    label: '部门',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: menuStore.optLists
    }
  },
];


export const formSchema: FormSchema[] = [
  {
    field: 'menuNameZh',
    label: '园区',
    component: 'Input',
    required: true,
  },
  {
    field: 'menuNameEn',
    label: '车牌号',
    component: 'Input',
    required: true,
  },
  {
    field: 'menuNameNick',
    label: '车辆类型',
    component: 'Input',
    required: true,
  },
  {
    field: 'menuModel',
    label: '部门',
    component: 'Input',
    required: true,
  },
  {
    field: 'hasChild',
    label: '联系人',
    component: 'InputNumber',
    required: true,
  },

  {
    field: 'parentMenu',
    label: '电话',
    component: 'InputNumber',
    componentProps: {
      fieldNames: {
        label: 'menuName',
        key: 'id',
        value: 'id',
      },
    },
  },
  {
    field: 'displaySequence',
    label: '邮箱',
    component: 'InputNumber',
    required: true,
  },
];

