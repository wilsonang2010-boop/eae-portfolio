const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the study directory
app.use(express.static(path.join(__dirname, 'study'), {
  setHeaders: (res, filePath) => {
    // Service worker and HTML must be revalidated on every load
    if (filePath.endsWith('sw.js') || filePath.endsWith('index.html')) {
      res.set('Cache-Control', 'no-cache, max-age=0, must-revalidate');
    }
    // Icons are content-addressed by filename and change rarely
    else if (filePath.startsWith(path.join(__dirname, 'study', 'icons'))) {
      res.set('Cache-Control', 'public, max-age=604800');
    }
    // Manifest should also be revalidated
    else if (filePath.endsWith('.webmanifest')) {
      res.set('Cache-Control', 'no-cache, max-age=0, must-revalidate');
    }
  }
}));

// Fallback for client-side routing (if needed in future)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'study', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`O-Level HQ server running on port ${PORT}`);
});
