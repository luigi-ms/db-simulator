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
      messages: {
        idField: "",
        colField: ""
      },
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
  beforeUpdate(){
    try{
      this.validateForm();
    }catch(err){
      this.tableUpdates = err.message;
      this.records = this.records;
    }
  },
  updated(){
    console.log(this.noUpdates);
    const dataCells = document.getElementsByTagName("td");
    Array.from(dataCells).forEach(td => td.classList = []);
  },
  mounted(){
    this.workingRecord = new Record(0);
    this.entryForm = { id: "", column: "", data: "" };
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
  computed: {
    noUpdates(){
      return this.tableUpdates === "";
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
        this.tableUpdates = "Cannot add because "+err.message;
      }
    },
    updateData(){
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
        this.tableUpdates = 'Cannot update because '+err.message;
      }
    },
    searchData(){
      try{
        const validatedID = this.records.validateID(this.workingRecord.id);
        const found = this.records.getRecord(validatedID);
        const element = document.querySelector(`#record${found.id}`);

        element.classList.add("foundRecord");
      }catch(err){
        this.tableUpdates = "Could not find because "+err.message;
      }
    },
    removeData(){
      try{
        const validatedID = this.records.validateID(this.workingRecord.id);
        const foundRecord = this.records.getRecord(validatedID);
        const recIndex = this.records.getRecordIndex(foundRecord.id);

        this.records.deleteRecord(recIndex);
      }catch(err){
        this.tableUpdates = 'Cannot remove because '+err.message;
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
