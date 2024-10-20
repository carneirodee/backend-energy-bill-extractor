import fs from 'fs';
import pdf from 'pdf-parse';
import BillRepository from '../repositories/bill.repository';
import ClientRepository from '../repositories/client.repository';
import sequelize from '../db';
import Bill from '../models/bill.model';
import Client from '../models/client.model';

let clientRepository = new ClientRepository()
let billRepository = new BillRepository();
let isTest = process.env.NODE_ENV === "test"

export const scrapingDataPdf = async (file: any, key?: any): Promise<any> => {
    let dataBuffer = fs.readFileSync(`bills/${file}`);
    return pdf(dataBuffer).then(async function (data) {
        let arrayOfLines = [];
        arrayOfLines = data.text.split("\n");

        let client_name_index = arrayOfLines.indexOf("DÉBITO AUTOMÁTICO");
        let client_name = client_name_index != -1 ? arrayOfLines[client_name_index + 1] :
            arrayOfLines.indexOf("Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar") == 32 ? arrayOfLines[35] : arrayOfLines.indexOf("Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar") == 33 ? arrayOfLines[36] : arrayOfLines[32];
        let client_codes_titles_index = arrayOfLines.indexOf("        Nº DO CLIENTE                      Nº DA INSTALAÇÃO");
        let client_codes = arrayOfLines[client_codes_titles_index + 1].split("        ");
        let client_code = client_codes[0].trim();
        let installation_number = client_codes[1].trim();
        let reference_index = arrayOfLines.indexOf("         Referente a                                Vencimento                       Valor a pagar (R$)");
        let reference_data = arrayOfLines[reference_index + 1].split('               ');
        let date_reference = reference_data[0].trim();
        let reference_date_data = date_reference.split('/');
        let reference_date_month = reference_date_data[0];
        let reference_date_year = reference_date_data[1];
        let due_date = reference_data[1];
        let total_value = reference_data[2].replace('.', '').replace(",", ".").trim();
        let bill_data_index = arrayOfLines.indexOf("Itens da FaturaUnid.Quant.Preço UnitValor (R$) PIS/COFINSBase Calc.Aliq.ICMSTarifa Unit.") + 1;
        let energy_data = arrayOfLines[bill_data_index + 1].split(" ");
        energy_data = energy_data.filter(el => {
            return el != "";
        })
        let energy_qt = energy_data[2].trim();
        let energy_value = energy_data[4].replace('.', '').replace(",", ".").trim();
        let energy_scee_s_icms_data = arrayOfLines[bill_data_index + 2].split(" ");
        energy_scee_s_icms_data = energy_scee_s_icms_data.filter(el => {
            return el != "";
        })
        let energy_scee_s_icms_qt = energy_scee_s_icms_data[4].replace('.', '').replace(',', '.').trim();
        let energy_scee_s_icms_value = energy_scee_s_icms_data[6].replace('.', '').replace(",", ".").trim();
        let compensated_energy_data = arrayOfLines[bill_data_index + 3].split(" ");
        compensated_energy_data = compensated_energy_data.filter(el => {
            return el != "";
        })
        let compensated_energy_qt = compensated_energy_data[4].replace('.', '').replace(",", ".").trim();
        let compensated_energy_value = compensated_energy_data[6].replace('.', '').replace(",", ".").trim();
        let public_lighting_data = arrayOfLines[bill_data_index + 4].split(" ");
        let public_lighting_value = public_lighting_data.pop()?.replace('.', '').replace(",", ".");

        // console.log("************************************************");
        // console.log("********** DADOS EXTRAÍDOS N", key,"*********************");
        // console.log("");
        // console.log("NOME:", client_name);
        // console.log("CODES", client_codes);
        // console.log("CUSTOMER CODE", client_code);
        // console.log("INSTALLATION CODE", installation_number);
        // console.log("REFERENCE", reference_data);
        // console.log("REFERENCE DATE", date_reference);
        // console.log("REFERENCE DATE MONTH", reference_date_month);
        // console.log("REFERENCE DATE YEAR", reference_date_year);
        // console.log("DUE DATE", due_date);
        // console.log("TOTAL", total_value);
        // console.log("ENERGY QT", energy_qt);
        // console.log("ENERGY VALUE", energy_value);
        // console.log("ENERGY SCEE S/ ICMS QT", energy_scee_s_icms_qt);
        // console.log("ENERGY SCEE S/ ICMS VALUE", energy_scee_s_icms_value);
        // console.log("COMPESATED QT", compensated_energy_qt);
        // console.log("COMPESATED VALUE", compensated_energy_value);
        // console.log("PUBLIC LIGHTING VALUE", public_lighting_value);

        // console.log("*********************DATA***********************");
        // console.log("DATA ENERGY", energy_data);
        // console.log("DATA SCEE S ICMS", energy_scee_s_icms_data);
        // console.log("DATA COMPENSATEDj", compensated_energy_data);

        if (isTest) {
            sequelize.authenticate().then(() => {
                console.log("Success!");
            }).catch((err: any) => {
                console.log(err);
            });
            sequelize.addModels([Client, Bill])
            await Client.sync();
            await Bill.sync();
        }

        let client = {
            client_code,
            installation_number,
            name: client_name,
            distributor: "CEMIG"
        };
        await clientRepository.create(client)

        let bill = {
            client_code,
            installation_number,
            reference_date_month,
            reference_date_year,
            due_date,
            total_value,
            energy_qt,
            energy_value,
            energy_scee_s_icms_qt,
            energy_scee_s_icms_value,
            compensated_energy_qt,
            compensated_energy_value,
            public_lighting_value
        };
        await billRepository.create(bill)

        return { bill, client }
    });

}
