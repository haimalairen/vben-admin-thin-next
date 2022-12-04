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
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable } from '/@/components/Table';
  import { useUserStore } from '/@/store/modules/user';

  import { edit, add, getCarCode } from '/@/api/md/inspection';

  export default defineComponent({
    name: 'InnerCarDrawer',
    components: { BasicDrawer, BasicForm, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const getTitle = computed(() => (!unref(isUpdate) ? '新增检查' : '编辑检查'));
      const record = ref(null);
      //form
      const [registerForm, { validate, getFieldsValue, setFieldsValue, resetFields, updateSchema }] =
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
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          record.value = data.record;
        }
        const carTypeCodeOptions = await getCarCode();
        updateSchema({
          field:'carTypeCode',
          componentProps:{
            options:carTypeCodeOptions.map(item=>{
              return {
                label:item.carTypeName,
                value:item.carTypeCode
              }
            })
          }
        })
      });
      async function handleSubmit() {
        try {
          const userStore = useUserStore();
          const appendUserInfo = {
            parkId:userStore.getUserInfo.parkId,
            parkCode:userStore.getUserInfo.parkCode,
          }
          setDrawerProps({ confirmLoading: true });
          const values = await validate();
          if (!unref(isUpdate)) {
            //add
            await add({ ...values,...appendUserInfo });
          } else {
            //edit
            await edit({ ...values, id: unref(record)?.id, ...appendUserInfo });
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        getTitle,
        registerDrawer,
        registerForm,
        handleSubmit,
        getFieldsValue,
      };
    },
  });
</script>
