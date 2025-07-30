var admin = require('firebase-admin');

var serviceAccount = require(`../credentials/${process.env.SERVICE_ACCOUNT_FILE_NAME}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();
module.exports = db;
