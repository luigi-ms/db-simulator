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
      columns: Record.getColumns(),
      workingRecord: new Record(0),
      records: new RecordsList()
    };
  },
  updated(){ this.workingRecord = new Record(0); },
  methods: {
    addData(){
      try{
        const validatedID = this.validateID(this.entryForm.id);
        const newRecord = new Record(validatedID);
        const mounted = this.mountWorkingRecord();

        newRecord.name = mounted.name;
        newRecord.age = mounted.age;

        this.records.addRecord(newRecord);
      }catch(err){
        alert(err.message);
      }
    },
    updateData(){
      try{
        if(this.records.idExists(this.entryForm.id)){
          const foundRecord = this.records.getRecord(this.entryForm.id);
          const mounted = this.mountWorkingRecord();
          const emptyCol = mounted.getEmptyCol();

          mounted.id = foundRecord.id;
          mounted[emptyCol] = foundRecord[emptyCol];

          const recordIndex = this.records.getRecordIndex(foundRecord.id);
          this.records.updateRecord(recordIndex, mounted);
        }else { 
          throw new Error(`ID '${this.entryForm.id}' does not exist`);
        }
      }catch(err){
        alert('Cannot update because '+err.message);
      }
    },
    removeData(){
      try{
        if(this.records.idExists(this.entryForm.id)){
          const foundRecord = this.records.getRecord(this.entryForm.id);
          const recIndex = this.records.getRecordIndex(foundRecord.id);

          this.records.deleteRecord(recIndex);
          alert(`Record removed`);
        }else{
          throw new Error(`ID '${this.entryForm.id}' does not exist`);
        }
      }catch(err){
        alert('Cannot remove because '+err.message);
      }
    },
    mountWorkingRecord(){
      try{
        if(this.entryForm.column === 'id') throw new Error('Cannot change the ID');

        const colName = this.validateColumn(this.entryForm.column);
 
        this.workingRecord[colName] = this.entryForm.data;

        return this.workingRecord;
      }catch(err){
        alert("Cannot mount record because "+err.message);
      }
    },
    validateColumn(column){
      if(this.columns.some(col => col === column)){
        return column;
      }else{
        throw new Error(`column '${column}' does not exist`);
      }
    },
    validateID(id){
      if(this.records.idExists(id)){ 
        throw new Error(`ID '${id}' already exists`);
      }else{
        return id;
      };
    }
  }
}).mount('#db-simulator');
