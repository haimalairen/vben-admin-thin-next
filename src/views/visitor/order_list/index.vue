<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <BasicUpload 
        btn-text="导入" 
        :empty-hide-preview="true"
        :api="uploadOrder"
        :download-api="downLoadOrder"
        />
        <a-button type="primary" @click="handleExport"> 导出 </a-button>
        <a-button type="primary" @click="handleCreate"> 新增访客 </a-button>
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
  import { defineComponent, nextTick } from 'vue';

  import { recusionMap } from '/@/utils/helper/treeHelper';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserList, delUser, uploadOrder,downLoadOrder,exportOrder} from '/@/api/visitor/index';
  import { BasicUpload } from '/@/components/Upload';

  import { useDrawer } from '/@/components/Drawer';
  import UserDrawer from './UserDrawer.vue';

  import { useMenuStore } from "./user.store";
  import { columns, searchFormSchema, initClientID } from './user.data';

  export default defineComponent({
    name: 'OrderListManagement',
    components: { BasicTable, UserDrawer, TableAction,BasicUpload },
    setup() {
      //设置clientID
      const menuStore = useMenuStore();
      menuStore.setClientID(initClientID);

      const [registerDrawer, { openDrawer }] = useDrawer();
      const handleAfterFetch = (res)=>{
        return recusionMap(res[0].childMenus);
      }
      const [registerTable, { reload, expandAll, collapseAll,getDataSource }] = useTable({
        title: '访客列表',
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
        canResize: true,
        canColDrag: true,
        actionColumn: {
          width: 80,
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
        alert('接口开发中..')
        console.log('record:',record);
        // await delUser(record.id);
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(collapseAll);
      }

      async function handleExport(){
        //
        await exportOrder();
      }
      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleExport,
        onFetchSuccess,
        uploadOrder,
        downLoadOrder
      };
    },
  });
</script>
