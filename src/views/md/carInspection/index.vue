<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增项目 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <InnerCarDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getPageInfo } from '/@/api/md/inspection';


  import { columns, searchFormSchema } from './data';
  import {useDrawer} from "/@/components/Drawer";
  import InnerCarDrawer from './InnerCarDrawer.vue';

  export default defineComponent({
    name: 'CarInspection',
    components: { BasicTable, InnerCarDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();

      const [registerTable, { reload, collapseAll }] = useTable({
        title: '车辆检查',
        api: getPageInfo,
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
      });

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(collapseAll);
      }

      /**
       * 打开新增车辆画面
       */
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleDelete(){

      }

      return {
        registerTable,
        registerDrawer,
        handleDelete,
        handleSuccess,
        handleEdit,
        onFetchSuccess,
        handleCreate
      };
    },
  });
</script>
