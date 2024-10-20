import BillRepository from "../repositories/bill.repository";
import ClientRepository from "../repositories/client.repository";
export default class BillController {
    constructor() {
    }
    repository = new BillRepository();
    repository_client = new ClientRepository();

    get = async (req: any, res: any, next: any) => {
        try {
            const data = await this.repository.getAll()
            res.status(200).send(data)
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    getById = async (req: any, res: any, next: any) => {
        let id = req.params.id
        try {
            const data = await this.repository.getById(id)
            if (data !== null) {
                res.status(200).send(data)
            } else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Conta não encontrada'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }
    getByClientCode = async (req: any, res: any, next: any) => {
        let id = req.params.id
        try {
            const data = await this.repository_client.getById(id)
            if (data !== null) {
                const data_bills = await this.repository.getByClientCode(id);
                res.status(200).send(data_bills)
            } else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Conta não encontrada'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    getBillsByClients = async (req: any, res: any, next: any) => {
        try {
            const data_clients = await this.repository_client.getAll();
            const data_bills = await this.repository.getAll();

            const data = data_clients.map(client => {
                let bills = data_bills.filter((bill) => {
                    return Number(bill.client_code) == client.client_code;
                })
                let billsByMonthAndYear = bills.map(bill => {
                    return { month: bill.reference_date_month, year: bill.reference_date_year }
                })
                return {
                    nameUc: client.name,
                    numUc: client.installation_number,
                    distributor: "CEMIG",
                    client: client.name,
                    bills: billsByMonthAndYear
                }
            })

            res.status(200).send(data)

        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    getAllDashboard = async (req: any, res: any, next: any) => {
        try {
            const data_bills = await this.repository.getAll();
            let total_cons = 0;
            let total_com_value = 0;
            let total_value = 0;
            let total_com_qt = 0;
            let total_s_gd = 0;
            let total_eco_gd = 0;
            let energy_qt_vs_compensated: any | string[] = []
            let value_w_gd_vs_eco_gd : any | string[] = [];;
            data_bills.map((bill) => {
                const total_energy_qt = Number(bill.energy_qt) + Number(bill.energy_scee_s_icms_qt);
                const compensated_value = Number(bill.compensated_energy_value);
                const total_values = Number(bill.total_value);
                const compensated_energy_qt = Number(bill.compensated_energy_qt);
                const value_s_gd = Number((Number(bill.energy_value) + Number(bill.energy_scee_s_icms_value)).toFixed(2));
                const value_eco_gd = Math.abs(Number(Number(bill.compensated_energy_value).toFixed(2)));
                total_cons += total_energy_qt;
                total_com_value += Number(compensated_value);
                total_value += total_values;
                total_com_qt += compensated_energy_qt;
                total_s_gd += value_s_gd;
                total_eco_gd += value_eco_gd;

                if (energy_qt_vs_compensated.indexOf(bill.reference_date_month) == -1) {
                    energy_qt_vs_compensated.push({ month: bill.reference_date_month, consumed_energy: total_com_qt, compensated_energy: compensated_energy_qt })
                }
                if (value_w_gd_vs_eco_gd.indexOf(bill.reference_date_month) == -1) {
                    value_w_gd_vs_eco_gd.push({ month: bill.reference_date_month, value_s_gd: value_s_gd, value_eco_gd: value_eco_gd })
                }

            })
            const result1 = energy_qt_vs_compensated.reduce((acc : any, curr: any) => {
                const objInAcc = acc.find((o: any) => o.month === curr.month);
                if (objInAcc) { 
                    objInAcc.compensated_energy += curr.compensated_energy; 
                    objInAcc.consumed_energy += curr.consumed_energy; 
                }
                else acc.push(curr);
                return acc;
            }, []);
            const result2 = value_w_gd_vs_eco_gd.reduce((acc : any, curr: any) => {
                const objInAcc = acc.find((o: any) => o.month === curr.month);
                if (objInAcc) { 
                    objInAcc.value_s_gd += curr.value_s_gd; 
                    objInAcc.value_eco_gd += curr.value_eco_gd; 
                }
                else acc.push(curr);
                return acc;
            }, []);


            const data = {
                total_cons: total_cons.toFixed(2),
                total_com_value: Math.abs(total_com_value).toFixed(2),
                total_value: total_value.toFixed(2),
                total_com_qt: total_com_qt.toFixed(2),
                total_s_gd: total_s_gd.toFixed(2),
                total_eco_gd: Math.abs(total_eco_gd).toFixed(2),
                resultsEnergy: result1,
                resultsFin: result2
            }

            res.status(200).send(data)

        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    post = async (req: any, res: any, next: any) => {
        try {
            const data = await this.repository.create(req.body);
            if (data !== null) {
                res.status(200).send({
                    success: true,
                    data
                })
            } else {
                res.status(422).send({
                    error_code: 'NOT_CREATE',
                    error_description: 'Conta não criado'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

    put = async (req: any, res: any, next: any) => {
        let id = req.params.id
        try {
            
            const data = await this.repository.update(id, req.body)
            if (data !== null) {
                res.status(200).send({
                    success: true
                })
            } else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Conta não encontrada'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            })
        }
    }

    delete = async (req: any, res: any, next: any) => {
        let id = req.params.id
        try {
            const data = await this.repository.getById(id);
            if (data !== null) {
                await this.repository.deleteById(id);
                res.status(200).send({
                    message: 'Deleted'
                })
            } else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Conta não encontrada'
                })
            }
        } catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            })
        }
    }

}