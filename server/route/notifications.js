const conn = require('../config/db');

//

module.exports.select = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'SELECT id, type, `from`, `to`, time, checked, first_name, last_name, picture, CASE WHEN MINUTE(TIMEDIFF(NOW(), time)) = 0 THEN \'RIGHT NOW\' WHEN time > DATE_ADD(NOW(), INTERVAL-1 HOUR) THEN CONCAT(MINUTE(TIMEDIFF(NOW(), time)), \' MINUTES AGO\') WHEN time > DATE_ADD(NOW(), INTERVAL-24 HOUR) THEN CONCAT(HOUR(TIMEDIFF(NOW(), time)), \' HOURS AGO\') ELSE CONCAT(DATEDIFF(NOW(), time), \' DAYS AGO\') END as formattedTime FROM (SELECT appears.id as id, \'appears\' as type, `from` as `from`, `to` as `to`, time as time, checked as checked, first_name as first_name, last_name as last_name, users.picture1 as picture FROM appears LEFT JOIN users ON appears.from = users.id WHERE `to` = ? UNION SELECT visits.id as id, \'visits\' as type, `from` as `from`, `to` as `to`, time as time, checked as checked, first_name as first_name, last_name as last_name, users.picture1 as picture FROM visits LEFT JOIN users ON visits.from = users.id WHERE `to` = ? UNION SELECT likes.id as id, \'likes\' as type, `from` as `from`, `to` as `to`, time as time, checked as checked, first_name as first_name, last_name as last_name, users.picture1 as picture FROM likes LEFT JOIN users ON likes.from = users.id WHERE `to` = ? UNION SELECT unlikes.id as id, \'unlikes\' as type, `from` as `from`, `to` as `to`, time as time, checked as checked, first_name as first_name, last_name as last_name, users.picture1 as picture FROM unlikes LEFT JOIN users ON unlikes.from = users.id WHERE `to` = ?) results ORDER BY time desc';

        const userId = req.session.userId;

        conn.query(sql, [userId, userId, userId, userId], (err, results) => {
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

module.exports.update = (req, res) => {
    if (req.session.userId !== -1) {
        const sql_1 = 'UPDATE appears SET checked = 1 WHERE `to` = ?;';
        const sql_2 = 'UPDATE visits SET checked = 1 WHERE `to` = ?;';
        const sql_3 = 'UPDATE likes SET checked = 1 WHERE `to` = ?;';
        const sql_4 = 'UPDATE unlikes SET checked = 1 WHERE `to` = ?;';

        const userId = req.session.userId;

        conn.query(sql_1, [userId, userId, userId, userId], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                conn.query(sql_2, [userId, userId, userId, userId], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        conn.query(sql_3, [userId, userId, userId, userId], (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                conn.query(sql_4, [userId, userId, userId, userId], (err, results) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.json(1);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.json(-1);
    }
}