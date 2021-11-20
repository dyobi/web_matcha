const conn = require('../config/db');

//

module.exports.insert = (from, to, content, callback) => {
    const sql = 'INSERT INTO messages (`from`, `to`, content) values (?, ?, ?)';

    conn.query(sql, [from, to, content], (err) => {
        if (err) {
            console.log(err);
            callback(0);
        } else {
            callback(1);
        }
    })
}

//

module.exports.select = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'SELECT id, content AS messages, DATE_FORMAT(time, "%Y-%m-%d %k:%i:%s") AS time, direction, checked FROM (SELECT id, content, time, 1 AS direction, checked FROM messages WHERE `from` = ? AND `to` = ? UNION SELECT id, content, time, 0 AS direction, checked FROM messages WHERE `to` = ? AND `from` = ?) results ORDER BY time';

        const userId = req.session.userId;
        const to = req.query.to;

        conn.query(sql, [userId, to, userId, to], (err, results) => {
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

module.exports.update = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE messages SET checked = 1 WHERE `from` = ? AND `to` = ?';

        const data = req.body;

        conn.query(sql, [data.from, data.to], (err) => {
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