import { createApp } from "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js";
import { Record, RecordsList } from "./classes.js";

createApp({
  data(){
    return {
      entryForm: {
        id: "",
        column: "",
        data: ""
      },
      messageError: "",
      tableUpdates: "",
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
  mounted(){
    this.entryForm = { id: "", column: "", data: "" };
    this.tableUpdates = "Table ready";
  },
  beforeUpdate(){
    try{
      this.workingRecord = new Record(0);
    }catch(err){
      this.tableUpdates = err.message;
      this.records = this.records;
    }
  },
  updated(){
    const dataCells = document.getElementsByTagName("td");
    Array.from(dataCells).forEach(td => td.classList = []);
  },
  watch: {
    entryForm: {
      handler(){
        try{
          this.validateForm();
          if(this.entryForm.column === 'id') throw new Error('Cannot change id column');

          this.workingRecord.id = this.records.validateID(this.entryForm.id);

          this.workingRecord.updateCol = Record.validateColumn(this.entryForm.column);
          
          this.workingRecord[this.workingRecord.updateCol] = newData;//this.setWorkingRecord(); 

          this.messageError = "";
        }catch(err){
          this.messageError = err.message;
        }
      },
      deep: true
    }
  },
  methods: {
    addData(){
      try{
        this.validateForm();
        const validatedID = this.records.validateID(this.entryForm.id, true);
        const newRecord = new Record(validatedID);
        const wr = this.workingRecord;

        console.log(wr);
        newRecord.name = wr.name;
        newRecord.age = wr.age;

        this.records.addRecord(newRecord);
        
        this.tableUpdates = "New record added";
      }catch(err){
        this.tableUpdates = `InsertError ${err.message}`;
      }
    },
    updateData(){
      try{
        this.validateForm();
        const validatedID = this.records.validateID(this.entryForm.id);
        const foundRecord = this.records.getRecord(validatedID);
        const wr = this.workingRecord;
        const emptyCol = wr.getEmptyCol();

        wr.id = foundRecord.id;
        wr[emptyCol] = foundRecord[emptyCol];

        const recordIndex = this.records.getRecordIndex(foundRecord.id);
        this.records.updateRecord(recordIndex, wr);

        this.tableUpdates = `Record ${wr.id} updated`;
      }catch(err){
        this.tableUpdates = `UpdateError: ${err.message}`;
      }
    },
    searchData(){
      try{
        const validatedID = this.records.validateID(this.entryForm.id);
        const found = this.records.getRecord(validatedID);
        const element = document.querySelector(`#record${found.id}`);

        element.classList.add("foundRecord");

        this.tableUpdates = "Record found";
      }catch(err){
        this.tableUpdates = `SelectError: ${err.message}`;
      }
    },
    removeData(){
      try{
        const validatedID = this.records.validateID(this.entryForm.id);
        const foundRecord = this.records.getRecord(validatedID);
        const recIndex = this.records.getRecordIndex(foundRecord.id);

        this.records.deleteRecord(recIndex);

        this.tableUpdates = `Record ${validatedID} removed`;
      }catch(err){
        this.tableUpdates = `RemoveError: ${err.message}`;
      }
    },
    validateForm(){
      const idEmpty = (this.entryForm.id === ""),
            colEmpty = (this.entryForm.column === ""),
            dataEmpty = (this.entryForm.data === "");

      if(idEmpty || colEmpty || dataEmpty){
        throw new Error("Form cannot be empty");
      }
    }
  }
}).mount('#db-simulator');
