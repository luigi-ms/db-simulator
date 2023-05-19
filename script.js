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
      records: [
        {
          id: 0,
          name: 'admin',
          age: 99
        }
      ]
    };
  },
  methods: {
    addData(){
      if(!this.idExists(this.entryForm.id)){
        this.records.push(this.workingRecord);
      }
    },
    updateData(){},
    removeData(){},
    idExists(id){
      return this.records.some(rec => rec.id === id);
    }
  }
}).mount('#db-simulator');
