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

  let itemId = 0;
  let lastEnlargedItem = 0;

  let itemName;
  let itemArea;
  let itemNumberOfNumbers;
  let itemContacts;
  let itemcontactText = "";
  let itemDesconto;
  let itemNumberOfAdress;
  let itemAdress;
  let itemSubAreas;
  let nomeLogo;

  console.log("V 2.6")


  db.collection("credenciados").orderBy("desconto", "asc").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            itemId ++;

            itemcontactText = "";
            itemDescontoText = "";
            itemAdressText= "";
            completeItemAdressText1 = "";
            completeItemAdressText2 = "";
        
            itemName = doc.data().name;

            let noSignalName = itemName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            nomeLogo = noSignalName.replace(/\s/g, '').toLowerCase();

            itemArea = doc.data().area;

            itemNumberOfNumbers = doc.data().contat.length;
            itemContacts = doc.data().contat;

            for(var x = 0; x < itemNumberOfNumbers ; x++){
                itemcontactText += doc.data().contat[x]
                if(!(x+1 == itemNumberOfNumbers)){
                    itemcontactText += " / "
                }
            }


            itemDesconto =  doc.data().desconto;
            


            if(itemDesconto != "Variados"){
                if(!(isNaN(parseInt(itemDesconto, 10)))){
                    itemDescontoText = "Descontos de até "+ itemDesconto+"%"
                } else{
                    itemDescontoText = itemDesconto;
                }
            } else{
                itemDescontoText = "Descontos variados"
            }

            
            itemAdress = doc.data().endereco;
            itemNumberOfAdress = Object.keys(doc.data().endereco).length;
            if(!itemAdress["unidade2"].bairro){
                itemNumberOfAdress = 1;
            }

            

            for(var x = 0; x < itemNumberOfAdress ; x++){
                let unidade = "unidade"+(x+1);

                itemAdressText += itemAdress[unidade].bairro
                if(!(x+1 == itemNumberOfAdress)){
                    itemAdressText += ", "
                }

                completeItemAdressText1 = itemAdress["unidade1"].complemento+", Nº"+itemAdress["unidade1"].numero+"/ "+itemAdress["unidade1"].bairro;
                completeItemAdressText2 = itemAdress["unidade2"].complemento+", Nº"+itemAdress["unidade2"].numero+"/ "+itemAdress["unidade2"].bairro;

            }

 

            loadItem(itemName, nomeLogo, itemArea, itemNumberOfAdress, itemAdressText, completeItemAdressText1, completeItemAdressText2, itemDescontoText, itemcontactText, itemId);


            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
//, _itemArea, _itemNumberOfAdress, _itemAdressText, _completeItemAdressText1, _completeItemAdressText2, _itemDescontoText, _itemcontactText




function loadItem(_itemName, _nomeLogo, _itemArea, _itemNumberOfAdress, _itemAdressText, _completeItemAdressText1, _completeItemAdressText2, _itemDescontoText, _itemcontactText, _itemId){
        htmltext='<div class="mother-data container">'
            htmltext += '<div id="'+_itemId+'" class="row data">'
                htmltext +='<div class="left-data mr-4 col-3">'
                    htmltext +='<img src="img/logos/'+_nomeLogo+'.svg">'
                    htmltext +='<h3>'+_itemDescontoText+'</h3>'
                 htmltext +='</div>'
                htmltext +='<div class="right-data ml-4 col-8">'
                    htmltext +='<h2>'+_itemName+'</h2>'
                    htmltext +='<div class="ml-3">'
                    if(_itemNumberOfAdress == 1){
                        htmltext +='<h3>Unidade1 - '+_completeItemAdressText1+'</h3>'
                    } else if(_itemNumberOfAdress == 2){
                        htmltext +='<h3>Unidade1 - '+_completeItemAdressText1+'</h3>'
                        htmltext +='<h3>Unidade2 - '+_completeItemAdressText2+'</h3>'
                    }
                            
                        htmltext +='<h3 class="numbers">'+_itemcontactText+'</h3>'
                    htmltext +='</div>'
                htmltext +='</div>'
            htmltext +='</div>'
        htmltext+='</div>'    
        htmltext += '<hr style="height:2px; color:#374893;">'
                
        document.getElementById(_itemArea).innerHTML+=htmltext;
}


function mapButton1(_adress2){
    window.open("http://maps.google.com/?saddr=Current%20Location&daddr="+_adress2, "_blank")
}

function areaMenu(){
    document.querySelector(".area-menu").classList.toggle("active");
}
