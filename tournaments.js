// =====================================
// THE SACRIFICE CLUB
// TOURNAMENTS
// =====================================

const TEAM_ID = "the-sacrifice-club";


// =====================================
// GET NDJSON FROM LICHESS
// =====================================

async function loadNDJSON(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Lichess API error");
    }

    const text = await response.text();

    return text
        .trim()
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => JSON.parse(line));

}


// =====================================
// FORMAT DATE
// =====================================

function formatDate(timestamp) {

    if (!timestamp) {
        return "Date unknown";
    }

    return new Date(timestamp).toLocaleString(
        "en-GB",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


// =====================================
// FORMAT DURATION
// =====================================

function formatDuration(seconds) {

    if (!seconds) {
        return "";
    }

    const minutes = Math.round(seconds / 60);

    if (minutes < 60) {
        return `⏱️ ${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    if (remaining === 0) {
        return `⏱️ ${hours}h`;
    }

    return `⏱️ ${hours}h ${remaining}min`;

}


// =====================================
// CREATE CARD
// =====================================

function createTournamentCard(tournament, type, status) {

    const card = document.createElement("div");

    card.className = "card tournament-card";


    const icon =
        type === "arena"
            ? "🔥"
            : "⚔️";


    let statusText = "";

    if (status === "current") {
        statusText = "🟢 In progress";
    }

    else if (status === "upcoming") {
        statusText = "🔵 Upcoming";
    }

    else {
        statusText = "✅ Finished";
    }


    const name =
        tournament.fullName ||
        tournament.name ||
        "The Sacrifice Club Tournament";


    const players =
        tournament.nbPlayers !== undefined
            ? `<p>👥 ${tournament.nbPlayers} players</p>`
            : "";


    const duration =
        tournament.seconds
            ? `<p>${formatDuration(tournament.seconds)}</p>`
            : "";


    const startDate =
        tournament.startsAt
            ? `<p>🕐 ${formatDate(tournament.startsAt)}</p>`
            : "";


    const tournamentUrl =
        type === "arena"
            ? `https://lichess.org/tournament/${tournament.id}`
            : `https://lichess.org/swiss/${tournament.id}`;


    card.innerHTML = `

        <h3>
            ${icon} ${name}
        </h3>

        <p class="tournament-status">
            ${statusText}
        </p>

        ${startDate}

        ${duration}

        ${players}

        <a
            class="button"
            href="${tournamentUrl}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Open on Lichess
        </a>

    `;


    return card;

}


// =====================================
// DISPLAY TOURNAMENTS
// =====================================

function displayTournaments(
    tournaments,
    containerId,
    type,
    status
) {

    const container =
        document.getElementById(containerId);


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!tournaments || tournaments.length === 0) {

        container.innerHTML = `

            <div class="card empty-card">

                <p>
                    No tournaments here right now.
                </p>

            </div>

        `;

        return;

    }


    tournaments.forEach(tournament => {

        container.appendChild(
            createTournamentCard(
                tournament,
                type,
                status
            )
        );

    });

}


// =====================================
// LOAD ARENA
// =====================================

async function loadArena() {

    try {

        const current =
            await loadNDJSON(
                `https://lichess.org/api/team/${TEAM_ID}/arena?max=30&status=started`
            );


        const upcoming =
            await loadNDJSON(
                `https://lichess.org/api/team/${TEAM_ID}/arena?max=30&status=created`
            );


        const finished =
            await loadNDJSON(
                `https://lichess.org/api/team/${TEAM_ID}/arena?max=30&status=finished`
            );


        displayTournaments(
            current,
            "arenaCurrent",
            "arena",
            "current"
        );


        displayTournaments(
            upcoming,
            "arenaUpcoming",
            "arena",
            "upcoming"
        );


        displayTournaments(
            finished,
            "arenaFinished",
            "arena",
            "finished"
        );

    }


    catch (error) {

        console.error(
            "Arena error:",
            error
        );


        showError("arenaCurrent");

        showError("arenaUpcoming");

        showError("arenaFinished");

    }

}


// =====================================
// LOAD SWISS
// =====================================

async function loadSwiss() {

    try {

        const current =
            await loadNDJSON(
                `https://lichess.org/api/team/${TEAM_ID}/swiss?max=30&status=started`
            );


        const upcoming =
            await loadNDJSON(
                `https://lichess.org/api/team/${TEAM_ID}/swiss?max=30&status=created`
            );


        const finished =
            await loadNDJSON(
                `https://lichess.org/api/team/${TEAM_ID}/swiss?max=30&status=finished`
            );


        displayTournaments(
            current,
            "swissCurrent",
            "swiss",
            "current"
        );


        displayTournaments(
            upcoming,
            "swissUpcoming",
            "swiss",
            "upcoming"
        );


        displayTournaments(
            finished,
            "swissFinished",
            "swiss",
            "finished"
        );

    }


    catch (error) {

        console.error(
            "Swiss error:",
            error
        );


        showError("swissCurrent");

        showError("swissUpcoming");

        showError("swissFinished");

    }

}


// =====================================
// ERROR MESSAGE
// =====================================

function showError(containerId) {

    const container =
        document.getElementById(containerId);


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="card">

            <p>
                ⚠️ Unable to load tournaments.
            </p>

            <p>
                Please try again later.
            </p>

        </div>

    `;

}


// =====================================
// START
// =====================================

loadArena();

loadSwiss();