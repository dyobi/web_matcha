const nodemailer = require('nodemailer');
const uuid = require('uuid/v1');
const fs = require('fs');
const path = require('path');

const imagePath = path.join(__dirname, '../public/images/');
const conn = require('../config/db');
const URL = require('../const');

//

module.exports.select = (req, res) => {
    if (req.session.userId !== -1) {
        const userId = parseInt(req.query.userId) === -1 ? req.session.userId : parseInt(req.query.userId);
        const user_Id = req.session.userId;
        const position = req.query;

        if (position.latitude === undefined) {
            const sql = 'SELECT id, email, last_name, first_name, birth_year, gender, preference_gender, preference_min_age, preference_max_age, preference_max_distance, address, latitude, longitude, bio, picture1, picture2, picture3, picture4, picture5, notification, year(CURDATE()) - birth_year as age, (SELECT id FROM likes WHERE `from` = ? AND `to` = ?) as isLike FROM users WHERE id = ?';

            conn.query(sql, [user_Id, userId, userId], (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    results = JSON.parse(JSON.stringify(results));
                    res.json(results);
                }
            })
        } else if (position.type === 'detail') {
            const sql = 'SELECT id, email, last_name, first_name, birth_year, gender, preference_gender, preference_min_age, preference_max_age, preference_max_distance, address, latitude, longitude, bio, picture1, picture2, picture3, picture4, picture5, notification, year(CURDATE()) - birth_year as age, (SELECT id FROM likes WHERE `from` = ? AND `to` = ?) as isLike, (SELECT COUNT(*) FROM likes WHERE `to` = ?) as count_likes, (SELECT COUNT(*) FROM unlikes WHERE `to` = ?) as count_unlikes, (6371*acos(cos(radians(?))*cos(radians(latitude))*cos(radians(longitude)-radians(?))+sin(radians(?))*sin(radians(latitude))))*1.6 AS distance FROM users WHERE id = ?';

            conn.query(sql, [user_Id, userId, userId, userId, position.latitude, position.longitude, position.latitude, userId], (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    results = JSON.parse(JSON.stringify(results));
                    res.json(results);
                }
            })
        } else {
            const sql = 'SELECT id, last_name, first_name, birth_year, gender, preference_gender, preference_min_age, preference_max_age, preference_max_distance, address, latitude, longitude, bio, picture1, picture2, picture3, picture4, picture5, notification, year(CURDATE()) - birth_year as age, (6371*acos(cos(radians(?))*cos(radians(latitude))*cos(radians(longitude)-radians(?))+sin(radians(?))*sin(radians(latitude))))*1.6 AS distance FROM users WHERE id NOT IN (SELECT `to` FROM appears WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM visits WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM likes WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM unlikes WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM blocks WHERE `from` = ?) AND id NOT IN (SELECT `to` FROM reports WHERE `from` = ?) AND gender IN (SELECT preference_gender FROM users WHERE id = ?) AND preference_gender IN (SELECT gender FROM users WHERE id = ?) AND year(CURDATE()) - birth_year BETWEEN (SELECT preference_min_age FROM users WHERE id = ?) AND (SELECT preference_max_age FROM users WHERE id = ?) AND id NOT IN (SELECT id FROM users WHERE first_name = \'\' OR last_name = \'\' OR address = \'\' OR picture1 = \'\') AND id != ? HAVING distance <= 50*1.6 ORDER BY distance';
            
            conn.query(sql, [position.latitude, position.longitude, position.latitude, user_Id, user_Id, user_Id, user_Id, user_Id, user_Id, user_Id, user_Id, user_Id, user_Id, user_Id], (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    results = JSON.parse(JSON.stringify(results));
                    res.json(results);
                }
            })
        }
    } else {
        res.json(-1);
    }
}

//

module.exports.update = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE users SET first_name = ?, last_name = ?, birth_year = ?, gender = ?, preference_gender = ? WHERE id = ?';

        const userId = req.session.userId;
        const data = req.body;

        if (userId === -1) {
            res.json(0);
        } else {
            conn.query(sql, [data.first_name, data.last_name, data.birth_year, data.gender, data.preference_gender, userId], (err) => {
                if (err) {
                    console.log(err);
                    res.json(0);
                } else {
                    res.json(1);
                }
            })
        }
    } else {
        res.json(-1);
    }
}

//

module.exports.delete = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'DELETE FROM users WHERE id = ?';

        const userId = req.session.userId;

        conn.query(sql, [userId], (err) => {
            if (err) {
                console.log(err);
                res.json(0);
            } else {
                req.session.userId = -1;
                res.json(1);
            }
        })
    } else {
        res.json(-1);
    }
}

//

module.exports.updateEmail = (req, res) => {
    if (req.session.userId !== -1) {
        const sql_update_email = 'UPDATE users SET email = ?, verify = 0 WHERE id = ?';
        const sql_insert_verifies = 'INSERT INTO verifies (user_id, uuid) values (?, ?)';

        const userId = req.session.userId;
        const newEmail = req.body.email;
        const code = uuid();

        if (userId === -1) {
            res.json(0);
        } else {
            conn.query(sql_update_email, [newEmail, userId], (err) => {
                if (err) {
                    console.log(err);
                    res.json(0);
                } else {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: '42sv.matcha@gmail.com',
                            pass: 'gusdk314'
                        }
                    });
                    const mailOptions = {
                        from: '42sv.matcha@gmail.com',
                        to: newEmail,
                        subject: 'Please confirm for Matcha registration :)',
                        html: "<a href=" + URL + "/api/verifies/signup?email=" + newEmail + "&code=" + code + ">Click here to verify !</a>"
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        }
                    });
        
                    conn.query(sql_insert_verifies, [userId, code], (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    req.session.userId = -1;
                    res.json(1);
                }
            })
        }
    } else {
        res.json(-1);
    }
}

//

module.exports.updatePassword = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE users SET password = SHA1(?) WHERE id = ?';

        const userId = req.session.userId;
        const password = req.body.password;

        if (userId === undefined) {
            res.json(0);
        } else {
            conn.query(sql, [password, userId], (err) => {
                if (err) {
                    console.log(err);
                    res.json(0);
                } else {
                    req.session.userId = -1;
                    res.json(1);
                }
            })
        }
    } else {
        res.json(-1);
    }
}

//


module.exports.updatePicture = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE users SET picture' + req.body.index + ' = ? WHERE id = ?';

        const userId = req.session.userId;
        let picture = req.body.picture;

        if(picture !== '') {
            let extension = '';
            if(picture.match(/data:image\/jpeg;base64,/)) {
                extension = '.jpeg';
            } else if(picture.match(/data:image\/jpg;base64,/)) {
                extension = '.jpg';
            } else if(picture.match(/data:image\/png;base64,/)) {
                extension = '.png';
            }

            picture = picture.replace('data:image/jpeg;base64,', '')
                            .replace('data:image/jpg;base64,', '')
                            .replace('data:image/png;base64,', '');

            const code = uuid();

            if (userId === -1) {
                res.json(0);
            } else {
                fs.writeFileSync(imagePath + code + extension, picture, {encoding: 'base64'}, function(err) {
                    console.log('File created');
                });
                conn.query(sql, [code + extension, userId], (err) => {
                    if (err) {
                        console.log(err);
                        res.json(0);
                    } else {
                        res.json(code + extension);
                    }
                })
            }
        } else {
            conn.query(sql, ['', userId], (err) => {
                if (err) {
                    console.log(err);
                    res.json(0);
                } else {
                    res.json('');
                }
            })
        }
    } else {
        res.json(-1);
    }
}

//

module.exports.updateAddress = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE users SET address = ?, latitude = ?, longitude = ? WHERE id = ?';

        const userId = req.session.userId;
        const data = req.body;

        if (userId === -1) {
            res.json(0);
        } else {
            conn.query(sql, [data.address, data.latitude, data.longitude, userId], (err) => {
                if (err) {
                    console.log(err);
                    res.json(0);
                } else {
                    res.json(1);
                }
            })
        }
    } else {
        res.json(-1);
    }
}

//

module.exports.updateBio = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE users SET bio = ? WHERE id = ?';

        const userId = req.session.userId;
        const bio = req.body.bio;

        if (userId === undefined) {
            res.json(0);
        } else {
            conn.query(sql, [bio, userId], (err) => {
                if (err) {
                    console.log(err);
                    res.json(0);
                } else {
                    res.json(1);
                }
            })
        }
    } else {
        res.json(-1);
    }
}

//

module.exports.updateNotification = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE users SET notification = if(notification = 1, 0, 1) WHERE id = ?';

        const userId = req.session.userId;

        conn.query(sql, [userId], (err) => {
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

//

module.exports.filters = (req, res) => {
    if (req.session.userId !== -1) {
        const sql = 'UPDATE users SET preference_min_age = ?, preference_max_age = ?, preference_max_distance = ? WHERE id = ?';

        const data = req.body;
        const userId = req.session.userId;

        conn.query(sql, [data.preference_min_age, data.preference_max_age, data.preference_max_distance, userId], (err) => {
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