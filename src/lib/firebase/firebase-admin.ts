import * as admin from 'firebase-admin';

function getFirebaseAdmin() {
  if (!admin.apps.length) {
    if (process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
      });
    }
  }

  return admin;
}

export const firebaseAdmin = getFirebaseAdmin();
export const adminAuth = firebaseAdmin.auth()
export const adminFirestore = firebaseAdmin.firestore()
export const timeStamp = admin.firestore.Timestamp
export const storage = firebaseAdmin.storage()