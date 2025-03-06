const fs = require('fs');
const axios = require('axios');
const path = require('path');

const BACKUP_FOLDER = 'app/backups';
const BACKUP_EXPIRATION = 24 * 60 * 60 * 1000; // 1 dia
const API_URL = 'https://sky.shiiyu.moe/api/v2/profile/TruePlayeZ';

// Função para obter o nome do backup baseado na data/hora atual
function getBackupFileName() {
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}_${
        (now.getMonth() + 1).toString().padStart(2, '0')}_${now.getFullYear()}_${
        now.getHours().toString().padStart(2, '0')}_${
        now.getMinutes().toString().padStart(2, '0')}_${
        now.getSeconds().toString().padStart(2, '0')}`;
    
    return path.join(BACKUP_FOLDER, `${formattedDate}.txt`);
}

// Função para obter o backup mais recente
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

// Função para obter os dados (do backup ou API)
async function getData(req, res) {
    try {
        const latestBackup = getLatestBackup();

        if (latestBackup) {
            const stats = fs.statSync(latestBackup);
            const now = Date.now();

            if (now - stats.mtimeMs < BACKUP_EXPIRATION) {
                console.log('Serving data from latest backup:', latestBackup);
                const backupData = fs.readFileSync(latestBackup, 'utf8');
                return res.json(JSON.parse(backupData));
            }
        }

        // Se o backup for velho ou não existir, faz um pedido à API original
        console.log('Fetching new data from API.');
        //const response = await axios.get(API_URL);
        const data = response.data;

        // Criar um novo ficheiro de backup com o nome formatado
        const backupFile = getBackupFileName();
        fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));

        console.log('New backup saved:', backupFile);

        // Enviar os dados para o frontend
        res.json(data);

    } catch (error) {
        console.error('Error fetching API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

module.exports = { getData };