import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" }; // if using ESM

initializeApp({
  credential: cert(serviceAccount)
});

export const adminAuth = getAuth();
