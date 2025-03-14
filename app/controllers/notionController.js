//* --- Modules ---
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

//* --- Environment Variables ---
dotenv.config();
const NOTION_API_KEY = process.env.NOTION_API_KEY;

//* --- Notion Configuration ---
const notion = new Client({ auth: NOTION_API_KEY });

//* --- Update data to Notion (receive the pageID and the amount from the post route) ---
async function notionAPI(req, res) {
    const { pageName, amount } = req.body;
    console.log("Sending data to Notion");
    const pageID = process.env[pageName];
    if (!pageID) {
        res.status(400).json({ error: "Invalid page name" });
        return;
    }

    //* --- Update the page with the amount of items ---
    try {
        await notion.pages.update({
            page_id: pageID,
            properties: {
                Amount: amount
            }
        });
        res.status(200).json({ message: "Data sent to Notion" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { notionAPI };