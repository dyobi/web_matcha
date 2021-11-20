const conn = require('../config/db');

//

module.exports.select = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'SELECT \'appears\' AS type, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 6 DAY) THEN 1 END) as date1, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 5 DAY) THEN 1 END) as date2, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 4 DAY) THEN 1 END) as date3, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 3 DAY) THEN 1 END) as date4, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 2 DAY) THEN 1 END) as date5, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 1 DAY) THEN 1 END) as date6, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 0 DAY) THEN 1 END) as date7 FROM appears WHERE `to` = ? UNION SELECT \'visits\' AS type, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 6 DAY) THEN 1 END) as date1, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 5 DAY) THEN 1 END) as date2, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 4 DAY) THEN 1 END) as date3, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 3 DAY) THEN 1 END) as date4, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 2 DAY) THEN 1 END) as date5, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 1 DAY) THEN 1 END) as date6, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 0 DAY) THEN 1 END) as date7 FROM visits WHERE `to` = ? UNION SELECT \'likes\' AS type, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 6 DAY) THEN 1 END) as date1, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 5 DAY) THEN 1 END) as date2, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 4 DAY) THEN 1 END) as date3, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 3 DAY) THEN 1 END) as date4, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 2 DAY) THEN 1 END) as date5, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 1 DAY) THEN 1 END) as date6, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 0 DAY) THEN 1 END) as date7 FROM likes WHERE `to` = ? UNION SELECT \'unlikes\' AS type, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 6 DAY) THEN 1 END) as date1, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 5 DAY) THEN 1 END) as date2, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 4 DAY) THEN 1 END) as date3, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 3 DAY) THEN 1 END) as date4, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 2 DAY) THEN 1 END) as date5, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 1 DAY) THEN 1 END) as date6, count(CASE WHEN DATE(time) = (CURDATE() - INTERVAL 0 DAY) THEN 1 END) as date7 FROM unlikes WHERE `to` = ?';

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
