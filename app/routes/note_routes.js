const { reset } = require("nodemon");

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app, db) {
    // Route to create a note
    app.post('/notes', jsonParser, (req, res) => {
        // #swagger.tags = ['Notes']

        var values = [req.body.title, req.body.body];
        const result = db.run('INSERT INTO Notes(title, body) VALUES (?, ?)', values, function (err) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            db.all('SELECT * FROM Notes WHERE noteID = ?', this.lastID, function (err, rows) {
                if (err) {
                    return res.send({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }
                res.send(rows);
            })
        });
    });

    // Route to get all notes
    app.get('/notes', jsonParser, (req, res) => {
        // #swagger.tags = ['Notes']

        db.all('SELECT * FROM Notes', function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
            if (rows.length === 0) {
                return res.send({
                    error_code: 'NOTES_NOT_FOUND_ERROR',
                    message: 'Could not find any notes'
                })
            }
            res.send(rows);
        });
    });

    // Route to get specific note
    app.get("/notes/:id", jsonParser, (req, res) => {
        // #swagger.tags = ['Notes']

        db.all(`SELECT * FROM Notes WHERE noteID='${req.params.id}'`, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
            if (rows.length === 0) {
                return res.send({
                    error_code: 'NOTE_NOT_FOUND',
                    message: 'Could not find note'
                });
            }
            res.send(rows);
        });
    });

    // Route to delete a specific note
    app.delete("/notes/:id", jsonParser, (req, res) => {
        // #swagger.tags = ['Notes']

        db.all(`DELETE FROM Notes WHERE noteID='${req.params.id}'`, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
        });
        res.send('Successfully deleted note!');
    });

    // Route to update a note
    app.put('/notes/:id', jsonParser, (req, res) => {
        // #swagger.tags = ['Notes']
        
        db.all(`UPDATE Notes SET title='${req.params.title}', body='${req.params.body}' WHERE noteID='${req.params.id}'`, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
        });
        res.send('Successfully updated note!');
    });
};