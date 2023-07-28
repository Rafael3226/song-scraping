import fs from "fs";

export function CreateFile(name, content) {
  fs.appendFile(name, content, function (err) {
    if (err) throw err;
  });
}
