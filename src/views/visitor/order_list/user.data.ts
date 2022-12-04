import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { createSessionStorage } from '/@/utils/cache';
import { useMenuStore } from "./user.store";
const menuStore = useMenuStore();
const ss = createSessionStorage();

export const columns: BasicColumn[] = [
  {
    title: '预约单号',
    dataIndex: 'visitorAppointmentNo',
    width: 180,
  },
  {
    title: '预约方式', 
    dataIndex: 'visitorAppointmentType',
    width: 100,
    format(val){ 
      //10访客自主预约 20内部员工新增 30内部员工导入
      return val;
    }
  },
  {
    title: '访客姓名',
    dataIndex: 'visitorName',
    width: 200,
    align: 'left',
  },
  {
    title: '手机号',
    dataIndex: 'visitorTel',
    width: 200,
    align: 'left',
  },
  {
    title: '单位',
    dataIndex: 'visitorCompany',
    width: 200,
    align: 'left',
  },
  {
    title: '车牌号',
    dataIndex: 'visitorPlateNumber',
    width: 200,
    align: 'left',
  },
  {
    title: '证件号',
    dataIndex: 'visitorCertificateNo',
    width: 200,
    align: 'left',
  },
  {
    title: '证件类型',
    dataIndex: 'visitorCertificateType',
    width: 200,
    align: 'left',
    format(val){ //10身份证 20驾驶证
      return val;
    }
  },
  {
    title: '访问事由',
    dataIndex: 'visitSubject',
    width: 200,
    align: 'left',
    format(val){ //10身份证 20驾驶证
      return val;
    }
  },
  {
    title: '预约访问时间',
    dataIndex: 'visitDatetime',
    width: 200,
    align: 'left'
  },
  
];

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const initClientID = menuStore.clientIdList[0].value
export const searchFormSchema: FormSchema[] = [
  {
    field: 'visitorAppointmentNo',
    label: '预约单号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'visitorName',
    label: '访客姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'visitorTel',
    label: '手机号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'visitorPlateNumber',
    label: '车牌号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'visitDatetime',
    label: '预约访问时间',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'visitorName',
    label: '访客姓名',
    component: 'Input',
    required:true
  },
  {
    field: 'visitorTel',
    label: '手机号',
    component: 'Input',
    required:true
  },
  {
    field: 'visitorCompany',
    label: '单位',
    component: 'Input',
    required:true
  },
  {
    field: 'visitorPlateNumber',
    label: '车牌号',
    component: 'Input',
  },
  {
    field: 'visitorCertificateType',
    label: '证件类型',
    component: 'Select',
    componentProps:{
      options:[
        {
          lable:'身份证',
          value:'10'
        },
        {
          lable:'驾驶证',
          value:'20'
        },
      ]
    }
  },
  {
    field: 'visitorCertificateNo',
    label: '证件号',
    component: 'Input',
  },
  {
    field: 'visitSubject',
    label: '访问事由',
    component: 'Input',
    required:true
  },
  {
    field: 'visitDatetime',
    label: '预约访问时间',
    component: 'DatePicker',
    componentProps:{
      showTime:true
    },
    required:true
  },
  {
    field: 'intervieweeName',
    label: '被访人姓名',
    component: 'Input',
    required:true
  },
  {
    field: 'intervieweeDeptNo',
    label: '被访人部门',
    component: 'Input',
    required:true
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
