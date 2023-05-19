export class Record {
  constructor(id, name, age){
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

export class RecordsList {
  constructor(){
    this._recs = [];
  }

  add(rec){ 
    if(rec instanceof Record){
      this.list.push(rec);
    }else{
      throw new Error('Not a Record instance');
    }
  }

  getRecord(foo){
    if(foo instanceof Record){
      return this.list.filter(rec => rec === foo)[0];
    }else{
      throw new Error('Not a Record instance');
    }
  }

  getRecordIndex(foo){
    if(foo instanceof Record){
      return this.list.getIndex(foo);
    }else{
      throw new Error('Not a Record instance');
    }
  }

  update(oldRecIndex, newRec){
    if(newRec instanceof Record){
      this.list.splice(oldRecIndex, 1, newRec);
    }else{ 
      throw new Error('Not a Record instance');
    }
  }

  idExists(id){ return this.list.some(rec => rec.id === id); }

  get list(){ return this._recs; }
}
