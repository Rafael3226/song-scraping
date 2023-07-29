const fs = require('fs')

function CreateFile(name, content) {
  fs.appendFile(name, content, function (err) {
    if (err) throw err
  })
}

function OpenFile(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' })
}

function OpenJson(filePath) {
  return JSON.parse(OpenFile(filePath))
}

function CreateDirectory(folderName) {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
}

async function GetFileNamesAsync(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, f) => {
      if (err) reject(err)
      resolve(f)
    })
  })
}

exports.OpenJson = OpenJson
exports.CreateFile = CreateFile
exports.CreateDirectory = CreateDirectory
exports.GetFileNamesAsync = GetFileNamesAsync
