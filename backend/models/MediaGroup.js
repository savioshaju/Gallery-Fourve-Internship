
const mongoose = require('mongoose');

const mediaGroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
    },
    mediaIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MediaGroup', mediaGroupSchema);
