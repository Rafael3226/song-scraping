const fs = require("fs");

function CreateFile(name, content) {
  fs.appendFile(name, content, function (err) {
    if (err) throw err;
  });
}

function OpenFile(filePath) {
  return fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
}

function OpenJson(filePath) {
  return JSON.parse(OpenFile(filePath));
}

function CreateDirectory(folderName) {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}

exports.OpenJson = OpenJson;
exports.CreateFile = CreateFile;
exports.CreateDirectory = CreateDirectory;
