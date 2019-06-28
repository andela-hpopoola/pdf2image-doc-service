const fs = require('fs');
const pdfParse = require('pdf-parse');

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
  }
};
