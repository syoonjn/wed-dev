const fs = require('fs');
const path = require('path');

const basePath = '/wed-dev'; // basePath에 맞게 설정
const outDir = path.join(__dirname, '../out');

function moveStaticFiles() {
    const filesToMove = ['next.svg', 'vercel.svg']; // public 폴더의 정적 파일 이름

    filesToMove.forEach((file) => {
        const oldPath = path.join(outDir, file);
        const newDir = path.join(outDir, basePath);
        const newPath = path.join(newDir, file);

        if (fs.existsSync(oldPath)) {
            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir, { recursive: true });
            }

            fs.renameSync(oldPath, newPath);
            console.log(`Moved: ${oldPath} -> ${newPath}`);
        }
    });
}

moveStaticFiles();
