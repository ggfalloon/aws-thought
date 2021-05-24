const AWS = require("aws-sdk");

// config points to local instance,
// updates local environmental variables
AWS.config.update({
    region: "us-east-2"
});

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


// params object to hold the schema and metadata
const params = {
    TableName: "Thoughts",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH" },  //Partition key
        { AttributeName: "createdAt", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" }, // s for string
        { AttributeName: "createdAt", AttributeType: "N" } // n for number
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10, // reserves a max read and write capacity, $$
        WriteCapacityUnits: 10
    }
};
// create table method using schema params
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});