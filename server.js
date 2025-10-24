const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const VIDEO_DIR = './public/files';
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];

// 扫描视频文件
function scanVideoFiles() {
    try {
        if (!fs.existsSync(VIDEO_DIR)) {
            return [];
        }
        
        const files = fs.readdirSync(VIDEO_DIR);
        const videoFiles = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return VIDEO_EXTENSIONS.includes(ext);
            })
            .map(file => `public/files/${file}`);
        
        return videoFiles;
    } catch (error) {
        console.error('扫描视频文件出错:', error);
        return [];
    }
}

// 获取文件MIME类型
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.ogg': 'video/ogg'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const url = req.url;
    
    // API路由：获取视频列表
    if (url === '/api/videos') {
        const videos = scanVideoFiles();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(videos));
        return;
    }
    
    // 静态文件服务
    let filePath = '.' + url;
    if (url === '/') {
        filePath = './index.html';
    }
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('文件未找到');
        return;
    }
    
    // 读取并返回文件
    const mimeType = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': mimeType });
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('打开浏览器访问上述地址即可观看视频');
});