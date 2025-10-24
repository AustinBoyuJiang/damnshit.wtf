# WTF Video Player

A chaotic and fun HTML video player that loops a single video with attitude! Features colorful animations, floating elements, and some spicy language.

## Features

- 🔄 Auto-looping single video playback
- 🎨 Psychedelic gradient background animation
- 💀 Floating chaos elements (skulls, fire, explosions)
- 🔊 Auto-enabled sound (after user interaction)
- 📱 Responsive design
- 🎭 No controls - pure chaos mode

## Usage

### Simple Method:
1. Put your video file as `public/files/video.mp4`
2. Open `index.html` directly in your browser

### Server Method:
1. Make sure Node.js is installed
2. Put your video file as `public/files/video.mp4`
3. Run the server:
   ```bash
   npm start
   ```
4. Open browser and go to `http://localhost:3000`

## Design Elements

- **DAMN!** - Top left floating text
- **SHIT!** - Top right rotating text  
- **WTF?!** - Bottom left large text
- Floating emojis: 💀🔥💥⚡🤯
- Rainbow gradient background
- Pulsing video border
- Author credit: Austin (bottom right)

## Supported Video Formats

- MP4 (.mp4) - Primary format
- WebM (.webm)
- Ogg (.ogg)

## File Structure

```
├── index.html          # Main chaotic page
├── server.js           # Node.js server
├── package.json        # Project config
└── public/
    └── files/          # Video directory
        └── video.mp4   # Your single video file
```

## Notes

- No video controls - it just loops forever
- Sound auto-enables after any user interaction
- Best experienced with modern browsers
- Created by Austin with love and chaos