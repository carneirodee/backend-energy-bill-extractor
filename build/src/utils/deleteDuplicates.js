import ClientRepository from '../repositories/client.repository';
let clientRepository = new ClientRepository();
export const deleteDuplicates = async () => {
    let customers = await clientRepository.getAll();
    customers = customers.map((customer) => {
        customer.id = 0;
        delete customer.createdAt;
        delete customer.updatedAt;
        return customer;
    });
    let clients = customers.filter((value, index, self) => index === self.findIndex((t) => (t.client_code === value.client_code && t.name === value.name)));
    await clientRepository.deleteAll();
    clients.forEach(async (customer) => {
        let data = {
            client_code: customer.client_code,
            installation_number: customer.installation_number,
            name: customer.name,
            distributor: customer.distributor
        };
        await clientRepository.create(data);
    });
};
