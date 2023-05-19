import { createApp } from "https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.esm-browser.prod.js";

createApp({
  data(){
    return {
      entryForm: {
        id: '',
        column: '',
        data: ''
      },
      workingRecord: {
        id: 0,
        name: '',
        age: 0
      },
      records: []
    };
  },
  methods: {
    addData(){
      this.records.push(this.mountWorkingRecord());
    },
    updateData(){
      //mount working record and update record in records array
    },
    removeData(){},
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
      if(!this.records.some(rec => rec.id === id)){
        return id;
      }else{
        throw new Error(`ID '${id}' already exists`);
      };
    }
  }
}).mount('#db-simulator');
