'use strict';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const crypto = require('crypto');
const config = require('../config.json');


function storeUser(email, password, salt, fn) {
    // Bytesize
    let len = config.CRYPTO_BYTE_SIZE;
    crypto.randomBytes(len, function(err, token) {
        if (err) return fn(err);
        token = token.toString('hex');
        dynamodb.putItem({
            TableName: config.DDB_TABLE,
            Item: {
                email: {
                    S: email
                },
                passwordHash: {
                    S: password
                },
                passwordSalt: {
                    S: salt
                },
                verified: {
                    BOOL: false
                },
                verifyToken: {
                    S: token
                }
            },
            ConditionExpression: 'attribute_not_exists (email)'
        }, function(err) {
            if (err) return fn(err);
            else fn(null, token);
        });
    });
}
module.exports = {
    dynamo: {storeUser}
};