import { defineStore } from 'pinia';
import { createSessionStorage } from "/@/utils/cache";

const ss = createSessionStorage();
const clientIds = ss.get('clients').map((item) => {
  return {
    key: item.clientName,
    value: item.clientId,
  };
});
interface MenuState {
  dialogTableVisible: Boolean;
  clientId:String;
  clientIdList:Array<any>;
}
export const useMenuStore = defineStore({
  id: 'auth-menu',
  state: (): MenuState => ({
    dialogTableVisible: true,
    clientId:'',
    clientIdList:clientIds
  }),
  actions: {
    setDialogTableVisible(visible: Boolean) {
      this.dialogTableVisible = visible;
    },
    setClientID(id:String){
      this.clientId = id;
    }
  },
});
