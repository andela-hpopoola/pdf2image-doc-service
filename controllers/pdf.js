const fs = require('fs');
const pdfParse = require('pdf-parse');
const pdf2image = require('pdf2image');

module.exports = {
  extract_text(req, res) {
    const uploaded_pdf = res.locals.file;
    let dataBuffer = fs.readFileSync(uploaded_pdf.path);
    pdfParse(dataBuffer)
      .then(function(data) {
        res.json({ result: data.text, message: 'success' });
      })
      .catch(function(error) {
        res.json({ message: 'error' });
      });
  },
  convert_to_images(req, res) {
    const uploaded_pdf = res.locals.file;
    const options = {
      density: 200,
      quality: 100,
      outputFormat: '%p%s_page_%d',
      outputType: 'jpg'
    };
    pdf2image.convertPDF(uploaded_pdf.path, options).then(function(pageList) {
      res.json({ result: pageList });
    });
  }
};
