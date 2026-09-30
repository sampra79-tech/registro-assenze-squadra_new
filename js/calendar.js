function getTrainingDays(year, month) {

    const trainingDays = [];

    const current =
        new Date(year, month, 1);

    while (
        current.getMonth() === month
    ) {

        const day =
            current.getDay();

        if (
            day === 1 ||
            day === 4 ||
            day === 5
        ) {

            trainingDays.push(
                new Date(current)
            );

        }

        current.setDate(
            current.getDate() + 1
        );

    }

    return trainingDays;

}