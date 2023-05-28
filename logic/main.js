import { createApp } from "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js";
import { Record, RecordsList } from "./classes.js";

let store = new Record(0);

createApp({
  data(){
    return {
      entryForm: {
        id: "",
        column: "",
        data: ""
      },
      messageError: "",
      columns: Record.getColumns(),
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
  },
  updated(){
    const dataCells = document.getElementsByTagName("td");
    Array.from(dataCells).forEach(td => td.classList = []);
  },
  watch: {
    'entryForm.id'(){
      try{
        this.records.validateID(this.entryForm.id);
      }catch(err){
        this.messageError = err.message;
      }finally{
        store.id = this.entryForm.id;
      }
    },
    'entryForm.column'(){
      try{
        if(this.entryForm.column === 'id') throw new Error('Cannot change id column');
        store.updateCol = Record.validateColumn(this.entryForm.column);
        this.messageError = "";
      }catch(err){
        this.messageError = err.message;
      }
    },
    'entryForm.data'(){
      store[store.updateCol] = this.entryForm.data;
      console.log(store);
    }
  },
  methods: {
    addData(){
      try{
        this.validateForm();
        const validatedID = this.records.validateID(this.entryForm.id, true);
        const newRecord = new Record(validatedID);
        
        newRecord.name = store.name;
        newRecord.age = store.age;

        this.records.addRecord(newRecord);        
      }catch(err){
        console.error(`InsertError ${err.message}`);
      }
    },
    updateData(){
      try{
        this.validateForm();
        const validatedID = this.records.validateID(this.entryForm.id);
        const foundRecord = this.records.getRecord(validatedID);
        const emptyCol = store.getEmptyCol();

        store.id = foundRecord.id;
        store[emptyCol] = foundRecord[emptyCol];

        const recordIndex = this.records.getRecordIndex(foundRecord.id);
        this.records.updateRecord(recordIndex, store);
      }catch(err){
        console.error(`UpdateError: ${err.message}`);
      }
    },
    searchData(){
      try{
        const validatedID = this.records.validateID(this.entryForm.id);
        const found = this.records.getRecord(validatedID);
        const element = document.querySelector(`#record${found.id}`);

        element.classList.add("foundRecord");
      }catch(err){
        console.error(`SelectError: ${err.message}`);
      }
    },
    removeData(){
      try{
        const validatedID = this.records.validateID(this.entryForm.id);
        const foundRecord = this.records.getRecord(validatedID);
        const recIndex = this.records.getRecordIndex(foundRecord.id);

        this.records.deleteRecord(recIndex);
      }catch(err){
        console.error(`RemoveError: ${err.message}`);
      }
    },
    validateForm(){
      const idEmpty = (this.entryForm.id === ""),
            colEmpty = (this.entryForm.column === ""),
            dataEmpty = (this.entryForm.data === "");

      if(idEmpty && colEmpty && dataEmpty){
        throw new Error("Form cannot be empty");
      }
    }
  }
}).mount('#db-simulator');
