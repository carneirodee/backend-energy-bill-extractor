import BillRepository from "../repositories/bill.repository";
import CustomerRepository from "../repositories/customer.repository";
export default class BillConntroller {
    constructor() {
    }
    repository = new BillRepository();
    repository_customer = new CustomerRepository();

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
    getByCustomerCode = async (req: any, res: any, next: any) => {
        try {
            const data = await this.repository_customer.getById(id)
            if (data !== null) {
                const data_bills = await this.repository.getByCustomerCode(id);
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