class BaseModel {
  constructor(data) {
  if (data && data !== null ) {
    const obj = Object.assign(this, data);
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        obj[key] = this.buildDictValues(key, value);
      }
    }
  }
  }

  buildDictValues(key, value) {
    return value;
  }
}



export { BaseModel };


