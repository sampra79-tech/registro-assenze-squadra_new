function exportExcel() {

    const rows = [];

    rows.push([
        "Giocatore",
        "Presenze",
        "Assenze",
        "Giustificate",
        "Percentuale"
    ]);

    const stats =
        buildStatistics();

    stats.forEach(item => {

        rows.push([
            item.player,
            item.present,
            item.absent,
            item.justified,
            item.percentage + "%"
        ]);

    });

    const ws =
        XLSX.utils.aoa_to_sheet(
            rows
        );

    const wb =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Statistiche"
    );

    XLSX.writeFile(
        wb,
        "Statistiche_Squadra.xlsx"
    );

}