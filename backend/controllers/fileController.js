const fs = require("fs");
const path = require("path");

exports.processFile = (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
 
    res
      .status(200)
      .json({ message: "File processed successfully", content: fileContent });
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error });
  }
};
