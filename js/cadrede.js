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


function cadastrarParceiro() {
    let input = document.querySelector("#GET-area");

    console.log("hm: ")
    console.log(input.value);
    db.collection("credenciados").doc(input.value).set({
        area: "Los Angeles",
        contat: ["num1","num2"],
        desconto: "USA",
        endereco: {
            unidade1: {
                bairro: "bairro1",
                complemento: "complemento1",
                numero: "2509"
            },
            unidade2: {
                bairro: "bairro2",
                complemento: "complemento2",
                numero: "2509"
            }
        },
        
        logo: "logo",
        name: "name"
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}