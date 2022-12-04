import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { createSessionStorage } from '/@/utils/cache';
import { useMenuStore } from "./menu.store";
const menuStore = useMenuStore();
const ss = createSessionStorage();

export const columns: BasicColumn[] = [
  {
    title: '中文菜单',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
    format(val){
      return val
    }
  },
  {
    title: '英文菜单',
    dataIndex: 'menuNameEn',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: '层级',
    dataIndex: 'component',
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
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
];

export const formSchema: FormSchema[] = [
  {
    field: 'menuNameZh',
    label: '中文名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'menuNameEn',
    label: '英文名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'menuNameNick',
    label: '页面路由',
    component: 'Input',
    required: true,
  },
  {
    field: 'menuModel',
    label: '权限模块',
    component: 'Input',
    required: true,
  },
  {
    field: 'hasChild',
    label: '是否有子项',
    component: 'Select',
    defaultValue: 'N',
    componentProps: () => {
      return {
        options: [
          { label: '是', value: 'Y' },
          { label: '否', value: 'N' },
        ],
        onChange: e => {
          menuStore.setDialogTableVisible(e==='Y'?false:true);
        },
      };
    },
    required: true,
  },

  {
    field: 'parentMenu',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'menuName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'displaySequence',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: false,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
  },
  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'show',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
  },
  {
    field: 'remark',
    label: '备注',
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
