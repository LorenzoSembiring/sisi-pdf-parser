const pdf = require("pdf-parse");
const { jsPDF } = require("jspdf");
const { v4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Controller {
  parse = async (req, res) => {
    try {
      const file = req.file;

      const data = await pdf(file.buffer);
      const array = data.text.split("\n");

      const h1 = array[111];
      const h2 = array[114];
      const a1 = array[21];
      const a2 = array[23];
      const a3 = array[26];
      const b1 = array[115];
      const b2 = array[116];
      const b3 = array[117];
      const b4 = array[118];
      const b5 = array[119];
      const b6 = array[120];
      const b7nomor = array[44];
      const b7nama = array[50];
      const b7namaparsed = b7nama.replace(/[0-9]/g, "");
      const c1 = array.slice(82, 88).join(" ");
      const c2 = array[89];
      const c3 = array.slice(95, 99).join("");
      const formattedDate = `${c3.slice(0, 2)}-${c3.slice(2, 4)}-${c3.slice(4)}`;
      const c4 = array[10];
      const c5 = array[122];

      const doc = new jsPDF();
      const values = [
        `h1 = ${h1}`,
        `h2 = ${h2}`,
        `a1 = ${a1}`,
        `a2 = ${a2}`,
        `a3 = ${a3}`,
        `b1 = ${b1}`,
        `b2 = ${b2}`,
        `b3 = ${b3}`,
        `b4 = ${b4}`,
        `b5 = ${b5}`,
        `b6 = ${b6}`,
        `b7 nomor = ${b7nomor}`,
        `b7 nama = ${b7namaparsed}`,
        `c1 = ${c1}`,
        `c2 = ${c2}`,
        `c3 = ${formattedDate}`,
        `c4 = ${c4}`,
        `c5 = ${c5}`,
      ];

      let x = 10, y = 10, increment = 10;

      values.forEach(value => {
        doc.text(value, x, y);
        y += increment;
      });

      const fileName = `${v4()}.pdf`;
      const filePath = path.join(__dirname, "storage", fileName);

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      fs.writeFileSync(filePath, doc.output());

      return res.download(filePath, fileName, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          return res.status(500).json({ message: "Error downloading file" });
        }

        fs.unlinkSync(filePath);
      });
    } catch (err) {
      console.error("Error processing file:", err);
      return res.status(500).json({
        code: 500,
        message: "Failed to process file",
        error: err.message,
      });
    }
  };
}

module.exports = Controller;
