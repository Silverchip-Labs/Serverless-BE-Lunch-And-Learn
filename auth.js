const jwt = require('jsonwebtoken');

module.exports.handler = async function (event) {
    try {
        const token = getToken(event.authorizationToken);
        jwt.verify(token, process.env.JWT_SECRET);
        return allowPolicy(event.methodArn);
    } catch (error) {
        return denyAllPolicy();
    }
};

function getToken(header) {
    const token = header.split(' ')[1];
    return token;
}

function denyAllPolicy() {
    return {
        principalId: '*',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: '*',
                    Effect: 'Deny',
                    Resource: '*',
                },
            ],
        },
    };
}

function allowPolicy(methodArn) {
    return {
        principalId: 'apigateway.amazonaws.com',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: methodArn,
                },
            ],
        },
    };
}
