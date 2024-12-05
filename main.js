const path = require('node:path');
const fs = require('node:fs/promises');

const funct = async () => {

    await fs.mkdir(path.join(process.cwd(), 'baseFolder'));

    const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
    const files = ['file1', 'file2', 'file3', 'file4', 'file5'];

    for (const folderName of folders) {
        await fs.mkdir(path.join("baseFolder", folderName));
        for (const fileName of files) {
            await fs.writeFile(`${fileName}.txt`, 'HomeWork 2')
            await fs.copyFile(`${fileName}.txt`, `${path.join("baseFolder", folderName, `${fileName}.txt`)}`);
            await fs.unlink(`${fileName}.txt`);
        }
    }

    for (const folderElement of folders) {
        const pathToFolder = path.join(process.cwd(), 'baseFolder', folderElement);
        console.log(`Folder path ${folderElement}`, pathToFolder);
        const stat = await fs.stat(pathToFolder);
        console.log(`${folderElement} is Directory?`, stat.isDirectory());
        console.log(`${folderElement} is file?`, stat.isFile());
        for (const fileName of files) {
            const pathToFile = path.join(`${pathToFolder}`, `${fileName}.txt`);
            console.log(path.basename(pathToFile));
            const stat2 = await fs.stat(pathToFile);
            console.log(`${fileName} is Directory?`, stat2.isDirectory());
            console.log(`${fileName} is file?`, stat2.isFile());
        }
    }

    // await fs.rm(path.join(process.cwd(), 'baseFolder'), { recursive: true, force: true });
}

void funct();