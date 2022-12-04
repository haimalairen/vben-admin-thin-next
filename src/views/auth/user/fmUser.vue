<template>
  <div>
    <BasicTable @register="registerTable" >
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增用户 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';

  import { recusionMap } from '/@/utils/helper/treeHelper';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserList, delUser, getRoles } from '/@/api/auth/user';

  import { useDrawer } from '/@/components/Drawer';
  import UserDrawer from './UserDrawer.vue';

  import { useMenuStore } from './user.store';
  import { columns, searchFormSchema, initClientID } from './user.data';

  export default defineComponent({
    name: 'UserManagement',
    components: { BasicTable, UserDrawer, TableAction },
    setup() {
      //设置clientID
      const menuStore = useMenuStore();
      menuStore.setClientID(initClientID);

      const [registerDrawer, { openDrawer }] = useDrawer();
      const handleAfterFetch = (res) => {
        return recusionMap(res[0].childMenus);
      };
      const [registerTable, { reload, getDataSource, getPaginationRef, getForm }] =
        useTable({
          title: '用户列表',
          api: getUserList,
          columns,
          formConfig: {
            labelWidth: 120,
            schemas: searchFormSchema,
          },
          useSearchForm: true,
          showTableSetting: true,
          bordered: true,
          showIndexColumn: false,
          canResize: false,
          actionColumn: {
            width: 80,
            title: '操作',
            dataIndex: 'action',
            // slots: { customRender: 'action' },
            fixed: 'left',
          },
          afterFetch: handleAfterFetch,
        });
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log('record:', record);
        openDrawer(true, {
          record: { ...record, menuNameZh: record.menuName },
          isUpdate: true,
          parentMenu: getDataSource(),
        });
      }

      async function handleDelete(record: Recordable) {
        await delUser(record.id);
        reload(getPaginationRef().current);
      }

      function handleSuccess() {
        reload();
      }

      onMounted(async () => {
        const roles = ref({});
        roles.value = await getRoles();
        console.log('roles.value:', roles.value);
        const options = roles.value.map(item=>{
          return {
            label:item.roleName,
            value:item.roleCode,
          }
        })
        getForm()?.updateSchema({
          field: 'roleType',
          componentProps: {
            options: options,
          },
        });
      });

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
