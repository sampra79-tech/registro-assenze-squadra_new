function buildStatistics() {

    const ranking = [];

    PLAYERS.forEach(player => {

        let present = 0;
        let absent = 0;
        let justified = 0;

        Object.keys(localStorage).forEach(key => {

            if (!key.startsWith(player + "_")) {
                return;
            }

            const value = localStorage.getItem(key);

            switch (value) {

                case "P":
                    present++;
                    break;

                case "A":
                    absent++;
                    break;

                case "G":
                    justified++;
                    break;

            }

        });

        const total =
            present +
            absent +
            justified;

        const percentage =
            total > 0
                ? Math.round(
                    (present / total) * 100
                )
                : 0;

        ranking.push({
            player,
            present,
            absent,
            justified,
            total,
            percentage
        });

    });

    ranking.sort(
        (a, b) =>
            b.percentage - a.percentage
    );

    return ranking;

}