const nodemailer = require('nodemailer');
const uuid = require('uuid/v1');

const conn = require('../config/db');
const { URL } = require('../const');

//

module.exports.forgot = (req, res) => {
    const sql1 = 'SELECT * FROM users WHERE email = ?';
    const sql2 = 'UPDATE users SET password = SHA1(?) WHERE email = ?';

    const email = req.query.email;
    const password = uuid();

    conn.query(sql1, [email], (err, results) => {
        if (err) {
            console.log(err);
        } else if (results.length === 0) {
            res.json(0);
        } else {
            conn.query(sql2, [password, email], (err) => {
                if (err) {
                    console.log(err);
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
                        to: email,
                        subject: 'Please confirm for Matcha account :)',
                        html: "<div>Your password is changed !<p>E-mail : " + email + "<p>Password : " + password + "<p>You can change your password after login.</div>"
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        }
                    });
                    res.json(1);
                }
            })
        }
    })
}

//

module.exports.reverify = (req, res) => {
    const sql = 'SELECT uuid FROM verifies WHERE user_id = ?';

    const email = req.query.email;

    conn.query(sql, [email], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            results = JSON.parse(JSON.stringify(results));

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '42sv.matcha@gmail.com',
                    pass: 'gusdk314'
                }
            });
            const mailOptions = {
                from: '42sv.matcha@gmail.com',
                to: email,
                subject: 'Please confirm for Matcha registration :)',
                html: "<a href=" + URL + "/api/verifies/signup?email=" + email + "&code=" + results.uuid + ">Click here to verify !</a>"
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                }
            });
        }
    })
}

//

module.exports.notification = (type, from_id, to_email) => {
    const sql1 = 'SELECT notification FROM users WHERE email = ?';
    const sql2 = 'SELECT first_name, last_name FROM users WHERE id = ?';

    conn.query(sql1, [to_email], (err, results) => {
        if (err) {
            console.log(err);
        } else if (JSON.parse(JSON.stringify(results))[0].notification === 1) {
            conn.query(sql2, [from_id], (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    results = JSON.parse(JSON.stringify(results));
        
                    let message;
        
                    if (type === 'appear') {
                        message = 'Your profile was shown to ' + results[0].first_name + ' ' + results[0].last_name + '.';
                    } else if (type === 'like') {
                        message = results[0].first_name + ' ' + results[0].last_name + ' liked your profile.';
                    } else if (type === 'unlike') {
                        message = results[0].first_name + ' ' + results[0].last_name + ' disliked your profile.';
                    } else if (type === 'visit') {
                        message = results[0].first_name + ' ' + results[0].last_name + ' visited your profile.';
                    }
        
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: '42sv.matcha@gmail.com',
                            pass: 'gusdk314'
                        }
                    });
                    const mailOptions = {
                        from: '42sv.matcha@gmail.com',
                        to: to_email,
                        subject: 'Matcha notification :)',
                        html: "<div>" + message + "</div>"
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            })
        }
    })
};