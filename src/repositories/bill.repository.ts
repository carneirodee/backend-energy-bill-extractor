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

    getByClientCode = async (id: any) => {
        const bill = await Bill.findAll({
            where: {
                client_code: id
            },
            order: [
                ['reference_date_month', 'ASC'],
                ['reference_date_year', 'ASC']
            ]
        });
        return bill;
    }

    create = async (data: any) => {
        const old = await Bill.findOne({
            where: {
                client_code: data.client_code,
                reference_date_month: data.reference_date_month,
                reference_date_year: data.reference_date_year
            }
        })
        if(old) {
            return
        }
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