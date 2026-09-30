function exportBackup() {

    const data = {};

    Object.keys(localStorage)
        .forEach(key => {

            data[key] =
                localStorage.getItem(key);

        });

    const json =
        JSON.stringify(
            data,
            null,
            2
        );

    const blob =
        new Blob(
            [json],
            { type: "application/json" }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "backup_squadra.json";

    link.click();

    URL.revokeObjectURL(url);

}

function importBackup(file) {

    const reader =
        new FileReader();

    reader.onload = () => {

        try {

            const data =
                JSON.parse(
                    reader.result
                );

            Object.keys(data)
                .forEach(key => {

                    localStorage.setItem(
                        key,
                        data[key]
                    );

                });

            alert(
                "Backup importato correttamente"
            );

            location.reload();

        }
        catch {

            alert(
                "File JSON non valido"
            );

        }

    };

    reader.readAsText(file);

}