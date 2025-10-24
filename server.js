const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 3000;

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

// 代理视频请求
function proxyVideo(req, res) {
    const videoUrl = 'https://drive.austinjiang.com/f/J7Sz/damnshit.mp4';
    
    console.log('代理视频请求:', videoUrl);
    
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    };
    
    // 处理Range请求（用于视频流）
    if (req.headers.range) {
        options.headers.Range = req.headers.range;
    }
    
    const proxyReq = https.get(videoUrl, options, (proxyRes) => {
        // 设置CORS头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Range');
        
        // 复制响应头
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        
        // 管道传输数据
        proxyRes.pipe(res);
    });
    
    proxyReq.on('error', (error) => {
        console.error('代理请求错误:', error);
        res.writeHead(500);
        res.end('代理错误');
    });
}

const server = http.createServer((req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const url = req.url;
    
    // 代理视频请求
    if (url === '/video' || url === '/damnshit.mp4') {
        proxyVideo(req, res);
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
    console.log('视频代理已启用，绕过CORS限制');
});