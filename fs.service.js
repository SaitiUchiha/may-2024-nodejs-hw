const fs = require('node:fs/promises');
const path = require('node:path');

const pathToFile1 = path.resolve(__dirname, 'users.json');
const pathToFile2 = path.resolve(__dirname, 'users2.json');

module.exports = {
    read: async () => {
        try {
            const json = await fs.readFile(pathToFile1, 'utf-8');
            return json ? JSON.parse(json) : [];
        } catch (error) {
            console.log('Error:', error.message);
        }
    },
    write: async (users) => {
        try {
            await fs.writeFile(pathToFile2, JSON.stringify(users, null, 2));
        } catch (error) {
            console.log('Error:', error.message);
        }
    }
}