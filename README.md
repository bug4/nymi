# $NYMI Landing (React + Vite + Tailwind + Framer Motion)

A minimal landing with:
- Intro screen: “Are you ready to make it?” + button to start music
- Fullscreen looping background video (30% dark tint)
- Centered `$NYMI` ticker with three buttons: Twitter / Community / Copy CA
- White glow text + smooth animations

## Quick Start
1) Install dependencies:
   ```bash
   npm install
   ```

2) Put your media files:
   - Replace `public/music.mp3` with your track
   - Replace `public/files/video.mp4` with your background video

3) Run locally:
   ```bash
   npm run dev
   ```
   Then open the URL printed in your terminal (default: http://localhost:5173).

4) Build for production:
   ```bash
   npm run build
   npm run preview
   ```

## Customize
- Update the contract string inside `src/App.tsx` (`CONTRACT` variable).
- Update button links in `ActionButton` usage (Twitter/Community).
- Tweak styles via Tailwind classes or adjust the `glow` style.

## Notes
- For audio to start, the user must click the intro button (browser policy).
- If you deploy under a subpath, ensure media paths `/music.mp3` and `/files/video.mp4` remain accessible or adjust paths accordingly.
