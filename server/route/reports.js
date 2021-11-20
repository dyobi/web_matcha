const conn = require('../config/db');

//

module.exports.insert = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'INSERT INTO reports (`from`, `to`, reason) values (?, ?, ?)';

        const data = req.body;
        const userId = req.session.userId;

        conn.query(sql, [userId, parseInt(data.to), data.reason], (err) => {
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