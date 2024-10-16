import Customer from "../models/customer.model";

export default class CustomerRepository {
    constructor() {
    }

    getAll = async () => {
        const customer = await Customer.findAll();
        return customer;
    }

    getById = async (id: any) => {
        const customer = await Customer.findOne({
            where: {
                customer_code: id
            }
        });
        return customer;
    }

    create = async (data: any) => {
        const customer = await Customer.create(data);
        return customer.save();
    }

    update = async (id: number, data: any) => {
        const customer = await Customer.update(
            data,
            { where: { customer_code: id }, returning: true }
        );
        return customer;
    }

    deleteById = async (id: number) => {
        await Customer.destroy({ where: { customer_code: id } });
    }
}