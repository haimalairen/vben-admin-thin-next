import {defineStore} from 'pinia';

interface InnerCarState {
  parkName: String;
  deptNo: String;
}

export const useInnerCarStore = defineStore({
  id: 'inner-car',

  state: (): InnerCarState => ({
    parkName: '',
    deptNo: ''
  }),

  actions: {
    setDeptNo(deptNo: String) {
      this.deptNo = deptNo;
    },
    setParkName(parkName: String) {
      this.parkName = parkName;
    }
  },
});
