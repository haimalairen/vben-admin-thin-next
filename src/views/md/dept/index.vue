<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="addInnerCarInitPage"> 新增车辆 </a-button>
      </template>
<!--      <template #bodyCell="{ column, record }">
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
      </template>-->
    </BasicTable>
    <DeptDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getPageInfo} from '/@/api/md/innerCar';


  import { columns, searchFormSchema } from './dept.data';
  import {useDrawer} from "/@/components/Drawer";
  import DeptDrawer from './DeptDrawer.vue';

  export default defineComponent({
    name: 'Dept',
    components: { BasicTable, DeptDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();

      const [registerTable, { reload, collapseAll}] = useTable({
        title: '车辆管理',
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
          fixed: undefined,
        },
      });

/*      function handleCreate() {
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
      }*/

      function handleDelete(record: Recordable) {
        console.log(record);
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
      function addInnerCarInitPage() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      return {
        registerTable,
        registerDrawer,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
        addInnerCarInitPage
      };
    },
  });
</script>
