const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./test.pdf');

module.exports = {
  convert(req, res) {
    pdf(dataBuffer)
      .then(function(data) {
        res.json({ result: data.text, message: 'success' });
      })
      .catch(function(error) {
        res.json({ message: 'error' });
      });
  }
};
