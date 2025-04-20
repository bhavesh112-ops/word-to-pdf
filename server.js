const express = require('express');
const multer = require('multer');
const libre = require('libreoffice-convert');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000; // for Railway deployment

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files from public folder
app.use(express.static('public'));

// Conversion route
app.post('/convert', upload.single('wordFile'), (req, res) => {
    const ext = '.pdf';
    const inputPath = req.file.path;
    const outputPath = `${inputPath}${ext}`;

    const file = fs.readFileSync(inputPath);

    libre.convert(file, ext, undefined, (err, done) => {
        if (err) {
            console.error(`Error converting file: ${err}`);
            return res.status(500).send('Conversion error.');
        }

        fs.writeFileSync(outputPath, done);

        res.download(outputPath, 'converted.pdf', (err) => {
            // Clean up temporary files
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
