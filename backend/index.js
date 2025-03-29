const express = require('express');
const multer  = require('multer')
const path = require('path');
const cors = require('cors')
const app = express();
const PORT = 5000;
const fs = require('fs');
const fileRouter = require('./routes/fileRoute')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//serve image statically
app.use('/uploads', express.static('uploads'));

app.use(cors());

// Route to handle GET requests
app.get('/', (req, res) => {
    res.send("get the data");
});

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads'); // ✅ Correct path
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        // Accept only specific file types (e.g., images)
        const allowedTypes = /jpeg|jpg|png|gif|mp4/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed (JPEG, PNG, GIF)'));
        }
    }
});


app.get( '/upload'  , fileRouter );


// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
   
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }
    // Respond with uploaded file details
    
    res.status(200).json({
        message: 'File uploaded successfully',
        file: {
            originalname: req.file.originalname,
            filename: req.file.filename,
            path:`/uploads/${req.file.filename}`,
            size: req.file.size
        }
    });
});

// Error handling middleware for Multer errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });
    } else if (err) {
        res.status(400).send({ error: err.message });
    } else {
        next();
    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));