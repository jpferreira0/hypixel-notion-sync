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

//* --- Get and update the .env file with all the pageIDs from the Notion Database ---
async function getNotionPagesIDAPI(req, res) {
    console.log("Sending data to Notion");
    //* --- Get the Database data ---
    try {
        const database = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
        });
        //* --- Get pageIDs + Name of the pages ---
        const pages = database.results.map(page => ({ id: page.id, name: page.properties.Name.title[0].plain_text }));
        // //* --- Update the .env file with the pageIDs named like: "NOTION_PAGE_ID__LIVING_HEART_METAL = ---
        pages.forEach((page, index) => {
            let pageName = "NOTION_PAGE_ID__" + page.name.toUpperCase().replace(/ /g, "_");
            let pageID = (page.id).toString();
            fs.appendFileSync('.env', `\n${pageName} = ${pageID}`);
        });
        res.status(200).json({ message: "PageIDs updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getNotionPagesIDAPI };