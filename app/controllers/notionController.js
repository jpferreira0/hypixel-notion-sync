//* --- Modules ---
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

//* --- Environment Variables ---
dotenv.config();
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

//* --- Notion Configuration ---
const notion = new Client({ auth: NOTION_API_KEY });

//* --- Functions ---

//* 1st - Update the main page with the amount
async function updateHypixelDBData(res, pageID, amount) {
    try{
        await notion.pages.update({
            page_id: pageID,
            properties: {
                "Amount": {
                    number: amount
                },
            }
        });
        return [];
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//* 2nd - Get data from the main page to create the new one
async function getHypixelDBData(res, pageID) {
    try{
        const response = await notion.pages.retrieve({
            page_id: pageID
        });
        let goalAmount = response.properties["Goal Amount"].number || 0;
        let goalDate = response.properties["Goal Date"].date?.start || null;
        //TODO: See if there is more information to pass from the main page to the new ones
        //res.status(200).json({ message: "Data sent to Notion" });
        return { goalAmount, goalDate };
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

/* //! Get the pageID of the last page in the database
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
}*/

//* 3rd - Get the last pageID of the relation (day before this update)
async function getLastPageID(res, databaseID, relatedPageID) {
    try {
        const response = await notion.databases.query({
            database_id: databaseID,
            filter: {
                property: "History",
                relation: {
                    contains: relatedPageID
                }
            },
            sorts: [
                {
                    property: "Last Update",
                    direction: "ascending"
                }
            ],
            page_size: 1
        });

        const results = response.results;
        if (results.length === 0) {
            return null;
        }

        return results[0].id;
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
        return null;
    }
}

//* 4th - Update the last page of the relation (day before this update) with the amount
async function updateLastPage(res, lastPageID, amount) {
    try {
        await notion.pages.update({
            page_id: lastPageID,
            properties: {
                "Amount next Day": {
                    number: amount
                },
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//* 5th - Create a new page in the page's database with the Amount, Days until goal and goal amount
async function createNewPage(res, databaseID, pageID, amount, goalDate, goalAmount) {
    try {
        let properties = {
            "Amount": {
                number: amount
            },
            "Goal Amount": {
                number: goalAmount
            },
            "History": {
                relation: [{ id: pageID }]
            },
            "Type": {
                select: { name: "History" }
            }
        }
        if (goalDate) {
            properties["Goal Date"] = { date: { start: goalDate } };
        }
    
        await notion.pages.create({
            parent: {
                database_id: databaseID
            },
            properties: properties
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
    console.log("Updating Information regarding: ", pageName);
    const pageID = process.env["NOTION_PAGE_ID__" + pageName];
    if (!pageID) {
        res.status(400).json({ error: "Invalid page name" });
        return;
    }

    //* 1st - Update the main page
    await updateHypixelDBData(res, pageID, amount);

    //* 2nd - Get data from the main page
    let hypixelDBData = await getHypixelDBData(res, pageID);
    let goalAmount = hypixelDBData.goalAmount;
    let goalDate = hypixelDBData.goalDate;

    //* 3rd - Get the pageID of the last page of the relation (day before this update)
    let lastPageID = await getLastPageID(res, NOTION_DATABASE_ID, pageID);

    //* 4th - Update the last page of the relation (with the new amount)
    if(lastPageID){
        await updateLastPage(res, lastPageID, amount);
    }

    //* 5th and Final - Create a new page and add the data to it.
    await createNewPage(res, NOTION_DATABASE_ID, pageID, amount, goalDate, goalAmount);
    console.log("Finished information on: ", pageName);
}

module.exports = { notionAPI };