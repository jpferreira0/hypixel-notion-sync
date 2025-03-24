//* --- Parse all the data relevant for the Bestiary ---
//* Data to parse: NAME: {creature_name} AMOUNT: {amount};
function parsingBestiary(data){
    //TODO - Parse the data for the Bestiary
    let parsedData = [];
    parsedData.push({ name: "Acacia Wood", amount: (collection["LOG_2"] || 0) });

    return parsedData;
}

export { parsingBestiary };