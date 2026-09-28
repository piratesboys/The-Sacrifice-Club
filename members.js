/*
 * ==========================================
 * CONFIGURATION
 * ==========================================
 */

const API_URL =
    "https://lichess.org/api/team/the-sacrifice-club/users";

/*
 * Mise à jour toutes les 30 secondes
 */

const UPDATE_INTERVAL = 30000;


/*
 * ==========================================
 * LOAD MEMBERS
 * ==========================================
 */

async function loadMembers() {

    const container =
        document.getElementById("members");

    const count =
        document.getElementById("member-count");

    const lastUpdate =
        document.getElementById("last-update");


    try {

        /*
         * Demande les membres à Lichess
         */

        const response = await fetch(
            API_URL,
            {
                method: "GET",
                cache: "no-store"
            }
        );


        /*
         * Vérifie la réponse
         */

        if (!response.ok) {

            throw new Error(
                "Lichess returned HTTP " +
                response.status
            );

        }


        /*
         * L'API renvoie du JSONL :
         * un objet JSON par ligne.
         */

        const text =
            await response.text();


        const members =
            text
                .split("\n")
                .filter(
                    line =>
                        line.trim() !== ""
                )
                .map(
                    line =>
                        JSON.parse(line)
                );


        /*
         * ==================================
         * NO MEMBERS
         * ==================================
         */

        if (members.length === 0) {

            count.textContent = "0";

            container.innerHTML =
                "<p>No members found.</p>";

            return;

        }


        /*
         * ==================================
         * MEMBER COUNT
         * ==================================
         */

        count.textContent =
            members.length;


        /*
         * ==================================
         * CREATE MEMBER CARDS
         * ==================================
         */

        const fragment =
            document.createDocumentFragment();


        members.forEach(
            member => {

                /*
                 * Username
                 */

                const username =
                    member.username ||
                    member.id ||
                    member.name;

                if (!username) {
                    return;
                }


                /*
                 * Member card
                 */

                const card =
                    document.createElement("a");


                card.className =
                    "member-card";


                /*
                 * Lien vers le profil Lichess
                 */

                card.href =
                    "https://lichess.org/@/" +
                    encodeURIComponent(username);


                card.target = "_blank";


                card.rel =
                    "noopener noreferrer";


                /*
                 * ==================================
                 * AVATAR
                 * ==================================
                 */

                const avatar =
                    document.createElement("img");


                /*
                 * Avatar Lichess
                 */

                avatar.src =
                    "https://lichess1.org/" +
                    "user/" +
                    encodeURIComponent(username) +
                    "/avatar";


                avatar.alt =
                    username + " avatar";


                avatar.className =
                    "member-avatar";


                /*
                 * Si l'avatar ne fonctionne pas,
                 * on utilise l'avatar par défaut.
                 */

                avatar.onerror =
                    function () {

                        this.src =
                            "https://lichess1.org/" +
                            "assets/logo/lichess-favicon-512.png";

                    };


                /*
                 * ==================================
                 * USERNAME
                 * ==================================
                 */

                const name =
                    document.createElement("span");


                name.className =
                    "member-name";


                name.textContent =
                    "♟️ " + username;


                /*
                 * ==================================
                 * ADD TO CARD
                 * ==================================
                 */

                card.appendChild(avatar);

                card.appendChild(name);

                fragment.appendChild(card);

            }
        );


        /*
         * ==================================
         * DISPLAY EVERYTHING
         * ==================================
         */

        container.innerHTML = "";

        container.appendChild(fragment);


        /*
         * ==================================
         * LAST UPDATE
         * ==================================
         */

        const now =
            new Date();


        lastUpdate.textContent =
            "Last updated: " +
            now.toLocaleTimeString();


        console.log(
            "Lichess members updated:",
            members.length
        );


    } catch (error) {

        /*
         * ==================================
         * ERROR
         * ==================================
         */

        console.error(
            "Unable to load Lichess members:",
            error
        );


        count.textContent = "—";


        container.innerHTML =
            `
            <p>
                🔴 Unable to update members.
                <br>
                Please try again later.
            </p>
            `;


        lastUpdate.textContent =
            "Update failed";

    }

}


/*
 * ==========================================
 * FIRST UPDATE
 * ==========================================
 */

loadMembers();


/*
 * ==========================================
 * AUTOMATIC UPDATE
 * ==========================================
 *
 * Toutes les 30 secondes,
 * le site demande à Lichess
 * s'il y a de nouveaux membres.
 *
 */

setInterval(
    loadMembers,
    UPDATE_INTERVAL
);