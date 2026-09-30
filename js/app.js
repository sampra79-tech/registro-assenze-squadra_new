// ============================================
// REGISTRO ASSENZE SQUADRA
// APP.JS
// ============================================

let currentTrainingDate = "";

// ============================================
// AVVIO
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    initializeMonthPicker();
    initializeLogo();
    initializeSearch();
    initializeBackupButtons();
    initializeExcelButton();

    renderPlayers();
    loadTrainingDates();

});

// ============================================
// MESE
// ============================================

function initializeMonthPicker() {

    const picker =
        document.getElementById("monthPicker");

    const today = new Date();

    picker.value =
        today.toISOString().substring(0, 7);

    picker.addEventListener(
        "change",
        () => {

            loadTrainingDates();
            refreshDashboard();
            refreshStatistics();

        }
    );

}

// ============================================
// CALENDARIO ALLENAMENTI
// ============================================

function loadTrainingDates() {

    const picker =
        document.getElementById("monthPicker");

    const select =
        document.getElementById("trainingDate");

    select.innerHTML = "";

    const [year, month] =
        picker.value.split("-");

    const dates =
        getTrainingDays(
            parseInt(year),
            parseInt(month) - 1
        );

    dates.forEach(date => {

        const option =
            document.createElement("option");

        option.value =
            formatDate(date);

        option.textContent =
            formatDateItalian(date);

        select.appendChild(option);

    });

    if (dates.length > 0) {

        currentTrainingDate =
            formatDate(dates[0]);

    }

    select.addEventListener(
        "change",
        () => {

            currentTrainingDate =
                select.value;

            loadAttendance();

        }
    );

    loadAttendance();
    refreshDashboard();
    refreshStatistics();

}

// ============================================
// RENDER GIOCATORI
// ============================================

function renderPlayers() {

    const container =
        document.getElementById(
            "playersContainer"
        );

    container.innerHTML = "";

    PLAYERS.forEach(player => {

        const card =
            document.createElement("div");

        card.className = "player";
        card.dataset.player = player;

        card.innerHTML = `

            <div class="player-name">
                ${player}
            </div>

            <div class="status">

                <label>
                    <input
                        type="radio"
                        name="${player}"
                        value="P"
                        checked>
                    Presente
                </label>

                <label>
                    <input
                        type="radio"
                        name="${player}"
                        value="A">
                    Assente
                </label>

                <label>
                    <input
                        type="radio"
                        name="${player}"
                        value="G">
                    Giustificato
                </label>

            </div>
        `;

        container.appendChild(card);

    });

    document
        .getElementById("saveBtn")
        .addEventListener(
            "click",
            saveAttendance
        );

}

// ============================================
// SALVA ALLENAMENTO
// ============================================

function saveAttendance() {

    if (!currentTrainingDate) {
        alert(
            "Seleziona una data allenamento."
        );
        return;
    }

    PLAYERS.forEach(player => {

        const selected =
            document.querySelector(
                `input[name="${player}"\]:checked`
            );

        const status =
            selected
                ? selected.value
                : "P";

        const key =
            buildStorageKey(
                player,
                currentTrainingDate
            );

        localStorage.setItem(
            key,
            status
        );

    });

    refreshDashboard();
    refreshStatistics();

    alert(
        "Allenamento salvato correttamente."
    );

}

// ============================================
// CARICA ALLENAMENTO
// ============================================

function loadAttendance() {

    PLAYERS.forEach(player => {

        const key =
            buildStorageKey(
                player,
                currentTrainingDate
            );

        const value =
            localStorage.getItem(key) || "P";

        const radio =
            document.querySelector(
                `input[name="${player}"][value="${value}"]`
            );

        if (radio) {
            radio.checked = true;
        }

    });

}

// ============================================
// DASHBOARD
// ============================================

function refreshDashboard() {

    const picker =
        document.getElementById(
            "monthPicker"
        );

    const [year, month] =
        picker.value.split("-");

    const trainings =
        getTrainingDays(
            parseInt(year),
            parseInt(month) - 1
        );

    let present = 0;
    let absent = 0;
    let justified = 0;

    PLAYERS.forEach(player => {

        trainings.forEach(date => {

            const key =
                buildStorageKey(
                    player,
                    formatDate(date)
                );

            const value =
                localStorage.getItem(key);

            if (value === "A") {

                absent++;

            } else if (
                value === "G"
            ) {

                justified++;

            } else {

                present++;

            }

        });

    });

    const total =
        present +
        absent +
        justified;

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (present / total) * 100
            );

    document.getElementById(
        "dashboardTraining"
    ).textContent =
        trainings.length;

    document.getElementById(
        "dashboardPlayers"
    ).textContent =
        PLAYERS.length;

    document.getElementById(
        "dashboardPercentage"
    ).textContent =
        percentage + 