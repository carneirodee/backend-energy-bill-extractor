import { scrapingDataPdf } from "../services/scrapingDataPdf";
describe('Scraping pdf and return resuls', () => {
    it('should return scrapping these result from the pdf', async () => {
        const result = await scrapingDataPdf('3001116735-01-2024.pdf');
        const { client, bill } = result;
        expect(client.name).toEqual("JOSE MESALY FONSECA DE CARVALHO 52024156");
        expect(client.client_code).toEqual("7204076116");
        expect(client.installation_number).toBe("3001116735");
        expect(client.distributor).toBe("CEMIG");
        expect(bill.client_code).toBe("7204076116");
        expect(bill.installation_number).toBe("3001116735");
        expect(bill.reference_date_month).toBe("JAN");
        expect(bill.reference_date_year).toBe("2024");
        expect(bill.due_date).toBe("12/02/2024");
        expect(bill.total_value).toBe("107.38");
        expect(bill.energy_qt).toBe("50");
        expect(bill.energy_value).toBe("47.75");
        expect(bill.energy_scee_s_icms_qt).toBe("456");
        expect(bill.energy_scee_s_icms_value).toBe("232.42");
        expect(bill.compensated_energy_qt).toBe("456");
        expect(bill.compensated_energy_value).toBe("-222.22");
        expect(bill.public_lighting_value).toBe("49.43");
    });
    it('should return scrapping these result from the pdf', async () => {
        const result = await scrapingDataPdf('3001422762-01-2024.pdf');
        const { client, bill } = result;
        expect(client.name).toEqual("SELFWAY TREINAMENTO PERSONALIZADO LTDA");
        expect(client.client_code).toEqual("7202210726");
        expect(client.installation_number).toBe("3001422762");
        expect(client.distributor).toBe("CEMIG");
        expect(bill.client_code).toBe("7202210726");
        expect(bill.installation_number).toBe("3001422762");
        expect(bill.reference_date_month).toBe("JAN");
        expect(bill.reference_date_year).toBe("2024");
        expect(bill.due_date).toBe("09/02/2024");
        expect(bill.total_value).toBe("66.62");
        expect(bill.energy_qt).toBe("100");
        expect(bill.energy_value).toBe("95.52");
        expect(bill.energy_scee_s_icms_qt).toBe("2300");
        expect(bill.energy_scee_s_icms_value).toBe("1172.31");
        expect(bill.compensated_energy_qt).toBe("2300");
        expect(bill.compensated_energy_value).toBe("-1120.85");
        expect(bill.public_lighting_value).toBe("40.45");
    });
});
