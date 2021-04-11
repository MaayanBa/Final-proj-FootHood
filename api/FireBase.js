import * as firebase from "firebase"

const firebaseConfig = {
        apiKey: "AIzaSyC67ui4D_0rDi8NUUSgnbG9m7u4AjVarTo",
        authDomain: "foothoodchat.firebaseapp.com",
        databaseURL: "https://foothoodchat-default-rtdb.firebaseio.com",
        projectId: "foothoodchat",
        storageBucket: "foothoodchat.appspot.com",
        messagingSenderId: "717737489595",
      };

// console.dir(firebase)
// console.log(firebase.apps)
//console.log(firebase.apps.length)
if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
}

export {firebase}
