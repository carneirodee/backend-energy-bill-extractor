import request from "supertest";
import app from '../app';
describe('POST - Creating a Bill', () => {
    it('should return status 200', async () => {
        const res = await request(app)
            .post('/api-v1/bills')
            .send({
            id: 999,
            client_code: "7204076117",
            installation_number: "3021116735",
            reference_date_month: "SET",
            reference_date_year: "2024",
            due_date: "09/10/2024",
            total_value: 49.9,
            energy_qt: 100,
            energy_value: 140.0,
            energy_scee_s_icms_qt: 100,
            energy_scee_s_icms_value: 89.99,
            compensated_energy_qt: 100,
            compensated_energy_value: 90.00,
            public_lighting_value: 56.70
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
describe('PUT - Updating a Bill ', () => {
    it('should return status 200 - Updating Password', async () => {
        const id = 999;
        const res = await request(app)
            .put(`/api-v1/bills/${id}`)
            .send({
            id: 999,
            client_code: "7204076117",
            installation_number: "3021116735",
            reference_date_month: "AGO",
            reference_date_year: "2023",
            due_date: "09/10/2024",
            total_value: 49.9,
            energy_qt: 100,
            energy_value: 140.0,
            energy_scee_s_icms_qt: 100,
            energy_scee_s_icms_value: 89.99,
            compensated_energy_qt: 100,
            compensated_energy_value: 90.00,
            public_lighting_value: 56.70
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
describe('GET - Getting a Bill ', () => {
    it('should return status 200', async () => {
        const id = 999;
        const res = await request(app)
            .get(`/api-v1/bills/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(id);
    });
    it('should return status 404 - Not found client', async () => {
        const id = 1000;
        const res = await request(app)
            .get(`/api-v1/bills${id}`);
        expect(res.statusCode).toEqual(404);
    });
});
describe('GET - Getting all Bills ', () => {
    it('should return status 200', async () => {
        const res = await request(app)
            .get(`/api-v1/bills`);
        expect(res.statusCode).toEqual(200);
    });
});
describe('DELETE - Deleting a Bill ', () => {
    it('should return status 200', async () => {
        const id = 999;
        const res = await request(app)
            .delete(`/api-v1/bills/${id}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should return status 404 - Deleted client code', async () => {
        const id = 1000;
        const res = await request(app)
            .delete(`/api-v1/bills/${id}`);
        expect(res.statusCode).toEqual(404);
    });
});
