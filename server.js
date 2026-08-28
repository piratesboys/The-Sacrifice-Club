const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const TEAM_ID = "the-sacrifice-club";
const LICHESS_URL = "https://lichess.org/api/team/" + TEAM_ID + "/users";

const server = http.createServer(async function (req, res) {

    if (req.url === "/api/members") {
        try {
            const response = await fetch(LICHESS_URL, {
                headers: {
                    "Accept": "application/x-ndjson"
                }
            });

            if (!response.ok) {
                throw new Error("Lichess HTTP " + response.status);
            }

            const text = await response.text();

            const members = text
                .split("\n")
                .filter(function (line) {
                    return line.trim() !== "";
                })
                .map(function (line) {
                    return JSON.parse(line);
                });

            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8"
            });

            res.end(JSON.stringify({
                success: true,
                members: members
            }));

        } catch (error) {
            console.error("Erreur Lichess :", error);

            res.writeHead(500, {
                "Content-Type": "application/json; charset=utf-8"
            });

            res.end(JSON.stringify({
                success: false,
                error: "Unable to update members",
                message: error.message
            }));
        }

        return;
    }

    let requestedFile = req.url;

    if (requestedFile === "/") {
        requestedFile = "/index.html";
    }

    const filePath = path.join(__dirname, requestedFile);

    fs.readFile(filePath, function (error, data) {

        if (error) {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            res.end("404 - Page not found");
            return;
        }

        const extension = path.extname(filePath).toLowerCase();

        let contentType = "application/octet-stream";

        if (extension === ".html") {
            contentType = "text/html; charset=utf-8";
        } else if (extension === ".css") {
            contentType = "text/css; charset=utf-8";
        } else if (extension === ".js") {
            contentType = "application/javascript; charset=utf-8";
        } else if (extension === ".json") {
            contentType = "application/json; charset=utf-8";
        } else if (extension === ".png") {
            contentType = "image/png";
        } else if (extension === ".jpg" || extension === ".jpeg") {
            contentType = "image/jpeg";
        } else if (extension === ".svg") {
            contentType = "image/svg+xml";
        }

        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(data);
    });
});

server.listen(PORT, function () {
    console.log("");
    console.log("====================================");
    console.log("   THE SACRIFICE CLUB");
    console.log("====================================");
    console.log("");
    console.log("Site : http://localhost:" + PORT);
    console.log("API  : http://localhost:" + PORT + "/api/members");
    console.log("Lichess : https://lichess.org/team/" + TEAM_ID);
    console.log("");
    console.log("Serveur démarré !");
    console.log("");
});