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

  let docs = 0;

  db.collection("credenciados").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            docs ++;
            

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data().name);
            console.log(doc.data().area);
            console.log(doc.data().contat.length, "contatos:" );
            console.log(typeof(doc.data().endereco))
            for(let x = 0; x < doc.data().contat.length; x++){
                console.log(doc.data().contat[x]);
            }
            console.log(doc.data().desconto);
            console.log(Object.keys(doc.data().endereco).length, "Endereços: ");
            for(let x  = 0; x < Object.keys(doc.data().endereco).length; x++){
                let num = "unidade" + (x+1);
                
                console.log(doc.data().endereco[num].bairro)
            }
            console.log(doc.data().subareas);

            var test = document.getElementById("partners");
            var htmltext="";

            htmltext = '<div class="cred-item container">'
            htmltext += '<div class="row">'
            htmltext += '<div class="col-4">'
            htmltext += '<figure class="cred-item-logo vertical-align">'
            htmltext += '<img src="img/logo.png" alt="Logo">'
            htmltext += '</figure>'
            htmltext += '</div>'
            htmltext += '<div class="col-8 p-0">'
            htmltext += '<div class="cred-item-name">'
            htmltext += '<h3>'+doc.data().name+'</h3>'
            htmltext += '</div>'
            htmltext += '<div class="cred-item-data">'
            htmltext += '<h4>'
            htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
            htmltext += '<img class="" src="img/gps.png" alt="">'
            htmltext += '</figure>'
            for(let x  = 0; x < Object.keys(doc.data().endereco).length; x++){
                let num = "unidade" + (x+1);
                
                console.log(doc.data().endereco[num].bairro)
                htmltext +=     doc.data().endereco[num].bairro;
                if(!(x+1 == Object.keys(doc.data().endereco).length)){
                    htmltext += ', ';
                }
            }
            htmltext += '</h4>'
            htmltext += '<br>'
            htmltext += '<h4 class="text-uppercase">'
            htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
            htmltext += '<img src="img/desconto.png" alt="">'
            htmltext += '</figure>'
            htmltext += doc.data().desconto;
            htmltext += '</h4>'
            htmltext += '</div>'
            htmltext += '</div>'
            htmltext += '</div>'
            htmltext += '<div class="row">'
            htmltext += '<div class="col-12 p-0">'
            htmltext += '<button onclick="changeDisplay('+docs+')" class="w-100 border-0 p-1">mais informações</button>'
            htmltext += '<hr style="background-color: #9d9d9d;" class="m-0">'
            htmltext += '</div>'
            htmltext += '</div>'
            htmltext += '</div>'
            htmltext += '<h6 id="teste'+docs+'" class="d-none" >teste</teste>'
            document.getElementById("partners").innerHTML+=htmltext;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
function changeDisplay(documents){
    let id = "teste" + documents;
    console.log(id);
    document.getElementById(id).classList.remove("d-none");
    document.getElementById(id).classList.add("d-block");
}