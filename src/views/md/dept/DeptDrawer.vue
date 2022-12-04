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
  import { formSchema } from './dept.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable } from '/@/components/Table';

  import { addMenu, editMenu } from '/@/api/auth/menu';
  import { useInnerCarStore } from './dept.store';

  export default defineComponent({
    name: 'InnerCarDrawer',
    components: { BasicDrawer, BasicForm, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
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
        /*resetFields();
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
          record.value = data.record;
        }*/
        /*setProps({
          api:getAuthors,
          searchInfo:{menuId:data.record?.menuId ?? '10'}
        })
        reload();*/
        /*updateSchema({
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
        })*/
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增车辆' : '编辑车辆'));

      async function handleSubmit() {
        /*try {
          setDrawerProps({ confirmLoading: true });
          const values = await validate();
          /!*if(values.hasChild === 'N'){
            values['menuPageOpList'] = getDataSource()
          }*!/
          console.log('values:',values);
          // TODO custom api
          if(!unref(isUpdate)){ //add
            const {label:parentName=undefined,value:parentId=0} = (values.parentMenu ?? {});
            await addMenu({...values,parentName,parentId})
          }else{ //edit
            await editMenu({...values,id:unref(record)?.id});
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }*/
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        getFieldsValue,
      };
    },
  });
</script>
