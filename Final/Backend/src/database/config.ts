// import admin from 'firebase-admin';
const key = require('./key.json')
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: 'https://lcdb-a3dbb-default-rtdb.firebaseio.com',
    storageBucket: "lcdb-a3dbb.appspot.com"
});

export const DB = admin.database()


// FIREBASE STORAGE

const uuid = require('uuid-v4');

var bucket = admin.storage().bucket();


export async function uploadFile(file: any, key: string) {

    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'application/pdf',
        cacheControl: 'public, max-age=31536000',
    };

    let result = await bucket.upload(file.path, {
        gzip: true,
        metadata: metadata,
        destination: bucket.file('bills/' + key + '.pdf'),
        predefinedAcl: 'publicRead'
    });

    return result[0].metadata.mediaLink

}

export async function deleteFile(filename: string) {
    try {
        let res = await bucket.file("bills/" + filename + ".pdf").delete();
        return res
    }
    catch (error) {
        console.log(error)
    }
}


import { getStorage } from 'firebase/storage'

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCN67OjeHDQn1YFZspDpE_fPdzWztccVVg",
    authDomain: "lcdb-a3dbb.firebaseapp.com",
    databaseURL: "https://lcdb-a3dbb-default-rtdb.firebaseio.com",
    projectId: "lcdb-a3dbb",
    storageBucket: "lcdb-a3dbb.appspot.com",
    messagingSenderId: "804000489848",
    appId: "1:804000489848:web:396996dd1835bfd543688d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)








