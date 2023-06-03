import Record from '../classes/Record.js';
import { recordsMap } from '../stores.js';

export default {
  data(){
    return {
      columns: Record.getColumns(),
      records: recordsMap

    };
  },
  created(){
    try{
      if(!window.localStorage.getItem("records") || !window.localStorage.getItem("ids")){
        this.records.updateStorage();
      }else{
        this.records.retrieveData(); 
      }
    }catch(err){
      console.error("error on created DataList")
      console.error(err.message);
    }
  },
  updated(){
    this.records.retrieveData();
  }
}
