import Record from './Record.js';
import { recordsMap } from './stores.js';

export default {
  data(){
    return {
      columns: Record.getColumns(),
      records: recordsMap
    };
  },
  created(){
    if(!window.localStorage.getItem("records") || !window.localStorage.getItem("ids")){
      this.records.updateStorage();
    }else{
      this.records.retrieveData(); 
    }
  },
};
