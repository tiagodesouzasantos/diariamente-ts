'use strict';
let admin = require("firebase-admin");
let serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gmud-5b585.firebaseio.com"
});
admin.firestore().settings({ timestampsInSnapshots: true });
module.exports = admin.firestore();