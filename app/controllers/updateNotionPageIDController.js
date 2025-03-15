//* --- Modules ---
const fs = require('fs');
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

//* --- Environment Variables ---
dotenv.config();
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

//* --- Notion Configuration ---
const notion = new Client({ auth: NOTION_API_KEY });

async function getDatabaseIdFromPage(pageId) {
    try {
        const response = await notion.blocks.children.list({
            block_id: pageId,
        });

        // Find the first block that is a database
        const databaseBlock = response.results.find(
            (block) => block.type === "child_database"
        );

        if (databaseBlock) {
            // console.log("Database found: " + databaseBlock.id);
            return databaseBlock.id;
        } else {
            console.log("No database found inside this page.");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving database:", error);
    }
}

//* --- Get and update the .env file with all the pageIDs from the Notion Database ---
async function getNotionPagesIDAPI(req, res) {
    let pages = [];
    //* --- Get the Database data ---
    try {
        const database = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
        });
        //* --- Get pageIDs + Name of the pages ---
        pages = database.results.map(page => ({ id: page.id, name: page.properties.Name.title[0].plain_text }));
        // res.status(200).json({ message: "PageIDs updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    //* Get the Database ID that is inside each page
    for (const page of pages) {
        let pageName = "NOTION_PAGE_ID__" + page.name.toUpperCase().replace(/ /g, "_");
        let databaseName = "NOTION_DATABASE_ID__" + page.name.toUpperCase().replace(/ /g, "_");
        let pageID = page.id.toString();

        try {
            let databaseID = await getDatabaseIdFromPage(pageID);
            fs.appendFileSync('.env', `\n${pageName} = ${pageID}`);
            fs.appendFileSync('.env', `\n${databaseName} = ${databaseID}`);
        } catch (error) {
            console.error("Error processing page:", page.name, error);
        }
    }
    res.status(200).json({ message: "PageIDs updated" });
}

module.exports = { getNotionPagesIDAPI };