import Client from "../models/client.model";

export default class ClientRepository {
    constructor() {
    }

    getAll = async () => {
        const client = await Client.findAll({ raw: true});
        return client;
    }

    getById = async (id: any) => {
        const client = await Client.findOne({
            where: {
                client_code: id
            }
        });
        return client;
    }

    create = async (data: any) => {
        const old = await Client.findOne({
            where: {
                client_code: data.client_code,
                name: data.name,
                installation_number: data.installation_number,
            }
        })
        if (old) {
            return
        }
        const client = await Client.create(data);
        return client.save();
    }

    update = async (id: number, data: any) => {
        const client = await Client.update(
            data,
            { where: { client_code: id }, returning: true }
        );
        return client;
    }

    deleteById = async (id: number) => {
        await Client.destroy({ where: { client_code: id } });
    }

    deleteAll = async () => {
        await Client.destroy({
            where: {},
            truncate: true
        });
    }
}