/*
====================================================
💥 THE SACRIFICE CLUB
SACRIFICES OF THE WEEK
====================================================

Pour ajouter un sacrifice :

1. Copie un objet { ... }
2. Modifie les informations
3. Ajoute une virgule entre les objets
4. Mets le lien Lichess de la partie dans "game"

Exemple :

{
    rank: 1,
    title: "The Brilliant Sacrifice",
    player: "OneoftheTwo",
    opponent: "Opponent",
    move: "Bxf7+!!",

    description:
        "A spectacular bishop sacrifice that opens the king and creates a dangerous attack.",

    game: "https://lichess.org/XXXXXXXX",

    date: "September 2026",
    type: "Bishop sacrifice",
    speed: "Blitz"
}

====================================================
*/


const sacrifices = [

    {
        rank: 1,

        title: "double bishop sacrifice",

        player: ".Piratesboy",

        opponent: "NM SLOM",

        move: "bishop sacrifice",

        description:
            "a double bishop sacrifice",

        game:
            "https://lichess.org/8ZdPXvpGblxQ",

        date: "20/09/2026",

        type: "friendly",

        speed: "rapid"
    },


    {
        rank: 2,

        title: "coming soon...",

        player: "...",

        opponent: "...",

        move: "...",

        description:
            "...",

        game:
            "...",

        date: "...",

        type: "...",

        speed: "..."
    },


    {
        rank: 3,

        title: "coming soon...",

        player: "...",

        opponent: "...",

        move: "...",

        description:
            "...",

        game:
            "...",

        date: "...",

        type: "...",

        speed: "..."
    },

    {
        rank: 4,

        title: "coming soon...",

        player: "...",

        opponent: "...",

        move: "...",

        description:
            "...",

        game:
            "...",

        date: "...",

        type: "...",

        speed: "..."
    }


];


/*
====================================================
💥 DISPLAY SACRIFICES
====================================================
*/

const container = document.getElementById("sacrifices");


/*
----------------------------------------------------
ESCAPE HTML
----------------------------------------------------

This prevents accidental HTML from being inserted
through player names or descriptions.
*/

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/*
----------------------------------------------------
CHECK LICHESS LINK
----------------------------------------------------
*/

function isValidLichessLink(url) {

    if (!url) {
        return false;
    }

    return url.startsWith("https://lichess.org/");
}


/*
----------------------------------------------------
CREATE SACRIFICE CARD
----------------------------------------------------
*/

function createSacrificeCard(sacrifice) {

    const rank =
        escapeHTML(sacrifice.rank);

    const title =
        escapeHTML(sacrifice.title);

    const player =
        escapeHTML(sacrifice.player);

    const opponent =
        escapeHTML(sacrifice.opponent);

    const move =
        escapeHTML(sacrifice.move);

    const description =
        escapeHTML(sacrifice.description);

    const date =
        escapeHTML(sacrifice.date);

    const type =
        escapeHTML(sacrifice.type);

    const speed =
        escapeHTML(sacrifice.speed);


    /*
    ------------------------------------------------
    BUTTON
    ------------------------------------------------
    */

    let gameButton = "";


    if (isValidLichessLink(sacrifice.game)) {

        gameButton = `
            <a
                class="button"
                href="${escapeHTML(sacrifice.game)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ♟️ Watch the game on Lichess →
            </a>
        `;

    } else {

        gameButton = `
            <span class="button disabled-button">
                ♟️ Game link coming soon
            </span>
        `;

    }


    /*
    ------------------------------------------------
    CARD
    ------------------------------------------------
    */

    return `

        <article
            class="sacrifice-card"
            data-rank="${rank}"
        >

            <div class="sacrifice-rank">
                #${rank}
            </div>


            <div class="sacrifice-content">

                <div class="sacrifice-title">

                    <span aria-hidden="true">
                        💥
                    </span>

                    <h3>
                        ${title}
                    </h3>

                </div>


                <p class="sacrifice-players">

                    <strong>
                        ${player}
                    </strong>

                    <span>
                        vs
                    </span>

                    <strong>
                        ${opponent}
                    </strong>

                </p>


                <div
                    class="sacrifice-move"
                    title="Sacrificial move"
                >
                    ${move}
                </div>


                <p class="sacrifice-description">
                    ${description}
                </p>


                <div class="sacrifice-info">

                    <span>
                        ♟️ ${type}
                    </span>

                    <span>
                        ⚡ ${speed}
                    </span>

                    <span>
                        📅 ${date}
                    </span>

                </div>


                <div class="sacrifice-actions">

                    ${gameButton}

                </div>

            </div>

        </article>

    `;
}


/*
====================================================
💥 DISPLAY ALL SACRIFICES
====================================================
*/

function displaySacrifices() {

    if (!container) {
        return;
    }


    /*
    -----------------------------------------------
    NO SACRIFICES
    -----------------------------------------------
    */

    if (!Array.isArray(sacrifices) || sacrifices.length === 0) {

        container.innerHTML = `

            <article class="sacrifice-card empty-card">

                <div class="sacrifice-content">

                    <div class="sacrifice-title">

                        <span>
                            💤
                        </span>

                        <h3>
                            No sacrifices yet
                        </h3>

                    </div>

                    <p class="sacrifice-description">

                        No sacrifices have been added this week.

                        Keep attacking and come back soon!

                    </p>

                </div>

            </article>

        `;

        return;
    }


    /*
    -----------------------------------------------
    SORT BY RANK
    -----------------------------------------------
    */

    const sortedSacrifices = [...sacrifices]
        .sort((a, b) => a.rank - b.rank);


    /*
    -----------------------------------------------
    RENDER
    -----------------------------------------------
    */

    container.innerHTML =
        sortedSacrifices
            .map(createSacrificeCard)
            .join("");

}


/*
====================================================
🚀 START
====================================================
*/

displaySacrifices();