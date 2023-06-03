import Record from "../classes/Record.js";
import { actualRecord, recordsMap } from "../stores.js";

export default {
  data(){
    return {
      entryForm: {
        id: "",
        column: "",
        data: ""
      },
      messageError: "",
    };
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
        recordsMap.validateID(this.entryForm.id);
      }catch(err){
        this.messageError = err.message;
      }finally{
        actualRecord.id = this.entryForm.id;
      }
    },
    'entryForm.column'(){
      try{
        if(this.entryForm.column === 'id') throw new Error('Cannot change id column');
        actualRecord.updateCol = Record.validateColumn(this.entryForm.column);
        this.messageError = "";
      }catch(err){
        this.messageError = err.message;
      }
    },
    'entryForm.data'(){
      actualRecord[actualRecord.updateCol] = this.entryForm.data;
    }
  },
  methods: {
    addData(){
      try{
        this.validateForm();
        const newRecord = new Record(actualRecord.id);
        
        newRecord.name = actualRecord.name;
        newRecord.age = actualRecord.age;

        recordsMap.create(actualRecord.id, newRecord);        
      }catch(err){
        console.error(`InsertError ${err.message}`);
        console.trace();
      }finally{
        actualRecord = new Record(0);
      }
    },
    updateData(){
      try{
        this.validateForm();
        recordsMap.update(recordIndex, actualRecord);
      }catch(err){
        console.error(`UpdateError: ${err.message}`);
      }
    },
    searchData(){
      try{
        const found = recordsMap.read(actualRecord.id);
        const element = document.querySelector(`#record${found.id}`);

        element.classList.add("foundRecord");
      }catch(err){
        console.error(`SelectError: ${err.message}`);
      }
    },
    removeData(){
      try{
        recordsMap.deleteRecord(actualRecord.id);
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
};
