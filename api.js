const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE

const getPost = (id, callback) => {
    const {item: post} = dynamoDb.get({
        TableName: tableName,
        Key: { id },
    }, (err, data) => {
        if (err) {
            callback(err);
        }
        if (data) {
            const response = successResponse(data);
            callback(null, response);
        }
    });
    return post;
}

const getPosts = (callback) => {
    const posts = dynamoDb.scan({
        TableName: tableName,
    }, (err, data) => {
        if (err) {
            callback(err);
        }
        if (data) {
            const response = successResponse(data);
            callback(null, response);
        }
    });
    console.log({posts});
}

const savePost = ({title, body, image}, callback) => {
    const id = `id-${uuid.v4()}`;
    dynamoDb.put({
        TableName: tableName,
        Item: {
            "id": id,
            "title": title,
            "body" : body,
            "image": image,
            createdAt: new Date().toISOString(),
        },
    }, (err, data) => {
        if (err) { 
            callback(err);
        }
        if (data) {
            const response = successResponse();
            callback(null, response);
        }
    });
}

// create
module.exports.addPost = (event, context, callback) => {
    const { title, body, image } = event.body;
    savePost({title, body, image}, callback);
}

// all
module.exports.getPosts = (event, context, callback) => {
    getPosts(callback);
}
// single
module.exports.getPost = (event, context, callback) => {
    const { id } = event.pathParameters;
    getPost(id, callback);
}

const successResponse = (body) => {
    var response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "isBase64Encoded": false,
        body: "{}",
    };
    if (body) response.body = JSON.stringify(body);
    return response;
}