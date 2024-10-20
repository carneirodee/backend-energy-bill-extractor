import ClientRepository from "../repositories/client.repository";
export default class ClientController {
    constructor() {
    }
    repository = new ClientRepository();
    get = async (req, res, next) => {
        try {
            const data = await this.repository.getAll();
            res.status(200).send(data);
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            });
        }
    };
    getById = async (req, res, next) => {
        let id = req.params.id;
        try {
            const data = await this.repository.getById(id);
            if (data !== null) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Cliente não encontrado'
                });
            }
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            });
        }
    };
    post = async (req, res, next) => {
        try {
            const data = await this.repository.create(req.body);
            if (data !== null) {
                res.status(200).send({
                    success: true,
                    data
                });
            }
            else {
                res.status(422).send({
                    error_code: 'NOT_CREATE',
                    error_description: 'Cliente não criado'
                });
            }
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            });
        }
    };
    put = async (req, res, next) => {
        let id = req.params.id;
        try {
            const data = await this.repository.update(id, req.body);
            if (data !== null) {
                res.status(200).send({
                    success: true
                });
            }
            else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Cliente não encontrado'
                });
            }
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    };
    delete = async (req, res, next) => {
        let id = req.params.id;
        try {
            const data = await this.repository.getById(id);
            if (data !== null) {
                await this.repository.deleteById(id);
                res.status(200).send({
                    message: 'Deleted'
                });
            }
            else {
                res.status(404).send({
                    error_code: 'NOT_FOUND',
                    error_description: 'Cliente não encontrado'
                });
            }
        }
        catch (erro) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição' + erro
            });
        }
    };
}
