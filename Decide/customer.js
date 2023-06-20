import { BaseModel } from "./baseModel.js";

class Customer extends BaseModel {
  constructor(customer_id, email = null, first_name = null, last_name = null, phone = null, kwargs = {}) {
      super({
          "customer_id": customer_id,
          "email": email,
          "first_name": first_name,
          "last_name": last_name,
          "phone": phone
      }, kwargs);
  }

  get info() {
      return {
          "id": this.customer_id,
          "email": this.email,
          "firstName": this.first_name,
          "lastName": this.last_name,
          "phone": this.phone
      };
  }

  build_dict_values(key, value) {
      return this._data[key];
  }
}

export {Customer}