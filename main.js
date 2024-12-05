const path = require('node:path');
const fs = require('node:fs/promises');

const funct = async () => {

    await fs.mkdir(path.join(process.cwd(), 'baseFolder'));

    const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
    for (const folderName of folders) {
        await fs.mkdir(path.join("baseFolder", folderName));
        await fs.writeFile('text.txt', 'Home Work 2',)
        await fs.copyFile('text.txt', `${path.join("baseFolder", folderName, 'text.txt')}`);
        await fs.unlink('text.txt');
        const directoryPathInquiry = path.join("baseFolder", folderName)
        console.log('Folder path', directoryPathInquiry)
        const stat = await fs.stat(directoryPathInquiry);
        console.log(`${folderName} is Directory?`, stat.isDirectory());
        console.log(`${folderName} is file?`, stat.isFile());
        const filePathInquiry = path.join("baseFolder", folderName, 'text.txt')
        const stat2 = await fs.stat(filePathInquiry);
        console.log(`text.txt is Directory?`, stat2.isDirectory());
        console.log(`text.txt is file?`, stat2.isFile());
    }

    // await fs.rm(path.join(process.cwd(), 'baseFolder'), { recursive: true, force: true });
}

void funct();