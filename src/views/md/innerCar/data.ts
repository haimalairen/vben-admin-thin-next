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
  {title: '有效期开始时间', dataIndex: 'validTimeStart', width: 150, align: 'left'},
  {title: '有效期结束时间', dataIndex: 'validTimeEnd', width: 150, align: 'left'},
  {title: '状态', dataIndex: 'status', width: 80, align: 'left', format(val){ return val === "1" ? "停用" : "启用";} },
  {title: '创建时间', dataIndex: 'createTime', width: 150, align: 'left'},
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
      options: menuStore.optLists
    }
  },
];


export const formSchema: FormSchema[] = [
  {
    field: 'plateNumber',
    label: '车牌号',
    component: 'Input',
    required: true,
  },
  {
    field: 'carTypeCode',
    label: '车辆类型',
    component: 'Input',
    required: true,
  },
  {
    field: 'deptNo',
    label: '部门',
    component: 'Select',
    required: true,
    componentProps: {
      options: menuStore.optLists
    }
  },
  {
    field: 'contactName',
    label: '联系人',
    component: 'Input',
    required: true,
  },

  {
    field: 'contactTel',
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
    field: 'contactEmail',
    label: '邮箱',
    component: 'Input',
    required: true,
  },
  {
    field: 'rangeTimes',
    label: '有效期开始时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
    },
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: '启用',
          value: '0',
          key: '1',
        },
        {
          label: '停用',
          value: '1',
          key: '2',
        }
      ],
    },
  },
];

