const { createServer } = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const publicDirectory = path.join(__dirname, "public");

createServer((req, res) => {
    let requestedFilePath = path.join(publicDirectory, req.url);

    // Default to index.html if no file specified
    if (req.url === "/" || req.url === "") {
        requestedFilePath = path.join(publicDirectory, "index.html");
    }

    // Check if the file exists
    if (fs.existsSync(requestedFilePath)) {
        const fileExt = path.extname(requestedFilePath);

        switch (fileExt) {
            case ".html":
                res.setHeader("Content-Type", "text/html");
                break;
            case ".css":
                res.setHeader("Content-Type", "text/css");
                break;
            case ".js":
                res.setHeader("Content-Type", "application/javascript");
                break;
            default:
                res.setHeader("Content-Type", "text/plain");
        }

        const fileStream = fs.createReadStream(requestedFilePath);
        fileStream.pipe(res);
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(path.join(publicDirectory, "404.html"));
    }
}).listen(PORT);

