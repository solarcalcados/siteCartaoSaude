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
    let inputName = document.querySelector("#GET-name").value;

    let inputArea = document.querySelector("#GET-area").value;

    let inputDesconto = document.querySelector("#GET-desconto").value;

    let inputNum1 = document.querySelector("#GET-contato1").value;
    let inputNum2 = document.querySelector("#GET-contato2").value;

    let inputBairro1 = document.querySelector("#GET-bairro1").value;
    let inputComplemento1 = document.querySelector("#GET-complemento1").value;
    let inputAdressNum1 = document.querySelector("#GET-numero1").value;

    let inputBairro2 = document.querySelector("#GET-bairro2").value;
    let inputComplemento2 = document.querySelector("#GET-complemento2").value;
    let inputAdressNum2 = document.querySelector("#GET-numero2").value;


    db.collection("credenciados").doc(inputName).set({
        area: inputArea,
        contat: [inputNum1,inputNum2],
        desconto: inputDesconto,
        endereco: {
            unidade1: {
                bairro: inputBairro1,
                complemento: inputComplemento1,
                numero: inputAdressNum1
            },
            unidade2: {
                bairro: inputBairro2,
                complemento: inputComplemento2,
                numero: inputAdressNum2
            }
        },
        
        logo: "logo",
        name: inputName
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}