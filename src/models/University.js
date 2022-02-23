const mongoose = require('../database');

const UniversitySchema = new mongoose.Schema({
    alpha_two_code: {
        type: String,
    },
    web_pages: {
        type: Array,
    },
    name: {
        type: String,
    },
    country: {
        type: String,
        lowercase: true
    },
    domains: {
        type: Array,
    },
    state_province: {
        type: String,
        required: false,
    }
});

const University = mongoose.model('University', UniversitySchema);

module.exports = University;