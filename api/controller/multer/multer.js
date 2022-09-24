const multer  = require('multer')
const path = require('path');

const multerUpload = (folder) => {
    const folderPath = folder || "./uploads/courses";
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            // console.log(`file` ,file);
            // console.log(req.headers.lesson)
            // console.log(req.files)

            const fileUid = require("crypto").randomBytes(16).toString("hex");
            const fileName = `${fileUid}_${file.originalname}`;
            // console.log('name =',path.basename(file.originalname))
            
            
            cb(null, fileName);
        },
    });
    const upload = multer({ storage: storage });
    return upload;
};


module.exports = { 
    multerUpload
}