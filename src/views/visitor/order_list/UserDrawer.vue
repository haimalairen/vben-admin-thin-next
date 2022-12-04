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
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './user.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable } from '/@/components/Table';

  import { addUser, editUser} from '/@/api/visitor/index';
  import { useMenuStore } from './user.store';

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

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        parentMenuDisable.value=unref(isUpdate)?true:false;
        hasChildDisable.value=unref(isUpdate)?true:false;

        const { parentMenu:treeData, record:tableRow } = data;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
            parentMenu:tableRow.parentId==-1?'':tableRow.parentId
          });
          menuStore.setDialogTableVisible(data.record.hasChild==='Y'?false:true)
          record.value = data.record;
        }
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
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增访客' : '编辑访客'));

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });
          const values = await validate();
          values['clientId'] = menuStore.clientId;
          // TODO custom api
          if(!unref(isUpdate)){ //add
            await addUser({...values,})
          }else{ //edit
            await editUser({...values,id:unref(record)?.id});
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
        getTitle,
        handleSubmit,
        getFieldsValue,
        menuStore,
      };
    },
  });
</script>
