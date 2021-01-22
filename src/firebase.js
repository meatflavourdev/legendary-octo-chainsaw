import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAr7RY59whX_OMVNceTSc4FsXDwugDxO60",
    authDomain: "legendary-octo-chainsaw.firebaseapp.com",
    databaseURL: "https://legendary-octo-chainsaw-default-rtdb.firebaseio.com",
    projectId: "legendary-octo-chainsaw",
    storageBucket: "legendary-octo-chainsaw.appspot.com",
    messagingSenderId: "228834424423",
    appId: "1:228834424423:web:f1b2109200aa7753b246c2",
    measurementId: "G-3ZKHM7P54L"
  })

export const auth = app.auth()
export default app
  