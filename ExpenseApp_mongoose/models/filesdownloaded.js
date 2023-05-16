const mongoose = require('mongoose');

const filesDownloadedSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
    },
});

module.exports = mongoose.model('FilesDownloaded', filesDownloadedSchema);

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const FilesDownloaded = sequelize.define('FilesDownloaded', {
//     fileUrl: Sequelize.STRING
// })

// module.exports = FilesDownloaded;