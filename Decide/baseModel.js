const namePattern = /(.)([A-Z][a-z]+)/;
const snakePattern = /([a-z0-9])([A-Z])/;

function convertToCamel(name) {
  return name.split('_').map((word, index) => {
    if (index === 0) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}


class BaseModel {
  constructor(data) {
    const obj = Object.assign(this, data);
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        obj[key] = this.buildDictValues(key, value);
      }
    }
  }

  buildDictValues(key, value) {
    return value;
  }
}



export { BaseModel };


