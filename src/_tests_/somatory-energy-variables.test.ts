import { scrapingDataPdf } from "../services/scrapingDataPdf";

describe('Scraping pdf and return resuls', () => {
    it('should return scrapping these result from the pdf', async () => {
        const result = await scrapingDataPdf('3001116735-01-2024.pdf');
        const { bill } = result;
        const somatory = Number(bill.energy_value) + Number(bill.energy_scee_s_icms_value) + Number(bill.compensated_energy_value)+ Number(bill.public_lighting_value);
        expect(somatory.toFixed(2)).toEqual(bill.total_value);
    });


    it('should return scrapping these result from the pdf', async () => {
        const result = await scrapingDataPdf('3001116735-01-2024.pdf');
        const { bill } = result;
        const somatory = Number(bill.energy_value) + Number(bill.energy_scee_s_icms_value) + Number(bill.compensated_energy_value)+ Number(bill.public_lighting_value);
        console.log("SOMATORY", somatory, "TOTAL VALUE", bill.total_value)
        expect(somatory.toFixed(2)).toEqual(bill.total_value);
    });
});


