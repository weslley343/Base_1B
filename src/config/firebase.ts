import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

const serviceAccount = require("../../accountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: "your-project-id.appspot.com",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

export { db, bucket };
