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

  var db = firebase.firestore();

  db.collection("credenciados").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data().name);
            console.log(doc.data().area);
            console.log(doc.data().contat.length, "contatos:" );
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

            htmltext += '<div class="cred-item container">'
            htmltextL += '<div class="row">'
            htmltext += '<div class="col-4">'
            htmltext += '<figure class="cred-item-logo vertical-align">'
            htmltext += '<img src="img/logo.png" alt="Logo">'
            htmltext += '</figure>'
            htmltext += '</div>'
            htmltext += '<div class="col-8 p-0">'
            htmltext += '<div class="cred-item-name">'
            htmltext += '<h3>Clínica imma</h3>'
            htmltext += '</div>'
            htmltext += '<div class="cred-item-data">'
            htmltext += '<h4>'
            htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
            htmltext += '<img class="" src="img/gps.png" alt="">'
            htmltext += '</figure>'
            htmltext += 'Monte Castelo, Cohatrac II'
            htmltext += '</h4>'
            htmltext += '<br>'
            htmltext += '<h4 class="text-uppercase">'
            htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
            htmltext += '<img src="img/desconto.png" alt="">'
            htmltext += '</figure>'
            htmltext += 'Desconto de até 70%'
            htmltext += '</h4>'
            htmltext += '</div>'
            htmltext += '</div>'
            htmltext += '</div>'
            htmltext += '<div class="row">'
            htmltext += '<div class="col-12 p-0">'
            htmltext += '<button class="w-100 border-0 p-1">mais informações</button>'
            htmltext += '<hr style="background-color: #9d9d9d;" class="m-0">'
            htmltext += '</div>'
            htmltext += '</div>'
            htmltext += '</div>'
            document.getElementById("partners").innerHTML+=htmltext;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });