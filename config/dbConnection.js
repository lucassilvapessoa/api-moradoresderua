const mongoURI = mongoURI = "mongodb+srv://cp3005411:lucas1997@cluster0.5kbti7i.mongodb.net/?retryWrites=true&w=majority"
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(mongoURI);

module.exports = client;