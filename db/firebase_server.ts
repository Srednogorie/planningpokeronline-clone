const admin = require('firebase-admin')
const firebaseUrl = 'https://weekly-search.firebaseio.com'

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                "type": process.env.FIREBASE_SA_TYPE,
                "project_id": process.env.FIREBASE_SA_PROJECT_ID,
                "private_key_id": process.env.FIREBASE_SA_PRIVATE_KEY_ID,
                "private_key": JSON.parse(process.env.FIREBASE_SA_PRIVATE_KEY!),
                "client_email": process.env.FIREBASE_SA_CLIENT_EMAIL,
                "client_id": process.env.FIREBASE_SA_CLIENT_ID,
                "auth_uri": process.env.FIREBASE_SA_AUTH_URI,
                "token_uri": process.env.FIREBASE_SA_TOKEN_URI,
                "auth_provider_x509_cert_url": process.env.FIREBASE_SA_AUTH_PROVIDER_X509_CERT_URL,
                "client_x509_cert_url": process.env.FIREBASE_SA_CLIENT_X509_CERT_URL
            }),
            databaseURL: firebaseUrl
        });
    } catch (error: any) {
        console.log('Firebase admin initialization error', error.stack)
    }
}

export const serverFirestore = admin.firestore()
