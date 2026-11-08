import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Public web config — safe to ship to browsers (it only identifies the project).
const firebaseConfig = {
  apiKey: 'AIzaSyCVV8cOv0s10PYlPLz_YlkOxLp1FduipEs',
  authDomain: 'laagan-ph.firebaseapp.com',
  projectId: 'laagan-ph',
  appId: '1:401865819730:web:c1b322215c29b1d75ac18b',
}

export function getClientAuth() {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
  return getAuth(app)
}
