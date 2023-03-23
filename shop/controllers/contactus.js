const path= require("path")

const rootDir = require('../util/path')

exports.contactuscontroller = (req,res) => {
    res.sendFile(path.join(rootDir,'views','contactus.html'))
}