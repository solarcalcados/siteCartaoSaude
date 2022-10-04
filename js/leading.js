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

  let leadQuantity = 0;
  let leadFont;
  let leadDate;
  let leadTime;
  let leadMounth;
  
  let htmltext = "";
 
    if(document.querySelector(".leading")){
        getParameter = (key) => {

            address = window.location.search
            parameterList = new URLSearchParams(address)
            return parameterList.get(key)
        }
        db.collection("leads").doc(currentYear.toString()).collection(currentMonth.toString()).add({
            data: today,
            // https://comercialcartaosaude.com.br/leading.html?fonte=facebook
            fonte: getParameter("fonte"),
            mes:currentMonth.toString()
            })
            .then((docRef) => {
                window.location.href = "https://api.whatsapp.com/send?phone=5598983375979";
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }

    if(document.querySelector(".lead")){
        console.log("ogofo")
        for(let i = 1; i <= 12; i++){

            
            
            db.collection("leads").doc("2022").collection("9").where("mes", "==", i.toString())
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    leadQuantity++;
                    leadDate =  doc.data().data;
                    leadFont = doc.data().fonte;
                    leadMounth = doc.data().mes; 
                    console.log("d")
                    htmltext = ' <div class="mounth">'
                    htmltext += '     <div id="'+leadMounth+'">'
                    htmltext += '         <h3>'+leadMounth+'</h3>'
                    htmltext += '     </div>'
                    htmltext += ' </div>'
                    console.log(htmltext)
                    document.getElementById("mounth").innerHTML+=htmltext;
                    carregarLeads(leadQuantity, leadDate, leadFont, leadMounth);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }
        
    }

    function carregarLeads(_quantity, _date, _font, _mes){
        
        htmltext= '           <div class="lead">'
        htmltext= '               <h4>1.</h4>'
        htmltext= '              <h4>12/03/2002</h4>'
        htmltext= '              <h4>15:08</h4>'
        htmltext= '               <h4>Instagram</h4>'

    }