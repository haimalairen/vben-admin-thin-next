import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { createSessionStorage } from '/@/utils/cache';
import { useMenuStore } from "./user.store";
import { ComponentProps } from './../../../components/Table/src/components/editable/CellComponent';
const menuStore = useMenuStore();
const ss = createSessionStorage();

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'userNo',
    width: 100,
    align: 'left',
  },
  {
    title: '用户昵称',
    dataIndex: 'userName',
    width: 100,
    align: 'left',
  },
  {
    title: '手机号', 
    dataIndex: 'mobileTel',
    width: 120,
  },
  {
    title: '部门', 
    dataIndex: 'deptName',
    width: 120,
  },
  {
    title: '办公电话',
    dataIndex: 'officeTel',
    width: 120,
  },
  {
    title: '地址',
    dataIndex: 'addr',
    width: 200,
    align: 'left',
  },
  {
    title: '传真',
    dataIndex: 'fax',
    width: 120,
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'useStatus',
    width: 80,
    align: 'left',
    format(key){
      const maps = {
        '00':'待激活',
        '10':'正常',
        '20':'已离职',
      }
      return maps[key]
    }
  },
  {
    title: '角色',
    dataIndex: 'roleType',
    width: 80,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    align: 'left',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    width: 80,
    align: 'left',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 180,
    align: 'left',
  },
  {
    title: '更新人',
    dataIndex: 'updater',
    width: 80,
    align: 'left',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
    align: 'left',
  },
  
];

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const initClientID = menuStore.clientIdList[0].value
export const searchFormSchema: FormSchema[] = [
  {
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
  },
  {
    field:'userNo',
    label:'用户名',
    component:'Input',
    colProps: { span: 8 }
  },
  {
    field:'userName',
    label:'用户昵称',
    component:'Input',
    colProps: { span: 8 }
  },
  {
    field:'roleType',
    label:'角色',
    component:'Select',
    colProps: { span: 8 }
  },
  {
    field:'useStatus',
    label:'状态',
    component:'Select',
    colProps: { span: 8 },
    componentProps:{
      options:[
        {
          label:'正常',
          value:'10'
        },
        {
          label:'离职',
          value:'20'
        },
      ]
    }
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'userNo',
    label: '用户名',
    component: 'Input',
    required: true,
    dynamicDisabled:true
  },
  {
    field: 'userName',
    label: '用户昵称',
    component: 'Input',
    required: true,
  },
  {
    field: 'mobileTel',
    label: '手机号',
    component: 'Input',
    required: true,
  },
  {
    field: 'userTypeNo',
    label: '用户类型',
    component: 'Select',
    required: true,
  },
  {
    field: 'deptNo',
    label: '部门',
    component: 'Select',
    required: true,
  },
  {
    field: 'officeTel',
    label: '办公电话',
    component: 'Input',
    required: false,
  },
  {
    field: 'addr',
    label: '地址',
    component: 'Input',
  },
  {
    field: 'fax',
    label: '传真',
    component: 'Input',
  },
  {
    field: 'email',
    label: '电子邮件',
    component: 'Input',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
  },
  {
    field: 'useStatus',
    label: '状态',
    component: 'Select',
    componentProps:{
      options:[
        {
          label:'正常',
          value:'10'
        },
        {
          label:'离职',
          value:'20'
        },
      ]
    }
  },
  {
    field: 'employeeId',
    label: '员工ID',
    component: 'Input',
  },
  
];


export const authColumns:BasicColumn[]=[
  {
    title: '按钮名称',
    dataIndex: 'opName',
    width: 100,
    align: 'left',
  },
  {
    title: '按钮编码',
    dataIndex: 'opNo',
    width: 100,
    align: 'left',
  },
  {
    title: '按钮类型',
    dataIndex: 'opType',
    width: 100,
    align: 'left',
  },
  {
    title: '按钮别名',
    dataIndex: 'alias',
    width: 100,
    align: 'left',
  },
]
