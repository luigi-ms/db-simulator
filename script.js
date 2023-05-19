import { createApp } from "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js";
import { Record, RecordsList } from "./classes.js";

createApp({
  data(){
    return {
      entryForm: {
        id: '',
        column: '',
        data: ''
      },
      workingRecord: new Record(0, '', ''),
      records: new RecordsList()
    };
  },
  methods: {
    addData(){
      this.records.add(this.mountWorkingRecord());
    },
    updateData(){
      const workingRecord = this.mountWorkingRecord();
      try{
        if(this.records.idExists(workingRecord.id)){
          const oldRecordIndex = this.records.getRecordIndex(workingRecord);
          this.records.update(oldRecordIndex, workingRecord);
        }
      }catch(err){
        alert('Cannot update because '+err.message);
      }
    },
    mountWorkingRecord(){
      try{
        const col = this.validateColumn(this.entryForm.column);

        this.workingRecord.id = this.validateID(this.entryForm.id);

        if(col === 'name'){
          this.workingRecord.name = this.entryForm.data;
        }else if(col === 'age'){
          this.workingRecord.age = this.entryForm.data;
        }

        return this.workingRecord;
      }catch(err){
        alert("Cannot add because "+err.message);
      }
    },
    validateColumn(column){
      if(['name', 'age'].some(col => col === column)){
        return column;
      }else{
        throw new Error(`column '${column}' does not exist`);
      }
    }
    ,
    validateID(id){
      if(!this.records.idExists(id)){ 
        return id;
      }else{
        throw new Error(`ID '${id}' already exists`);
      };
    }
  }
}).mount('#db-simulator');
