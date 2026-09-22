// =====================================
// THE SACRIFICE CLUB - JAVASCRIPT
// =====================================


// =====================================
// CONFIGURATION
// =====================================

const TEAM_ID = "the-sacrifice-club";
const MEMBER_GOAL = 100;


// =====================================
// MEMBER COUNTER - LICHESS API
// =====================================

async function updateMembers() {

    const counter = document.getElementById("memberCounter");

    if (!counter) return;

    // Temporary message while loading
    counter.textContent = "♟️ Members: Loading...";

    try {

        const response = await fetch(
            `https://lichess.org/api/team/${TEAM_ID}/users`
        );

        if (!response.ok) {
            throw new Error(`Lichess API error: ${response.status}`);
        }

        const text = await response.text();

        // Lichess returns one JSON object per line
        const members = text
            .trim()
            .split("\n")
            .filter(line => line.trim() !== "")
            .map(line => JSON.parse(line));

        const memberCount = members.length;

        counter.textContent =
            `♟️ Members: ${memberCount} / ${MEMBER_GOAL}`;

    } catch (error) {

        console.error("Unable to load Lichess team members:", error);

        // Fallback if the API cannot be reached
        counter.textContent =
            `♟️ Members: -- / ${MEMBER_GOAL}`;

    }

}


// =====================================
// CHESS QUOTES
// =====================================

const quotes = [

    "A sacrifice is the soul of chess.",

    "Attack is the best form of defense.",

    "Great chess comes from great ideas.",

    "Mikhail Tal showed that imagination wins games.",

    "Every sacrifice tells a story."

];


function newQuote() {

    const quote = document.getElementById("quote");

    if (!quote || quotes.length === 0) return;

    const random =
        Math.floor(Math.random() * quotes.length);

    quote.textContent =
        `♟️ ${quotes[random]}`;

}


// =====================================
// SACRIFICE OF THE DAY
// =====================================

const sacrifices = [

    "Mikhail Tal - Brilliant attacking masterpiece",

    "Queen sacrifice leading to checkmate",

    "A beautiful exchange sacrifice",

    "A tactical combination with a stunning finish",

    "A fearless attack against the king"

];


function showSacrifice() {

    const box =
        document.getElementById("sacrifice");

    if (!box || sacrifices.length === 0) return;

    const random =
        Math.floor(Math.random() * sacrifices.length);

    box.textContent =
        `🔥 ${sacrifices[random]}`;

}


// =====================================
// RANDOM CHESS CHALLENGE
// =====================================

const challenges = [

    "🔥 Sacrifice a piece for a strong attack!",

    "♟️ Play an attacking opening!",

    "⚔️ Try to attack the enemy king!",

    "🧠 Solve 5 chess puzzles today!",

    "👑 Study one game from Mikhail Tal!",

    "🔥 Create a brilliant combination!",

    "♞ Play a game using a knight sacrifice!",

    "🏆 Help another club member improve!"

];


function randomChallenge() {

    const box =
        document.getElementById("challenge");

    if (!box || challenges.length === 0) return;

    const random =
        Math.floor(Math.random() * challenges.length);

    box.textContent =
        challenges[random];

}


// =====================================
// INITIALIZATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    updateMembers();

});