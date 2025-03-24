import { notionAPI } from "./handleAPI.js";
//* --- Parse the data from the API ---
//* NOTE: The parsing itself is done across multiple files and sent to this one ---
//import { parsingBestiary } from "./dataParsing/parsingBestiary.js";
import { parsingCollections } from "./dataParsing/parsingCollections.js";
//import { parsingCurrency } from "./dataParsing/parsingCurrency.js";
// include("js/parsingSkills.js");
// include("js/parsingSlayers.js");
// include("js/parsingOthers.js");

//* --- Data received from the files comes in this form:
//* data = { name: {NAME}, amount: {AMOUNT} }
//* -> The name has to match the name of the page in Notion
//* -> The amount is the quantity of (XP, collection, etc...) to be updated in the page

function dataParsing(rawData) {
    let parsedData = [];
    const profileData = Object.values(rawData.profile.members)[0];
    //* --- Parse the data (Across multiple files) ---
    // parsedData = parsedData.concat(parsingBestiary(profileData));
    parsedData = parsedData.concat(parsingCollections(profileData));
    // parsedData.concat(parsingSkills(data));
    // parsedData.concat(parsingSlayers(data));
    // parsedData.concat(parsingCurrency(data));
    // parsedData.concat(parsingOthers(data));
    //* --- Send the data to Notion API ---
    parsedData.forEach(data => {
        let pageName = data.name.toUpperCase().replace(/ /g, "_");
        notionAPI(pageName, data.amount);
    });
}

export { dataParsing };