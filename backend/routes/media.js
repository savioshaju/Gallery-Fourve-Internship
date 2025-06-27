const express = require('express');
const router = express.Router();
const multer = require('multer');
const Media = require('../models/Media');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST Upload file


router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const newMedia = new Media({
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            data: req.file.buffer,
            uploadedAt: new Date(),
        });

        await newMedia.save();

        res.json({ message: 'File uploaded successfully', id: newMedia._id });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

// GET Fetch media 


router.get('/', async (req, res) => {
    try {
        const type = req.query.type || 'all';
        let query = {};

        if (type === 'image') {
            query.mimetype = { $regex: /^image\// };
        } else if (type === 'video') {
            query.mimetype = { $regex: /^video\// };
        }
        const files = await Media.find(query).sort({ uploadedAt: -1 });
        res.json({ files });
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET file by ID 

router.get('/:id', async (req, res) => {
    try {
        const file = await Media.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const range = req.headers.range;
        const fileSize = file.data.length;

        if (!range) {
            res.set({
                'Content-Length': fileSize,
                'Content-Type': file.mimetype,
            });
            return res.send(file.data);
        }

        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize) {
            res.status(416).set('Content-Range', `bytes */${fileSize}`).end();
            return;
        }

        const chunkSize = end - start + 1;
        const chunk = file.data.slice(start, end + 1);

        res.status(206).set({
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': file.mimetype,
        });

        res.send(chunk);

    } catch (error) {
        console.error('Range Streaming Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST
router.post('/details', async (req, res) => {
    try {
        const { mediaIds } = req.body;
        if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
            return res.status(400).json({ error: 'mediaIds array is required' });
        }

        const files = await Media.find({ _id: { $in: mediaIds } });

        res.json({ files });
    } catch (error) {
        console.error('Error fetching media details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETE

router.delete('/delete/:id', async (req, res) => {
  try {
    const mediaId = req.params.id;

    const media = await Media.findByIdAndDelete(mediaId);
    if (!media) return res.status(404).json({ error: 'Media not found' });

    res.json({ success: true, id: mediaId });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
