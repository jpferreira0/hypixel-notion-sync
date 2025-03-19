//* --- Parse all the data relevant for the Collections ---
//* Data to parse: NAME: {collection_name} AMOUNT: {amount};
function parsingCollections(data){
    console.log("Starting to parse Collections");
    const collection = data.collection;
    const catacombs_floors = data.dungeons.dungeon_types.catacombs.tier_completions;
    const master_catacombs_floors = data.dungeons.dungeon_types.master_catacombs.tier_completions;
    const kuudra_completions = data.nether_island_player_data.kuudra_completed_tiers;
    let parsedData = [];
    //* Foraging Collections
    // parsedData.push({ name: "Acacia Wood", amount: collection["LOG_2"] });
    // parsedData.push({ name: "Birch Wood", amount: collection["LOG:2"] });
    // parsedData.push({ name: "Dark Oak Wood", amount: collection["LOG_2:1"] });
    // parsedData.push({ name: "Jungle Wood", amount: collection["LOG:3"] });
    // parsedData.push({ name: "Oak Wood", amount: collection["LOG"] });
    // parsedData.push({ name: "Spruce Wood", amount: collection["LOG:1"] });
    //* Mining Collections
    // parsedData.push({ name: "Coal", amount: collection["COAL"] });
    // parsedData.push({ name: "Cobblestone", amount: collection["COBBLESTONE"] });
    // parsedData.push({ name: "Diamond", amount: collection["DIAMOND"] });
    // parsedData.push({ name: "Emerald", amount: collection["EMERALD"] });
    // parsedData.push({ name: "End Stone", amount: collection["ENDER_STONE"] });
    // parsedData.push({ name: "Gemstone", amount: collection["GEMSTONE_COLLECTION"] });
    // parsedData.push({ name: "Glacite", amount: collection["GLACITE"] });
    // parsedData.push({ name: "Glowstone Dust", amount: collection["GLOWSTONE_DUST"] });
    // parsedData.push({ name: "Gold Ingot", amount: collection["GOLD_INGOT"] });
    // parsedData.push({ name: "Gravel", amount: collection["GRAVEL"] });
    // parsedData.push({ name: "Hard Stone", amount: collection["HARD_STONE"] });
    // parsedData.push({ name: "Ice", amount: collection["ICE"] });
    // parsedData.push({ name: "Iron Ingot", amount: collection["IRON_INGOT"] });
    // parsedData.push({ name: "Lapis Lazuli", amount: collection["INK_SACK:4"] });
    // parsedData.push({ name: "Mithril", amount: collection["MITHRIL_ORE"] });
    // parsedData.push({ name: "Mycelium", amount: collection["MYCEL"] });
    // parsedData.push({ name: "Nether Quartz", amount: collection["QUARTZ"] });
    // parsedData.push({ name: "Netherrack", amount: collection["NETHERRACK"] });
    // parsedData.push({ name: "Obsidian", amount: collection["OBSIDIAN"] });
    // parsedData.push({ name: "Red Sand", amount: collection["SAND:1"] });
    // parsedData.push({ name: "Redstone", amount: collection["REDSTONE"] });
    // parsedData.push({ name: "Sand", amount: collection["SAND"] });
    // parsedData.push({ name: "Sulphur", amount: collection["SULPHUR_ORE"] });
    // parsedData.push({ name: "Tungsten", amount: collection["TUNGSTEN"] });
    // parsedData.push({ name: "Umber", amount: collection["UMBER"] });
    //* Farming Collections
    // parsedData.push({ name: "Cactus", amount: collection["CACTUS"] });
    // parsedData.push({ name: "Carrot", amount: collection["CARROT_ITEM"] });
    // parsedData.push({ name: "Cocoa Beans", amount: collection["INK_SACK:3"] });
    // parsedData.push({ name: "Feather", amount: collection["FEATHER"] });
    // parsedData.push({ name: "Leather", amount: collection["LEATHER"] });
    // parsedData.push({ name: "Melon", amount: collection["MELON"] });
    // parsedData.push({ name: "Mushroom", amount: collection["MUSHROOM_COLLECTION"] });
    // parsedData.push({ name: "Mutton", amount: collection["MUTTON"] });
    // parsedData.push({ name: "Nether Wart", amount: collection["NETHER_STALK"] });
    // parsedData.push({ name: "Potato", amount: collection["POTATO_ITEM"] });
    // parsedData.push({ name: "Pumpkin", amount: collection["PUMPKIN"] });
    // parsedData.push({ name: "Raw Chicken", amount: collection["RAW_CHICKEN"] });
    // parsedData.push({ name: "Raw Porkchop", amount: collection["PORK"] });
    // parsedData.push({ name: "Raw Rabbit", amount: collection["RABBIT"] });
    // parsedData.push({ name: "Seeds", amount: collection["SEEDS"] });
    // parsedData.push({ name: "Sugar Cane", amount: collection["SUGAR_CANE"] });
    // parsedData.push({ name: "Wheat", amount: collection["WHEAT"] });
    //* Fishing Collections
    // parsedData.push({ name: "Clay", amount: collection["CLAY_BALL"] });
    // parsedData.push({ name: "Clownfish", amount: collection["RAW_FISH:2"] });
    // parsedData.push({ name: "Ink Sac", amount: collection["INK_SACK"] });
    // parsedData.push({ name: "Lily Pad", amount: collection["WATER_LILY"] });
    // parsedData.push({ name: "Magmafish", amount: collection["MAGMA_FISH"] });
    // parsedData.push({ name: "Prismarine Crystals", amount: collection["PRISMARINE_CRYSTALS"] });
    // parsedData.push({ name: "Prismarine Shard", amount: collection["PRISMARINE_SHARD"] });
    // parsedData.push({ name: "Pufferfish", amount: collection["RAW_FISH:3"] });
    // parsedData.push({ name: "Raw Fish", amount: collection["RAW_FISH"] });
    // parsedData.push({ name: "Raw Salmon", amount: collection["RAW_FISH:1"] });
    // parsedData.push({ name: "Sponge", amount: collection["SPONGE"] });
    //* Combat Collections
    // parsedData.push({ name: "Blaze Rod", amount: collection["BLAZE_ROD"] });
    // parsedData.push({ name: "Bone", amount: collection["BONE"] });
    // parsedData.push({ name: "Chili Pepper", amount: collection["CHILI_PEPPER"] });
    // parsedData.push({ name: "Ender Pearl", amount: collection["ENDER_PEARL"] });
    // parsedData.push({ name: "Ghast Tear", amount: collection["GHAST_TEAR"] });
    // parsedData.push({ name: "Gunpowder", amount: collection["SULPHUR"] });
    // parsedData.push({ name: "Magma Cream", amount: collection["MAGMA_CREAM"] });
    // parsedData.push({ name: "Rotten Flesh", amount: collection["ROTTEN_FLESH"] });
    // parsedData.push({ name: "Slimeball", amount: collection["SLIME_BALL"] });
    // parsedData.push({ name: "Spider Eye", amount: collection["SPIDER_EYE"] });
    // parsedData.push({ name: "String", amount: collection["STRING"] });
    //* Rift Collections
    // parsedData.push({ name: "Agaricus Cap", amount: collection["AGARICUS_CAP"] });
    // parsedData.push({ name: "Caducous Stem", amount: collection["CADUCOUS_STEM"] });
    // parsedData.push({ name: "Half-Eaten Carrot", amount: collection["HALF_EATEN_CARROT"] });
    // parsedData.push({ name: "Hemovibe", amount: collection["HEMOVIBE"] });
    // parsedData.push({ name: "Living Metal Heart", amount: collection["METAL_HEART"] });
    // parsedData.push({ name: "Timite", amount: collection["TIMITE"] });
    // parsedData.push({ name: "Wilted Berberis", amount: collection["WILTED_BERBERIS"] });
    //* Boss Collections
    parsedData.push({ name: "Bonzo", amount: (catacombs_floors["1"] || 0) + (master_catacombs_floors["1"] * 2 || 0) });
    parsedData.push({ name: "Scarf", amount: (catacombs_floors["2"] || 0) + (master_catacombs_floors["2"] * 2 || 0) });
    parsedData.push({ name: "The professor", amount: (catacombs_floors["3"] || 0) + (master_catacombs_floors["3"] * 2 || 0) });
    parsedData.push({ name: "Thorn", amount: (catacombs_floors["4"] || 0) + (master_catacombs_floors["4"] * 2 || 0) });
    parsedData.push({ name: "Livid", amount: (catacombs_floors["5"] || 0) + (master_catacombs_floors["5"] * 2 || 0) });
    parsedData.push({ name: "Sadan", amount: (catacombs_floors["6"] || 0) + (master_catacombs_floors["6"] * 2 || 0) });
    parsedData.push({ name: "Necron", amount: (catacombs_floors["7"] || 0) + (master_catacombs_floors["7"] * 2 || 0) });
    parsedData.push({ name: "Kuudra", amount: (kuudra_completions["none"] || 0) + (kuudra_completions["hot"] || 0) * 2 + (kuudra_completions["burning"] || 0) * 3});
    return parsedData;
}

export { parsingCollections };