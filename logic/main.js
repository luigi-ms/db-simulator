import { createApp } from "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js";
import { Record, RecordsList } from "./classes.js";

createApp({
  data(){
    return {
      entryForm: {
        id: null,
        column: null,
        data: null
      },
      columns: Record.getColumns(),
      workingRecord: new Record(0),
      records: new RecordsList()
    };
  },
  created(){
    if(!window.localStorage.getItem("records")){
      this.records.updateStorage();
    }else{
      this.records.retrieveData(); 
    }
  },
  updated(){ 
    const dataCells = document.getElementsByTagName("td");
    Array.from(dataCells).forEach(td => td.classList = []);

    this.workingRecord = new Record(0);  //resets workingRecord every DOM update
  },
  watch: {
    'entryForm.data'(){
      this.workingRecord = this.setWorkingRecord(); 
    }
  },
  methods: {
    addData(){
      try{
        const validatedID = this.records.validateID(this.entryForm.id, true);
        const newRecord = new Record(validatedID);
        const wr = this.workingRecord;

        newRecord.name = wr.name;
        newRecord.age = wr.age;

        this.records.addRecord(newRecord);
      }catch(err){
        alert("Cannot add because "+err.message);
      }
    },
    updateData(){
      try{
        const validatedID = this.records.validateID(this.entryForm.id);
        const foundRecord = this.records.getRecord(validatedID);
        const wr = this.workingRecord;
        const emptyCol = wr.getEmptyCol();

        wr.id = foundRecord.id;
        wr[emptyCol] = foundRecord[emptyCol];

        const recordIndex = this.records.getRecordIndex(foundRecord.id);
        this.records.updateRecord(recordIndex, wr);
      }catch(err){
        alert('Cannot update because '+err.message);
      }
    },
    searchData(){
      try{
        const validatedID = this.records.validateID(this.entryForm.id);
        const found = this.records.getRecord(validatedID);
        const element = document.querySelector(`#record${found.id}`);

        element.classList.add("foundRecord");
      }catch(err){
        alert("Could not find because "+err.message);
      }
    },
    removeData(){
      try{
        const validatedID = this.records.validateID(this.entryForm.id);
        const foundRecord = this.records.getRecord(validatedID);
        const recIndex = this.records.getRecordIndex(foundRecord.id);

        this.records.deleteRecord(recIndex);
      }catch(err){
        alert('Cannot remove because '+err.message);
      }
    },
    setWorkingRecord(){
      try{
        if(this.entryForm.column === 'id') throw new Error('Cannot change the ID');

        const colName = Record.validateColumn(this.entryForm.column);
        const record = new Record(this.entryForm.id);

        record[colName] = this.entryForm.data;
        return record;
      }catch(err){
        alert("Cannot mount record because "+err.message);
      }
    }
  }
}).mount('#db-simulator');
