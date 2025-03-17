//* --- Parse all the data relevant for the Collections ---
//* Data to parse: NAME: {collection_name} AMOUNT: {amount};
function parsingCollections(data){
    //TODO - Parse the data for the Collections
    console.log("Starting to parse Collections");
    let parsedData = [];
    //* Foraging Collections
    parsedData.push({ name: "Acacia Wood", amount: data["LOG_2"] });
    parsedData.push({ name: "Birch Wood", amount: data["LOG:2"] });
    parsedData.push({ name: "Dark Oak Wood", amount: data["LOG_2:1"] });
    parsedData.push({ name: "Jungle Wood", amount: data["LOG:3"] });
    parsedData.push({ name: "Oak Wood", amount: data["LOG"] });
    parsedData.push({ name: "Spruce Wood", amount: data["LOG:1"] });
    //* Mining Collections
    parsedData.push({ name: "Coal", amount: data["COAL"] });
    parsedData.push({ name: "Cobblestone", amount: data["COBBLESTONE"] });
    parsedData.push({ name: "Diamond", amount: data["DIAMOND"] });
    parsedData.push({ name: "Emerald", amount: data["EMERALD"] });
    parsedData.push({ name: "End Stone", amount: data["ENDER_STONE"] });
    parsedData.push({ name: "Gemstone", amount: data["GEMSTONE_COLLECTION"] });
    parsedData.push({ name: "Glacite", amount: data["GLACITE"] });
    parsedData.push({ name: "Glowstone Dust", amount: data["GLOWSTONE_DUST"] });
    parsedData.push({ name: "Gold Ingot", amount: data["GOLD_INGOT"] });
    parsedData.push({ name: "Gravel", amount: data["GRAVEL"] });
    parsedData.push({ name: "Hard Stone", amount: data["HARD_STONE"] });
    parsedData.push({ name: "Ice", amount: data["ICE"] });
    parsedData.push({ name: "Iron Ingot", amount: data["IRON_INGOT"] });
    parsedData.push({ name: "Lapis Lazuli", amount: data["INK_SACK:4"] });
    parsedData.push({ name: "Mithril", amount: data["MITHRIL_ORE"] });
    parsedData.push({ name: "Mycelium", amount: data["MYCEL"] });
    parsedData.push({ name: "Nether Quartz", amount: data["QUARTZ"] });
    parsedData.push({ name: "Netherrack", amount: data["NETHERRACK"] });
    parsedData.push({ name: "Obsidian", amount: data["OBSIDIAN"] });
    parsedData.push({ name: "Red Sand", amount: data["SAND:1"] });
    parsedData.push({ name: "Redstone", amount: data["REDSTONE"] });
    parsedData.push({ name: "Sand", amount: data["SAND"] });
    parsedData.push({ name: "Sulphur", amount: data["SULPHUR_ORE"] });
    parsedData.push({ name: "Tungsten", amount: data["TUNGSTEN"] });
    parsedData.push({ name: "Umber", amount: data["UMBER"] });
    //* Farming Collections
    parsedData.push({ name: "Cactus", amount: data["CACTUS"] });
    parsedData.push({ name: "Carrot", amount: data["CARROT_ITEM"] });
    parsedData.push({ name: "Cocoa Beans", amount: data["INK_SACK:3"] });
    parsedData.push({ name: "Feather", amount: data["FEATHER"] });
    parsedData.push({ name: "Leather", amount: data["LEATHER"] });
    parsedData.push({ name: "Melon", amount: data["MELON"] });
    parsedData.push({ name: "Mushroom", amount: data["MUSHROOM_COLLECTION"] });
    parsedData.push({ name: "Mutton", amount: data["MUTTON"] });
    parsedData.push({ name: "Nether Wart", amount: data["NETHER_STALK"] });
    parsedData.push({ name: "Potato", amount: data["POTATO_ITEM"] });
    parsedData.push({ name: "Pumpkin", amount: data["PUMPKIN"] });
    parsedData.push({ name: "Raw Chicken", amount: data["RAW_CHICKEN"] });
    parsedData.push({ name: "Raw Porkchop", amount: data["PORK"] });
    parsedData.push({ name: "Raw Rabbit", amount: data["RABBIT"] });
    parsedData.push({ name: "Seeds", amount: data["SEEDS"] });
    parsedData.push({ name: "Sugar Cane", amount: data["SUGAR_CANE"] });
    parsedData.push({ name: "Wheat", amount: data["WHEAT"] });
    return parsedData;
}

export { parsingCollections };