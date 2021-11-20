const conn = require('../config/db');

//

module.exports.select = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'SELECT id, last_name, first_name, birth_year, gender, preference_gender, preference_min_age, preference_max_age, preference_max_distance, address, latitude, longitude, bio, picture1, picture2, picture3, picture4, picture5, notification, year(CURDATE()) - birth_year as age, (6371*acos(cos(radians((SELECT latitude FROM users WHERE id = ?)))*cos(radians(latitude))*cos(radians(longitude)-radians((SELECT longitude FROM users WHERE id = ?)))+sin(radians((SELECT latitude FROM users WHERE id = ?)))*sin(radians(latitude))))*1.6 AS distance FROM users WHERE id NOT IN (SELECT `to` FROM appears WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM visits WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM likes WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM unlikes WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM blocks WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM reports WHERE `from` = ?) AND gender IN (SELECT preference_gender FROM users WHERE id = ?) AND preference_gender IN (SELECT gender FROM users WHERE id = ?) AND year(CURDATE()) - birth_year BETWEEN (SELECT preference_min_age FROM users WHERE id = ?) AND (SELECT preference_max_age FROM users WHERE id = ?) AND id NOT IN (SELECT id FROM users WHERE first_name = \'\' OR last_name = \'\' OR address = \'\' OR picture1 = \'\') AND id != ? HAVING distance <= (SELECT preference_max_distance FROM users WHERE id = ?) ORDER BY distance LIMIT 1;';

        const userId = req.session.userId;

        conn.query(sql, [userId, userId, userId, userId, userId, userId, userId, userId, userId, userId, userId, userId, userId, userId, userId], (err, results) => {
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