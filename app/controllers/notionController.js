//* --- Modules ---
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

//* --- Environment Variables ---
dotenv.config();
const NOTION_API_KEY = process.env.NOTION_API_KEY;

//* --- Notion Configuration ---
const notion = new Client({ auth: NOTION_API_KEY });

//* --- Functions ---

//* Update the page with the amount
async function updateHypixelDBData(res, pageID, amount) {
    try{
        await notion.pages.update({
            page_id: pageID,
            properties: {
                Amount: amount
            }
        });
        return [];
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//* Get some data from the page
async function getHypixelDBData(res, pageID) {
    try{
        const response = await notion.pages.retrieve({
            page_id: pageID
        });
        let goalAmount = response.properties["Goal Amount"].number;
        let daysUntilGoal = response.properties["Days until goal"].formula.number;
        //res.status(200).json({ message: "Data sent to Notion" });
        return { goalAmount, daysUntilGoal };
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//* Get the pageID of the last page in the database
async function getLastPageID(res, databaseID) {
    try{
        const response = await notion.databases.query({
            database_id: databaseID,
            sorts: [
                {
                    property: "Update Date",
                    direction: "descending"
                }
            ],
        });
        const results = response.results;
        const lastPage = results[results.length - 1];
        return lastPage.id;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//* Update the previous page in the database with the amount
async function updateLastPage(res, lastPageID, amount) {
    try {
        await notion.pages.update({
            page_id: lastPageID,
            properties: {
                'Next Amount': amount
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//* Create a new page in the page's database with the Amount, Days until goal and goal amount
async function createNewPage(res, databaseID, amount, daysUntilGoal, goalAmount) {
    try {
        await notion.pages.create({
            parent: {
                database_id: databaseID
            },
            properties: {
                Amount: amount,
                'Days until goal': daysUntilGoal,
                'Goal Amount': goalAmount
            }
        });
        res.status(200).json({ message: "Data sent to Notion" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//* --- Update data to Notion (receive the pageName and the amount from the post route) ---
async function notionAPI(req, res) {
    const { pageName, amount } = req.body;
    console.log("Page Name: " + pageName);
    const pageID = process.env["NOTION_PAGE_ID__" + pageName];
    const databaseID = process.env["NOTION_DATABASE_ID__" + pageName];
    if (!pageID) {
        res.status(400).json({ error: "Invalid page name" });
        return;
    }
//* --- Hypixel DB (related) ---

    await updateHypixelDBData(res, pageID, amount);

    let goalAmount = 0;
    let daysUntilGoal = 0;

    let hypixelDBData = await getHypixelDBData(res, pageID);
    goalAmount = hypixelDBData.goalAmount;
    daysUntilGoal = hypixelDBData.daysUntilGoal;

//* --- {Page specific} Database ---

    let lastPageID = await getLastPageID(res, databaseID);

    await updateLastPage(res, lastPageID, amount);

    await createNewPage(res, databaseID, amount, daysUntilGoal, goalAmount);
}

module.exports = { notionAPI };