// 自动扫描视频文件的脚本
async function scanVideoFiles() {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
    const videoFiles = [];
    
    try {
        // 这里我们手动列出已知的视频文件
        // 在实际部署时，你可能需要服务器端支持来动态获取文件列表
        const knownFiles = [
            'public/files/video.mp4'
        ];
        
        for (const file of knownFiles) {
            const extension = file.toLowerCase().substring(file.lastIndexOf('.'));
            if (videoExtensions.includes(extension)) {
                videoFiles.push(file);
            }
        }
        
        return videoFiles;
    } catch (error) {
        console.error('扫描视频文件时出错:', error);
        return [];
    }
}

// 导出函数供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { scanVideoFiles };
}