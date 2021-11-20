const conn = require('../config/db');

//

module.exports.select = (req, res) => {
    if (req.session.userId !== -1) {
        const sql_select_search = 'SELECT * FROM tags WHERE tag LIKE ?';
        const sql_select_myself = 'SELECT tag FROM tags LEFT JOIN users_and_tags AS uat ON tags.id = uat.tag_id WHERE uat.user_id = ? AND uat.type = 0';
        const sql_select_preference = 'SELECT tag FROM tags LEFT JOIN users_and_tags AS uat ON tags.id = uat.tag_id WHERE uat.user_id = ? AND uat.type = 1';

        const userId = req.session.userId;
        const data = req.query;

        if (data.type === 'search') {
            conn.query(sql_select_search, ['%' + data.keyword + '%'], (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    results = JSON.parse(JSON.stringify(results));
                    res.json(results);
                }
            })
        } else if (data.type === 'myself') {
            conn.query(sql_select_myself, [userId], (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    results = JSON.parse(JSON.stringify(results));
                    res.json(results);
                }
            })
        } else if (data.type === 'preference') {
            conn.query(sql_select_preference, [userId], (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    results = JSON.parse(JSON.stringify(results));
                    res.json(results);
                }
            })
        } else if (data.type === 'other') {
            conn.query(sql_select_myself, [data.userId], (err, results1) => {
                if (err) {
                    console.log(err);
                } else {
                    conn.query(sql_select_preference, [data.userId], (err, results2) => {
                        if (err) {
                            console.log(err);
                        } else {
                            results1 = JSON.parse(JSON.stringify(results1));
                            results2 = JSON.parse(JSON.stringify(results2));
                            const returnValue = {
                                user: results1,
                                other: results2
                            }
                            res.json(returnValue);
                        }
                    })
                }
            })
        }
    } else {
        res.json(-1);
    }
}

//

module.exports.insert = (req, res) => {
    if (req.session.userId !== -1) {
        const sql_select_tag = 'SELECT id FROM tags WHERE tag = ?';
        const sql_insert_tag = 'INSERT INTO tags (tag) values (?)';
        const sql_insert_ut = 'INSERT INTO users_and_tags (user_id, tag_id, type) values (?, (SELECT id FROM tags WHERE tag = ?), ?)';

        const userId = req.session.userId;
        const tag = req.body.tag;
        const type = req.body.type;

        conn.query(sql_select_tag, [tag], (err, results) => {
            if (err) {
                console.log(err);
                res.json(0);
            } else if (results.length === 0) {
                conn.query(sql_insert_tag, [tag], (err) => {
                    if (err) {
                        console.log(err);
                        res.json(0);
                    } else {
                        conn.query(sql_insert_ut, [userId, tag, type], (err) => {
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
                conn.query(sql_insert_ut, [userId, tag, type], (err) => {
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
        const sql = 'DELETE FROM users_and_tags WHERE tag_id = (SELECT id FROM tags WHERE tag = ?) AND type = ? AND user_id = ?';

        const data = req.query;
        const userId = req.session.userId;

        conn.query(sql, [data.tag, parseInt(data.type), userId], (err) => {
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