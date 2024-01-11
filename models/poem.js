const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}, {
    timestamps: true,
});

const Poem = mongoose.model('Poem', poemSchema);

module.exports = Poem;