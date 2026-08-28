const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Identifiant de l'équipe Lichess
const TEAM_ID = "the-sacrifice-club";

// Sert tous les fichiers de ton site
app.use(express.static("."));

// API : récupération des membres de l'équipe
app.get("/api/members", async (req, res) => {
    try {
        const response = await fetch(
            `https://lichess.org/api/team/${TEAM_ID}/users`
        );

        if (!response.ok) {
            throw new Error(
                `Lichess API returned ${response.status}`
            );
        }

        const text = await response.text();

        // Lichess renvoie les membres au format NDJSON :
        // un objet JSON par ligne.
        const members = text
            .trim()
            .split("\n")
            .filter(Boolean)
            .map(line => JSON.parse(line));

        res.json(members);

    } catch (error) {
        console.error("Lichess API error:", error);

        res.status(500).json({
            error: "Unable to retrieve Lichess members"
        });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(
        `The Sacrifice Club website is running on http://localhost:${PORT}`
    );
});