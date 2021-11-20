const nodemailer = require('nodemailer');
const uuid = require('uuid/v1');

const conn = require('../config/db');
const { URL } = require('../const');

//

module.exports.up = (req, res) => {
    const sql_select_user = 'SELECT * FROM users WHERE email = ?';
    const sql_insert_users = 'INSERT INTO users (email, password) values (?, SHA1(?))';
    const sql_insert_verifies = 'INSERT INTO verifies (user_id, uuid) values ((SELECT id FROM users WHERE email = ?), ?)';

    const data = req.body;
    const code = uuid();

    conn.query(sql_select_user, [data.email], (err, results) => {
        if (err) {
            console.log(err);
        } else if (results.length === 0) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '42sv.matcha@gmail.com',
                    pass: 'gusdk314'
                }
            });
            const mailOptions = {
                from: '42sv.matcha@gmail.com',
                to: data.email,
                subject: 'Please confirm for Matcha registration :)',
                html: "<a href=\"" + URL + "/api/verifies/up?email=" + data.email + "&code=" + code + "\">Click here to verify !</a>"
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                }
            });
    
            conn.query(sql_insert_users, [data.email, data.password], (err) => {
                if (err) {
                    console.log(err);
                } else {
                    conn.query(sql_insert_verifies, [data.email, code], (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    res.json(1);
                }
            })
        } else {
            res.json(0);
        }
    })
}

//

module.exports.in = (req, res) => {
    const sql_select_user = 'SELECT * FROM users WHERE email = ?';
    const sql_select_verify = 'SELECT verify, id FROM users WHERE email = ? AND password = SHA1(?)';

    const email = req.query.email;
    const password = req.query.password;
    const info = req.query.info;

    conn.query(sql_select_user, [email], (err, results) => {
        if (err) {
            console.log(err);
            res.json(0);
        } else if (results.length === 0) {
            res.json(2); // Doesn't exist email
        } else {
            conn.query(sql_select_verify, [email, password], (err, results) => {
                results = JSON.parse(JSON.stringify(results));
                if (err) {
                    console.log(err);
                    res.json(0);
                } else if (results.length === 0) {
                    res.json(3); // Password is wrong
                } else if (results[0].verify === 0) {
                    res.json(4); // Verify is 0
                } else {
                    const sql_insert_log = 'INSERT INTO logs (user_id, info) values (?, ?)';

                    const userId = results[0].id;
                    conn.query(sql_insert_log, [userId, info], (err) => {
                        if (err) {
                            console.log(err);
                            res.json(0);
                        } else {
                            req.session.userId = userId;
                            res.json(1); // Log in successfully
                        }
                    })
                }
            })
        }
    })
}

//

module.exports.out = (req, res) => {
    if (req.session.userId !== -1) {
        req.session.userId = -1;
        res.json(1);
    } else {
        res.json(-1);
    }
}