const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const MediaGroup = require('../models/MediaGroup');

// Creating group
router.post('/save', async (req, res) => {
    try {
        let { groupName, mediaIds } = req.body;

        if (!groupName || !Array.isArray(mediaIds) || mediaIds.length === 0) {
            return res.status(400).json({ message: 'Group name and media IDs are required.' });
        }

   
        const existingMedia = await Media.find({ _id: { $in: mediaIds } });
        if (existingMedia.length !== mediaIds.length) {
            return res.status(404).json({ message: 'Some media files not found.' });
        }


        let baseName = groupName.trim();
        let attemptName = baseName;
        let counter = 1;

        while (await MediaGroup.findOne({ groupName: attemptName })) {
            attemptName = `${baseName} (${counter})`;
            counter++;
        }

        const newGroup = new MediaGroup({
            groupName: attemptName,
            mediaIds
        });

        await newGroup.save();

        return res.status(201).json({ message: 'Group saved successfully.', group: newGroup });

    } catch (error) {
        console.error('Error saving media group:', error);
        return res.status(500).json({ message: 'Server error. Could not save group.' });
    }
});

// Get all groups 

router.get('/all', async (req, res) => {
    try {
        const groups = await MediaGroup.find({});
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching media groups:', error);
        res.status(500).json({ message: 'Server error. Could not retrieve groups.' });
    }
});
// GET media Id
router.get('/getMediaIds', async (req, res) => {
    try {
        const { groupName } = req.query;
        if (!groupName) {
            return res.status(400).json({ error: 'Group name is required' });
        }

        const group = await MediaGroup.findOne({ groupName });

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.json({ mediaIds: group.mediaIds });
    } catch (error) {
        console.error('Error fetching group media IDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//Delete group
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await MediaGroup.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Group not found' });

        res.json({ success: true, id });
    } catch (err) {
        console.error('Group delete error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
