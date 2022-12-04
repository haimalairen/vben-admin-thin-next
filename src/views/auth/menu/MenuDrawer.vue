<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable" v-show="menuStore.dialogTableVisible"/>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema,authColumns } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable } from '/@/components/Table';

  import { getAuthors, addMenu, editMenu } from '/@/api/auth/menu';
  import { useMenuStore } from './menu.store';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const menuStore = useMenuStore();
      const record = ref(null);
      const parentMenuDisable = ref(false);
      const hasChildDisable = ref(false);
      //form
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate, getFieldsValue }] =
        useForm({
          labelWidth: 100,
          schemas: formSchema,
          showActionButtonGroup: false,
          baseColProps: { lg: 12, md: 24 },
        });

      //table
      const [registerTable,{setProps, getSelectRows, reload, setSelectedRowKeys}] = useTable({
        columns:authColumns,
        isCanResizeParent:false,
        canResize:false,
        maxHeight:2000,
        rowKey:'pageOpId',
        rowSelection:{
          type:'checkbox'
        }
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        parentMenuDisable.value=unref(isUpdate)?true:false;
        hasChildDisable.value=unref(isUpdate)?true:false;
        record.value = data.record;
        const { parentMenu:treeData, record:tableRow } = data;
        // common
        setProps({
          api:getAuthors,
          searchInfo:{menuId:data.record?.menuId ?? '10'}
        });
        reload();
        console.log('treeData:',treeData);
        updateSchema({
          field: 'parentMenu',
          componentProps: { 
            treeData,
            labelInValue:true,
          },
          dynamicDisabled:unref(parentMenuDisable)
        });
        updateSchema({
          field:'hasChild',
          dynamicDisabled:unref(hasChildDisable),
        })
        //condition
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
            parentMenu:tableRow.parentId==-1?'':tableRow.parentId
          });
          menuStore.setDialogTableVisible(data.record.hasChild==='Y'?false:true)
          setSelectedRowKeys(record.value.menuOpIds);
        }else{
          setSelectedRowKeys([]);
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });
          const values = await validate();
          if(values.hasChild === 'N'){
            values['menuPageOpList'] = getSelectRows()
          }
          values['clientId'] = menuStore.clientId;
          console.log('values:',values);
          // TODO custom api
          if(!unref(isUpdate)){ //add
            const {label:parentName=undefined,value:parentId=-1} = (values.parentMenu ?? {}); 
            await addMenu({...values,parentName,parentId})
          }else{ //edit
            await editMenu({...values,id:unref(record)?.id});
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        registerTable,
        getTitle,
        handleSubmit,
        getFieldsValue,
        menuStore,
      };
    },
  });
</script>
