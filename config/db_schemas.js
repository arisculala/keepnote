
module.exports = (db) => {
    const createNotesTableSchema = `
        CREATE TABLE IF NOT EXISTS Notes
        (
        noteID INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `;

    db.run(createNotesTableSchema);

    return db;
};