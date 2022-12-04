<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick } from 'vue';

  import { recusionMap } from '/@/utils/helper/treeHelper';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMenuList,delMenu } from '/@/api/auth/menu';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { useMenuStore } from "./menu.store";
  import { columns, searchFormSchema, initClientID } from './menu.data';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      //设置clientID
      const menuStore = useMenuStore();
      menuStore.setClientID(initClientID);
      const { createMessage } = useMessage();

      const [registerDrawer, { openDrawer }] = useDrawer();
      const handleAfterFetch = (res)=>{
        return recusionMap(res[0].childMenus);
      }
      const [registerTable, { reload, expandAll,getDataSource }] = useTable({
        title: '菜单列表',
        api: getMenuList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: 'left',
        },
        afterFetch:handleAfterFetch
      });
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
          parentMenu:getDataSource()
        });
      }

      function handleEdit(record: Recordable) {
        console.log('record:',record);
        openDrawer(true, {
          record:{...record,menuNameZh:record.menuName},
          isUpdate: true,
          parentMenu:getDataSource()
        });
      }

      async function handleDelete(record: Recordable) {
       const {code} = await delMenu(record);
       code==200 && createMessage.success('删除成功！');
       reload();
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
