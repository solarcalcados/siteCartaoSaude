const firebaseConfig = {
    apiKey: "AIzaSyA_HUuJYEFAGgUfj_ogWj3Mkx_2VwmuZqw",
    authDomain: "redecredenciada-5696f.firebaseapp.com",
    projectId: "redecredenciada-5696f",
    storageBucket: "redecredenciada-5696f.appspot.com",
    messagingSenderId: "612064719763",
    appId: "1:612064719763:web:a94e1cfd665a3763aa6e66",
    measurementId: "G-25PY0QEZTS"
  };


  firebase.initializeApp(firebaseConfig);

  let storage = firebase.storage();

  let db = firebase.firestore();

  const date = new Date();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const day = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  

  
    if(document.querySelector(".leading")){
        db.collection("leads").doc(currentYear.toString()).collection(currentMonth.toString()).add({
            data: today
        })
        .then((docRef) => {
            window.location.href = "https://api.whatsapp.com/send?phone=5598983375979";
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }