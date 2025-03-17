//* --- Parse the data from the API ---
//* NOTE: The parsing itself is done across multiple files and sent to this one ---
// include("js/parsingBestiary.js");
import { parsingCollections } from "./dataParsing/parsingCollections.js";
import { notionAPI } from "./handleAPI.js";
// include("./dataParsing/parsingCollections.js");
// include("js/parsingSkills.js");
// include("js/parsingSlayers.js");
// include("js/parsingCurrency.js");
// include("js/parsingOthers.js");

//* --- Data received from the files comes in this form:
//* data = { name: {NAME}, amount: {AMOUNT} }
//* -> The name has to match the name of the page in Notion
//* -> The amount is the amount of items to be updated in the page



function dataParsing(rawData) {
    let parsedData = [];
    const profileData = Object.values(rawData.profile.members)[0];
    //* --- Parse the data (Across multiple files) ---
    // parsedData.concat(parsingBestiary(data));
    parsedData = parsedData.concat(parsingCollections(profileData.collection));
    //parsedData.concat(parsingCollections("data"));
    // parsedData.concat(parsingSkills(data));
    // parsedData.concat(parsingSlayers(data));
    // parsedData.concat(parsingCurrency(data));
    // parsedData.concat(parsingOthers(data));
    //* --- Send the data to Notion API ---
    parsedData.forEach(data => {
        let pageName = data.name.toUpperCase().replace(/ /g, "_");
        console.log(pageName + ": " + data.amount);
        //notionAPI(pageName, data.amount);
    });
}

export { dataParsing };