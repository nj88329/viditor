const express = require('express');
const multer  = require('multer')
const path = require('path');
const cors = require('cors')
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

// Route to handle GET requests
app.get('/', (req, res) => {
    res.send("get the data");
});


// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files will be saved in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

// const upload = multer({ storage });

// // Route to handle file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded');
//     }
//     res.status(200).send({ message: 'File uploaded successfully', file: req.file });
// });
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        // Accept only specific file types (e.g., images)
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed (JPEG, PNG, GIF)'));
        }
    }
});

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    // Respond with uploaded file details
    res.status(200).send({
        message: 'File uploaded successfully',
        file: {
            originalname: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        }
    });
});

// Error handling middleware for Multer errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).send({ error: err.message });
    } else if (err) {
        res.status(400).send({ error: err.message });
    } else {
        next();
    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));