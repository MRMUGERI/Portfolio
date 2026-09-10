import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Handle CV file download explicitly to handle URL encoding / space variations
app.get(['/Mugeri%20Mo%20CV%20.pdf', '/Mugeri%20Mo%20CV.pdf', '/Mugeri Mo CV .pdf', '/Mugeri Mo CV.pdf'], (req, res) => {
  const possiblePaths = [
    path.join(__dirname, 'Mugeri Mo CV.pdf'),
    path.join(__dirname, 'Mugeri Mo CV .pdf'),
  ];
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return res.download(filePath, 'Mugeri Mo CV.pdf');
    }
  }
  res.status(404).send('CV file not found');
});

// Serve static assets from root directory
app.use(express.static(__dirname));

// Primary route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
