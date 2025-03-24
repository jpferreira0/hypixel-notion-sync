//* --- Modules ---
const fs = require('fs');
const axios = require('axios'); //TODO - GitHub said it has 1 vulnerability check it out
const path = require('path');
const dotenv = require('dotenv');

//* --- Environment Variables ---
dotenv.config();
const HYPIXEL_API_KEY = process.env.HYPIXEL_API_KEY;
const HYPIXEL_PROFILE_UUID = process.env.HYPIXEL_PROFILE_UUID;

//* --- Backup Configuration ---
const BACKUP_FOLDER = 'backups';
const BACKUP_EXPIRATION = 30 * 24 * 60 * 60 * 1000; //TODO 30 days interval -> Update to 12 hours.

//* --- Hypixel API Configuration ---
const HYPIXEL_API_LINK = 'https://api.hypixel.net/v2/skyblock/profile?key=' + HYPIXEL_API_KEY + '&profile=' + HYPIXEL_PROFILE_UUID; //TODO - Still temporary API Key (Wait for approval)

//* --- Create the name for the backup file (dd_mm_aaaa_hh_mm_ss.txt) ---
function getBackupFileName() {
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}_${
        (now.getMonth() + 1).toString().padStart(2, '0')}_${now.getFullYear()}_${
        now.getHours().toString().padStart(2, '0')}_${
        now.getMinutes().toString().padStart(2, '0')}_${
        now.getSeconds().toString().padStart(2, '0')}`;
    
    return path.join(BACKUP_FOLDER, `${formattedDate}.txt`);
}

//* --- Check the last backup file---
function getLatestBackup() {
    const files = fs.readdirSync(BACKUP_FOLDER)
        .filter(file => file.endsWith('.txt'))
        .map(file => ({
            file,
            time: fs.statSync(path.join(BACKUP_FOLDER, file)).mtimeMs
        }))
        .sort((a, b) => b.time - a.time);

    return files.length > 0 ? path.join(BACKUP_FOLDER, files[0].file) : null;
}

//* --- Get data from the Hypixel API ---
async function hypixelAPI(req, res) {
    try {
        const latestBackup = getLatestBackup();

        if (latestBackup) {
            const backupStats = fs.statSync(latestBackup);
            const now = Date.now();
            //* --- If the backup has less than 12 hours, get the data from the backup ---
            if (now - backupStats.mtimeMs < BACKUP_EXPIRATION) { 
                console.log('Serving data from latest backup:', latestBackup);
                const backupData = fs.readFileSync(latestBackup, 'utf8');
                return res.json(JSON.parse(backupData));
            }
        }
        //* --- If there was no backup or it is older than 12 hours, get the data from the API ---
        console.log('Fetching new data from API.');
        const response = await axios.get(HYPIXEL_API_LINK);
        const data = response.data;

        //* --- Save the new backup ---
        const backupFile = getBackupFileName();
        fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
        res.json(data); //* Sends the data back to the client.

    } catch (error) {
        console.error('Error fetching API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

module.exports = { hypixelAPI };