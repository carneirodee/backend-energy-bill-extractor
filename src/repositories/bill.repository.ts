import Bill from "../models/bill.model";

export default class BillRepository {
    constructor() {
    }

    getAll = async () => {
        const bill = await Bill.findAll();
        return bill;
    }

    getById = async (id: any) => {
        const bill = await Bill.findOne({
            where: {
                id: id
            }
        });
        return bill;
    }

    getByCustomerCode = async (id: any) => {
        const bill = await Bill.findAll({
            where: {
                customer_code: id
            }
        });
        return bill;
    }

    create = async (data: any) => {
        const bill = await Bill.create(data);
        return bill.save();
    }

    update = async (id: number, data: any) => {
        const bill = await Bill.update(
            data,
            { where: { id: id }, returning: true }
        );
        return bill;
    }

    deleteById = async (id: number) => {
        await Bill.destroy({ where: { id: id } });
    }
}