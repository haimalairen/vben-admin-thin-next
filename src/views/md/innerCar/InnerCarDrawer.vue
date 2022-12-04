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

  import { edit, add, } from '/@/api/md/innerCar';

  export default defineComponent({
    name: 'InnerCarDrawer',
    components: { BasicDrawer, BasicForm, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const getTitle = computed(() => (!unref(isUpdate) ? '新增车辆' : '编辑车辆'));
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
          data.record['rangeTime'] = [data.record.validTimeEnd,data.record.validTimeStart]
          console.log('data.record:',data.record);
          setFieldsValue({
            ...data.record,
          });
          console.log('data:',data);
          record.value = data.record;
        }
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
          values['validTimeStart'] = values.rangeTimes[0].format('YYYY-MM-DD HH:mm:ss');
          values['validTimeEnd'] = values.rangeTimes[0].format('YYYY-MM-DD HH:mm:ss');
          if (!unref(isUpdate)) {
            //add
            await add({ ...values,...appendUserInfo });
          } else {
            //edit
            await edit({ ...values, carId: unref(record)?.id, ...appendUserInfo });
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
