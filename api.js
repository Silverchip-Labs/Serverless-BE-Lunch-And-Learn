const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE

const getPost = async (title) => {
    const {item: post} = await dynamoDb.get({
        TableName: tableName,
        key: title,
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

}
// single
module.exports.getPost = (event, context, callback) => {

}