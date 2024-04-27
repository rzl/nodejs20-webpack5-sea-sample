const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite');
try {
    db.run("CREATE TABLE lorem (info TEXT)", (err) => {
        if (err) {
            console.error(err.message);
        }

        const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
            console.log(row.id + ": " + row.info);
        });
    });



} catch (e) {
    console.log(e);
}
exports.get
module.exports = db;