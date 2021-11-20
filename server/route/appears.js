const mail = require('./mail');

const conn = require('../config/db');

//

module.exports.insert = (from, to, callback) => {
    const sql = 'INSERT INTO appears (`from`, `to`) values (?, ?)';

    conn.query(sql, [from, to], (err) => {
        if (err) {
            console.log(err);
            callback(0);
        } else {
            const sql_select_to = 'SELECT email FROM users WHERE id = ?';

            conn.query(sql_select_to, [to], (err, results) => {
                if (err) {
                    console.log(err);
                    callback(0);
                } else {
                    results = JSON.parse(JSON.stringify(results));
                    mail.notification('appear', from, results[0].email);
                    callback(1);
                }
            })
        }
    })
}

//

module.exports.update = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE appears SET checked = 1 WHERE id = ?';

        const id = req.body.id;

        conn.query(sql, [id], (err) => {
            if (err) {
                console.log(err);
                res.json(0);
            } else {
                res.json(1);
            }
        })
    } else {
        res.json(-1);
    }
}