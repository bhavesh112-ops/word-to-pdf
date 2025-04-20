const express = require('express');
const multer = require('multer');
const libre = require('libreoffice-convert');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });
app.use(express.static('public'));

app.post('/convert', upload.single('wordFile'), (req, res) => {
    const ext = '.pdf';
    const inputPath = req.file.path;
    const outputPath = `${req.file.path}${ext}`;

    const file = fs.readFileSync(inputPath);
    libre.convert(file, ext, undefined, (err, done) => {
        if (err) {
            console.error(`Conversion error: ${err}`);
            return res.status(500).send('Failed to convert file');
        }

        fs.writeFileSync(outputPath, done);
        res.download(outputPath, 'converted.pdf', (err) => {
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
