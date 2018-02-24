/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-13 23:56:52 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-15 13:32:41
 */

// Hashing SHA256 or AESmd5

const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// const message = 'Hello there';
// const hash = SHA256(message).toString();
// console.log(hash);

//client Actual Data
// var userIdPassword = {
//     user: 'Dheeraj',
//     password: "12345"
// };

// Server manipulation using salting and hashing

// var token = {
//     userIdPassword: userIdPassword,
//     hash: SHA256(JSON.stringify(userIdPassword) + 'Hallmark Salt').toString(),
// };

//Hacking ###################
// userIdPassword.user = 'Dheeraj';
// userIdPassword.password = '12345';
// token.hash = SHA256(JSON.stringify(userIdPassword)).toString()



//Hacking ###################

// Validation whether hacker did not manipulate the data
// var actualDataHash = SHA256(JSON.stringify(userIdPassword) + 'Hallmark Salt').toString();
// if (actualDataHash === token.hash) {
//     console.log('Authorize the person');

// } else {
//     console.log('Data hacked in middle');

// }

// --------------------jsonwebtoken-----------------
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'some secret');
// console.log(token);

// var decodedToken = jwt.verify(token, 'some secret');
// console.log(decodedToken);

// ----------------------bcrypt algorithm--------

var password = 'mypassword';
bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt).then((hashedPassword) => {
        console.log(hashedPassword);
    }).catch((error) => {
        console.log(error);
    });

});

var hashedPassword = '$2a$10$p0fhO6cbdour0bFneNFXAe103bof.hXeyWA6YF1yJnEf4c.YyhfTG';
bcrypt.compare(password, hashedPassword).then((compareResult) => {
    if (compareResult) {
        console.log('Password successfully matched');
    } else {
        console.log('Invalid password');
    }
}).catch((error) => {
    console.log(error);
});