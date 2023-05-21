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
  updated(){ 
    const dataCells = document.getElementsByTagName("td");
    Array.from(dataCells).forEach(td => td.classList = []);

    this.workingRecord = new Record(0);  //resets workingRecord every DOM update
  },
  methods: {
    addData(){
      try{
        const validatedID = this.validateID(true);
        console.error(validatedID);
        const newRecord = new Record(validatedID);
        const mounted = this.mountWorkingRecord();

        newRecord.name = mounted.name;
        newRecord.age = mounted.age;

        this.records.addRecord(newRecord);
      }catch(err){
        alert("Cannot add because "+err.message);
      }
    },
    updateData(){
      try{
        const validatedID = this.validateID();
        const foundRecord = this.records.getRecordByID(validatedID);
        const mounted = this.mountWorkingRecord();
        const emptyCol = mounted.getEmptyCol();

        mounted.id = foundRecord.id;
        mounted[emptyCol] = foundRecord[emptyCol];

        const recordIndex = this.records.getRecordIndex(foundRecord.id);
        this.records.updateRecord(recordIndex, mounted);
      }catch(err){
        alert('Cannot update because '+err.message);
      }
    },
    searchData(){
      try{
        const validatedID = this.validateID();
        const found = this.records.getRecord(validatedID);
        const element = document.querySelector(`#record${found.id}`);

        element.classList.add("foundRecord");
      }catch(err){
        alert("Could not find because "+err.message);
      }
    },
    removeData(){
      try{
        const validatedID = this.validatedID();
        const foundRecord = this.records.getRecordByID(validatedID);
        const recIndex = this.records.getRecordIndex(foundRecord.id);

        this.records.deleteRecord(recIndex);
        alert(`Record removed`);
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
    validateID(addingData=false){
      if(addingData){
        if(this.records.idExists(this.entryForm.id)){
          throw new Error("ID already exists");
        }else{
          return this.entryForm.id;
        }
      }else{
        if(this.records.idExists(this.entryForm.id)){
          return this.entryForm.id;
        }else{
          throw new Error("ID does not exist");
        }
      }
    }
  }
}).mount('#db-simulator');
