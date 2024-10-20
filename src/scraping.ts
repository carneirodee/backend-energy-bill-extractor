import { scrapingDataPdf } from "./services/scrapingDataPdf";
import fs from 'fs';


export const extractDataPdf = async () => {

    fs.readdir("bills", async (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log("\nCurrent directory filenames:");
            files.forEach(async(file, key) => {
                const result = await scrapingDataPdf(file, key)
            });
        }
    })
}