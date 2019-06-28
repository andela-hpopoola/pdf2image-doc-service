var multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, './uploads'),
  filename: function(req, file, callback) {
    const [name, extension] = file.originalname.split('.');
    callback(null, name + '-' + Date.now() + '.' + extension);
  }
});

var upload = multer({ storage: storage }).single('pdf');

module.exports = {
  pdf(req, res, next) {
    upload(req, res, function(err) {
      if (err) {
        res.status(412).json({ msg: 'Error uploading file.' });
      }
      res.json({
        file: req.file
      });
    });
  }
};
