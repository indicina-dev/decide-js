import { Customer } from '../Decide/customer';

describe('Customer', () => {
  describe('constructor', () => {
    it('should create a Customer instance with provided data', () => {
      const customer_id = '123';
      const email = 'john@example.com';
      const first_name = 'John';
      const last_name = 'Doe';
      const phone = '1234567890';
      const kwargs = {};

      const customer = new Customer(customer_id, email, first_name, last_name, phone, kwargs);

      expect(customer.customer_id).toBe(customer_id);
      expect(customer.email).toBe(email);
      expect(customer.first_name).toBe(first_name);
      expect(customer.last_name).toBe(last_name);
      expect(customer.phone).toBe(phone);
      expect(customer.kwargs).toBe(kwargs);
    });
  });

  describe('info', () => {
    it('should return an object with customer information', () => {
      const customer_id = '123';
      const email = 'john@example.com';
      const first_name = 'John';
      const last_name = 'Doe';
      const phone = '1234567890';

      const customer = new Customer(customer_id, email, first_name, last_name, phone);

      const expectedInfo = {
        id: customer_id,
        email: email,
        firstName: first_name,
        lastName: last_name,
        phone: phone,
      };

      expect(customer.info).toEqual(expectedInfo);
    });
  });

  describe('build_dict_values', () => {
    it('should return the value corresponding to the provided key', () => {
      const customer_id = '123';
      const email = 'john@example.com';
      const first_name = 'John';
      const last_name = 'Doe';
      const phone = '1234567890';
      const kwargs = {};

      const customer = new Customer(customer_id, email, first_name, last_name, phone, kwargs);

      expect(customer.build_dict_values('customer_id')).toBe(customer_id);
      expect(customer.build_dict_values('email')).toBe(email);
      expect(customer.build_dict_values('first_name')).toBe(first_name);
      expect(customer.build_dict_values('last_name')).toBe(last_name);
      expect(customer.build_dict_values('phone')).toBe(phone);
      expect(customer.build_dict_values('kwargs')).toBe(kwargs);
    });
  });
});
