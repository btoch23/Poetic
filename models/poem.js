const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const poemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    comments: [commentSchema],
}, {
    timestamps: true,
});

const Poem = mongoose.model('Poem', poemSchema);

module.exports = Poem;