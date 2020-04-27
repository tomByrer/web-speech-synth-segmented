import fs from "fs"
const readJSON = (a, b = "utf8") =>
	JSON.parse(fs.readFileSync(a, { encoding: b }))

const { version } = readJSON('package.json')
let outHTM = fs.readFileSync('src/head.htm', "utf8")
const js = fs.readFileSync('src/index.js', "utf8")
const foot = fs.readFileSync('src/foot.htm', "utf8")

outHTM += `version:`+ version +`</textarea></div><script>`+ js + foot

// console.log(info)

let outHTMFile = 'docs/index.html'
try {
  fs.writeFileSync(outHTMFile, outHTM, { mode: 0o755 });
  console.log('Wrote to: '+ outHTMFile)
} catch(err) {
  console.error(err);
}
