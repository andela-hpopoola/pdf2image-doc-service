const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return file.mimetype !== 'application/pdf'
      ? callback({ message: 'Uploaded file must be valid pdf' })
      : callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    const [name, extension] = file.originalname.split('.');
    callback(null, name + '-' + Date.now() + '.' + extension);
  }
});

const MAX_PDF_SIZE = 2000000; //2MB
const upload = multer({
  limits: { fileSize: MAX_PDF_SIZE },
  storage: storage
}).single('pdf');

module.exports = {
  pdf(req, res, next) {
    upload(req, res, err => {
      if (err) {
        return res.status(412).json({ msg: err.message, status: 'error' });
      }
      res.locals.file = req.file;
      next();
    });
  }
};
