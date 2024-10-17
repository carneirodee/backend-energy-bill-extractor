import fs from 'fs';
import pdf from 'pdf-parse';


// let dataBuffer = fs.readFileSync('bills/3001116735-01-2024.pdf');
let dataBuffer = fs.readFileSync('bills/3001422762-09-2024.pdf');

pdf(dataBuffer).then(function (data) {
    let arrayOfLines = [];
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text);

    arrayOfLines = data.text.split("\n");

    for (let i = 0; i < arrayOfLines.length; i++) {
        console.log(i + "-" + arrayOfLines[i])
    }

    let customer_name = arrayOfLines[32] != "ATENÇÃO:" ? arrayOfLines[37] : arrayOfLines[32];
    let customer_codes_titles_index = arrayOfLines.indexOf("        Nº DO CLIENTE                      Nº DA INSTALAÇÃO");
    let customer_codes = arrayOfLines[customer_codes_titles_index + 1].split("        ");
    let customer_code = customer_codes[0].trim();
    let installation_code = customer_codes[1].trim();
    let reference_index = arrayOfLines.indexOf("         Referente a                                Vencimento                       Valor a pagar (R$)");
    let reference_data = arrayOfLines[reference_index + 1].split('               ');
    let date_reference = reference_data[0].trim();
    let due_date = reference_data[1];
    let total_value = reference_data[2].replace(",", ".").trim();
    let bill_data_index = arrayOfLines.indexOf("Itens da FaturaUnid.Quant.Preço UnitValor (R$) PIS/COFINSBase Calc.Aliq.ICMSTarifa Unit.") + 1;
    let energy_data = arrayOfLines[bill_data_index + 1].split(" ");
    energy_data = energy_data.filter(el => {
        return el != "";
    })
    let energy_qt = energy_data[2].trim();
    let energy_value = energy_data[4].replace(",", ".").trim();
    let energy_scee_s_icms_data = arrayOfLines[bill_data_index + 2].split(" ");
    energy_scee_s_icms_data = energy_scee_s_icms_data.filter(el => {
        return el != "";
    })
    let energy_scee_s_icms_qt = energy_scee_s_icms_data[4].trim();
    let energy_scee_s_icms_value = energy_scee_s_icms_data[6].replace(",", ".").trim();
    let compensated_energy_data = arrayOfLines[bill_data_index + 3].split(" ");
    compensated_energy_data = compensated_energy_data.filter(el => {
        return el != "";
    })
    let compensated_energy_qt = compensated_energy_data[4].trim();
    let compensated_energy_value = compensated_energy_data[6].replace(",", ".").trim();
    let public_lighting_data = arrayOfLines[bill_data_index + 4].split(" ");
    let public_lighting_value = public_lighting_data.pop()?.replace(",", ".");

    console.log("************************************************");
    console.log("********** DADOS EXTRAÍDOS *********************");
    console.log("NOME:", customer_name);
    console.log("CODES", customer_codes);
    console.log("CUSTOMER CODE", customer_code);
    console.log("INSTALLATION CODE", installation_code);
    console.log("REFERENCE", reference_data);
    console.log("REFERENCE DATE", date_reference);
    console.log("DUE DATE", due_date);
    console.log("TOTAL", total_value);
    console.log("ENERGY QT", energy_qt);
    console.log("ENERGY VALUE", energy_value);
    console.log("ENERGY SCEE S/ ICMS QT", energy_scee_s_icms_qt);
    console.log("ENERGY SCEE S/ ICMS VALUE", energy_scee_s_icms_value);
    console.log("COMPESATED QT", compensated_energy_qt);
    console.log("COMPESATED VALUE", compensated_energy_value);
    console.log("PUBLIC LIGHTING VALUE", public_lighting_value);

    console.log("*********************DATA***********************");
    console.log("DATA ENERGY", energy_data)
    console.log("DATA SCEE S ICMS", energy_scee_s_icms_data)
    console.log("DATA COMPENSATED", compensated_energy_data)

});