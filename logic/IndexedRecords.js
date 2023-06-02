import { openDB } from "idb";

export default class IDBRecords {
  constructor(){
    this._dbName = "IDBRecords";
    this._tableName = "Records";
    this.db = {};
    this.table = {};
  }

  async start(){
    return await openDB(this.dbName, {
      upgrade(db){
        db.createObjectStore(this.tableName, {
          keyPath: 'id'
        });
      }
    });
  }

  async startTable(){
    this.db = await this.start()
    this.table = db
      .transaction(this.tableName)
      .objectStore(this.tableName);
  }

  async create(record){
    const tx = this.db.transaction(this.tableName, "readwrite");

    await tx.store.add(record);
  }

  async read(id){
    return await this.db.get(this.tableName, id);
  }
 
  async update(record, id){
    const tx = this.db.transaction(this.tableName, "readwrite");

    await tx.store.put(this.tableName, record, id);
  } 

  deleteRecord(){}

  get dbName(){ return this._dbName; }
  
  get tableName(){ return this._tableName; }
}
