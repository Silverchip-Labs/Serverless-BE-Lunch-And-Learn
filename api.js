const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
// set by serverless.yml
const tableName = process.env.DYNAMODB_TABLE

const getPost = async (id) => {
    const {item: post} = await dynamoDb.get({
        TableName: tableName,
        key: {
            id
        },
    });
    return post;
}

const getPosts = async () => {
    const posts = await dynamoDb.scan({
        TableName: tableName,
    });
    console.log({posts});
}

const savePost = async (post) => {
    const result = await dynamoDb.put({
        TableName: tableName,
        Item: post,
    });
    console.log({result});
}

// create
module.exports.addPost = (event, context, callback) => {
    // get post from body
    // validate?
    // save post
    // return success/fail
}

// all
module.exports.getPosts = (event, context, callback) => {
    // get posts
    // return
}
// single
module.exports.getPost = (event, context, callback) => {
    // get id from event
    // get post
    // return
}