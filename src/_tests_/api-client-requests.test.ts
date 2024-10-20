import request from "supertest"
import app from '../app';

describe('POST - Creating a Client Profile', () => {
    it('should return status 200', async () => {
        const res = await request(app)
            .post('/api-v1/clients')
            .send({
                client_code: "7204076117",
                installation_number: "3021116735",
                name: "SELFWAY TREINAMENTO PERSONALIZADO LTDA"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
describe('PUT - Updating a Client Profile', () => {
    it('should return status 200 - Updating Password', async () => {
        const id = 7204076117;
        const res = await request(app)
            .put(`/api-v1/clients/${id}`)
            .send({
                client_code: "7204076117",
                installation_number: "3021116735",
                name: "SELFWAY TREINAMENTO PERSONALIZADO LTDA"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});

describe('GET - Getting a Client Profile', () => {
    it('should return status 200', async () => {
        const client_code = 7204076117;
        const res = await request(app)
            .get(`/api-v1/clients/${client_code}`);
            console.log("RES", res.body)
        expect(res.statusCode).toEqual(200);
        expect(res.body.client_code).toBe(client_code);
    });

    it('should return status 404 - Not found client', async () => {
        const client_code = 1000;
        const res = await request(app)
            .get(`/api-v1/clients${client_code}`);
        expect(res.statusCode).toEqual(404);
    });
});

describe('DELETE - Deleting a Client Profile', () => {
    it('should return status 200', async () => {
        const client_code = '7204076117';
        const res = await request(app)
            .delete(`/api-v1/clients/${client_code}`);
        expect(res.statusCode).toEqual(200);
    });

    it('should return status 404 - Deleted client code', async () => {
        const client_code = '7204076117';
        const res = await request(app)
            .delete(`/api-v1/clients/${client_code}`);
        expect(res.statusCode).toEqual(404);
    });
})
