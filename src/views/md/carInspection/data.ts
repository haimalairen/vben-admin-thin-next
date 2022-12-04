import { BasicColumn, FormSchema } from '/@/components/Table';
import { selectMdDeptList } from '/@/api/common/web/webSelect';
import { useMenuStore } from '/@/views/visitor/order_list/user.store';
import { values } from 'lodash-es';
const menuStore = useMenuStore();
const deptWebSelectHandler = async function () {
  const deptList = await selectMdDeptList();
  menuStore.optLists = deptList.map((item) => {
    return {
      label: item.deptName,
      value: item.deptNo,
    };
  });
};
await deptWebSelectHandler();
export const columns: BasicColumn[] = [
  {
    title: '车辆类型编码',
    dataIndex: 'carTypeCode',
    width: 120,
    align: 'left',
  },
  {
    title: '检查类型',
    dataIndex: 'checkType',
    width: 120,
    format(val) {
      return val == '10' ? '入园检查' : '出园检查';
    },
  },
  {
    title: '检查项目名称',
    dataIndex: 'checkName',
    width: 120,
    align: 'left',
  },
  {
    title: '检查方式',
    dataIndex: 'checkMode',
    width: 100,
    align: 'left',
    format(key) {
      const map = {
        input: '输入',
        select: '选择',
        radiogroup: '单选按钮组',
        checkbox: '复选框',
        file: '文件',
      };
      return map[key];
    },
  },
  {
    title: '状态',
    dataIndex: 'checkType',
    width: 100,
    format(status) {
      return status == '0' ? '启用' : '停用';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    width: 120,
  },
  {
    title: '车辆类型名称',
    dataIndex: 'carTypeName',
    width: 180,
  },
  {
    title: '园区名称',
    dataIndex: 'parkName',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'parkCode',
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
      options: menuStore.optLists,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'carTypeCode',
    label: '车辆类型编码',
    component: 'Select',
    required: true,
  },
  {
    field: 'checkType',
    label: '检查类型',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: '入园检查',
          value: '10',
        },
        {
          label: '出园检查',
          value: '20',
        },
      ],
    },
  },
  {
    field: 'checkName',
    label: '检查项目名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'checkField',
    label: '检查项目字段',
    component: 'Input',
    required: true,
  },
  {
    field: 'checkMode',
    label: '检查方式',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: '输入',
          value: 'input',
        },
        {
          label: '选择',
          value: 'select',
        },
        {
          label: '单选按钮组',
          value: 'radiogroup',
        },
        {
          label: '复选框',
          value: 'checkbox',
        },
        {
          label: '文件',
          value: 'file',
        },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    required: true,
    componentProps:{
      options:[
        {
          label:'启用',
          value:'0'
        },
        {
          label:'停用',
          value:'1'
        },
      ]
    }
  },
];
