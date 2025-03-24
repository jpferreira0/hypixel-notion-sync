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

async function getNotionPagesIDAPI(req, res) {
    let pages = [];
    let hasMore = true;
    let startCursor = undefined;

    try {
        //* Get the number of pages in the Database and adds them to an array.
        while (hasMore) {
            const response = await notion.databases.query({
                database_id: NOTION_DATABASE_ID,
                filter: {
                    property: "Type",
                    select: {
                        equals: "Main"
                    }
                },
                sorts: [
                    {
                        timestamp: "created_time", // Sort by Notion's built-in creation time
                        direction: "descending"
                    }
                ],
                page_size: 100, // Max per request
                start_cursor: startCursor // Get next batch if available
            });

            //* --- Add fetched pages to array ---
            pages.push(
                ...response.results.map(page => ({
                    id: page.id,
                    name: page.properties.Name.title[0].plain_text
                }))
            );

            //* --- Check if there are more pages to fetch ---
            hasMore = response.has_more;
            startCursor = response.next_cursor; // Move to next batch

            console.log(`Fetched ${pages.length} pages so far...`);
        }
    } 
    catch (error) {
        console.error("Error fetching Notion pages:", error);
        return res.status(500).json({ error: error.message });
    }

    //* Load existing .env content to avoid duplicates
    const envFilePath = '.env';
    let existingEnvContent = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf8') : '';

    //* --- Write pages to .env, stopping if a duplicate is found ---
    for (const page of pages) {
        let pageName = "NOTION_PAGE_ID__" + page.name.toUpperCase().replace(/ /g, "_");
        let pageID = page.id.toString();

        //* Check if entry already exists in .env
        if (existingEnvContent.includes(`${pageName} = ${pageID}`)) {
            console.log(`Duplicate found: ${pageName} already exists. Stopping.`);
            break; // Stops writing
        }

        //* Append new entry to .env
        try {
            fs.appendFileSync(envFilePath, `\n${pageName} = ${pageID}`);
            existingEnvContent += `\n${pageName} = ${pageID}`; // Update in-memory content
            console.log(`Added: ${pageName} = ${pageID}`);
        } 
        catch (error) {
            console.error("Error processing page:", page.name, error);
        }
    }

    return res.status(200).json({ message: `PageIDs updated. Total pages processed: ${pages.length}` });
}

module.exports = { getNotionPagesIDAPI };