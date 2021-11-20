const conn = require('../config/db');

//

module.exports.select = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'SELECT id, first_name, last_name, picture1 FROM users WHERE id IN (SELECT `to` FROM blocks WHERE `from` = ?)';

        const userId = req.session.userId;

        conn.query(sql, [userId], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                results = JSON.parse(JSON.stringify(results));
                res.json(results);
            }
        })
    } else {
        res.json(-1);
    }
}

//

module.exports.insert = (req, res) => {
    if (req.session.userId !== -1) {
        const sql_insert_blocks = 'INSERT INTO blocks (`from`, `to`) values (?, ?)';
        const sql_delete_likes = 'DELETE FROM likes WHERE `from` = ? AND `to` = ?';

        const userId = req.session.userId;
        const to = req.body.to;

        conn.query(sql_insert_blocks, [userId, to], (err) => {
            if (err) {
                console.log(err);
                res.json(0);
            } else {
                conn.query(sql_delete_likes, [userId, to], (err) => {
                    if (err) {
                        console.log(err);
                        res.json(0);
                    } else {
                        res.json(1);
                    }
                })
            }
        })
    } else {
        res.json(-1);
    }
}

//

module.exports.delete = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'DELETE FROM blocks WHERE `from` = ? AND `to` = ?';

        const userId = req.session.userId;
        const to = req.query.id;

        conn.query(sql, [userId, to], (err) => {
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