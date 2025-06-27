const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    filename: String,
    mimetype: String,
    size: Number,
    data: Buffer,
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);
