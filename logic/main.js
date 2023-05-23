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
      messages: {
        idField: "",
        colField: ""
      },
      tableUpdates: "",
      noUpdates: true,
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

//    this.workingRecord = new Record(0);  //resets workingRecord every DOM update
  },
  watch: {
    'entryForm.id'(newID){
      try{
        this.workingRecord.id = this.records.validateID(newID);
        this.messages.idField = "";
      }catch(err){
        this.messages.idField = err.message;
      }
    },
    'entryForm.column'(newColumn){
      try{
        if(newColumn === 'id') throw new Error('Cannot change id column');

        this.workingRecord.updateCol = Record.validateColumn(newColumn);
        this.messages.colField = "";
      }catch(err){
        this.messages.colField = err.message;
      }
    },
    'entryForm.data'(newData){
      this.workingRecord[this.workingRecord.updateCol] = newData;//this.setWorkingRecord(); 
    }
  },
  methods: {
    addData(){
      this.noUpdates = true;
      try{
        const validatedID = this.records.validateID(this.entryForm.id, true);
        const newRecord = new Record(validatedID);
        const wr = this.workingRecord;

        newRecord.name = wr.name;
        newRecord.age = wr.age;

        this.records.addRecord(newRecord);
        console.log(newRecord);
      }catch(err){
        this.noUpdates = false;
        this.tableUpdates = "Cannot add because "+err.message;
      }
    },
    updateData(){
      this.noUpdates = true;
      try{
        const validatedID = this.records.validateID(this.workingRecord.id);
        const foundRecord = this.records.getRecord(validatedID);
        const wr = this.workingRecord;
        const emptyCol = wr.getEmptyCol();

        wr.id = foundRecord.id;
        wr[emptyCol] = foundRecord[emptyCol];

        const recordIndex = this.records.getRecordIndex(foundRecord.id);
        this.records.updateRecord(recordIndex, wr);
      }catch(err){
        this.noUpdates = false;
        this.tableUpdates = 'Cannot update because '+err.message;
      }
    },
    searchData(){
      this.noUpdates = true;
      try{
        const validatedID = this.records.validateID(this.workingRecord.id);
        const found = this.records.getRecord(validatedID);
        const element = document.querySelector(`#record${found.id}`);

        element.classList.add("foundRecord");
      }catch(err){
        this.noUpdates = false;
        this.tableUpdates = "Could not find because "+err.message;
      }
    },
    removeData(){
      this.noUpdates = true;
      try{
        const validatedID = this.records.validateID(this.workingRecord.id);
        const foundRecord = this.records.getRecord(validatedID);
        const recIndex = this.records.getRecordIndex(foundRecord.id);

        this.records.deleteRecord(recIndex);
      }catch(err){
        this.noUpdates = false;
        this.tableUpdates = 'Cannot remove because '+err.message;
      }
    }
  }
}).mount('#db-simulator');
