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

  let numParceiros;

  console.log("V 3.0")



  db.collection("credenciados").orderBy("desconto", "asc").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            numParceiros ++;
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
            console.log(numParceiros);

            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
//, _itemArea, _itemNumberOfAdress, _itemAdressText, _completeItemAdressText1, _completeItemAdressText2, _itemDescontoText, _itemcontactText
    

function changeDisplayOfItem(_itemId){

    let statusOfDisplay = document.getElementById("item"+_itemId).classList;
    
    if(statusOfDisplay[2] == "reduced" || statusOfDisplay[3] == "reduced"){
        document.getElementById("item"+_itemId).classList.remove("reduced");
        document.getElementById("item"+_itemId).classList.add("enlarged");

        enlargedDisplayOfItem(_itemId);
        admChangesToItemDisplay(_itemId);
        lastEnlargedItem = _itemId;
        
    }
    else{

        document.getElementById("item"+_itemId).classList.remove("enlarged");
        document.getElementById("item"+_itemId).classList.add("reduced");

        reducedDisplay(_itemId);

    };
    
}

// função p/ administrar itens ampliados
function admChangesToItemDisplay(__item){
    if(lastEnlargedItem == 0){
        return
    }
    if(!(__item == lastEnlargedItem)){
        changeDisplayOfItem(lastEnlargedItem)
    }
}


function loadItem(_itemName, _nomeLogo, _itemArea, _itemNumberOfAdress, _itemAdressText, _completeItemAdressText1, _completeItemAdressText2, _itemDescontoText, _itemcontactText, _itemId){

            htmltext = '<div id="item'+_itemId+'" class="cred-item container-fluid reduced">'

                htmltext += '<div id="'+_itemId+'reduced" class="reduced enabled">'
                    htmltext += '<div class="row">'
                        htmltext += '<div class="col-4 col-md-6">'
                            htmltext += '<figure class="cred-item-logo vertical-align">'
                                htmltext += '<img src="img/logos/'+_nomeLogo+'.svg" alt="Logo">'
                            htmltext += '</figure>'
                        htmltext += '</div>'
                        htmltext += '<div class="col-8 col-md-6 p-0">'
                            htmltext += '<div class="cred-item-name">'
                                htmltext += '<h3>'+_itemName+'</h3>'
                            htmltext += '</div>'
                            htmltext += '<div class="cred-item-data">'
                                htmltext += '<h4>'
                                    htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
                                        htmltext += '<img class="" src="img/gps.png" alt="">'
                                    htmltext += '</figure>'

                                    htmltext += _itemAdressText;

                                htmltext += '</h4>'
                                htmltext += '<br>'
                                htmltext += '<h4 class="text-uppercase">'
                                    htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
                                        htmltext += '<img src="img/desconto.png" alt="">'
                                    htmltext += '</figure>'
                                    htmltext += _itemDescontoText;
                                htmltext += '</h4>'
                        htmltext += '</div>'
                    htmltext += '</div>'
                htmltext += '</div>'
                htmltext += '<div class="row">'
                    htmltext += '<div class="col-12 p-0">'
                        //, \''+_itemArea+'\', \''+_itemNumberOfAdress+'\', \''+_itemAdressText+'\', \''+_completeItemAdressText1+'\', \''+_completeItemAdressText2+'\', \''+_itemDescontoText+'\', \''+_itemcontactText+'\'
                        htmltext += '<button onclick="changeDisplayOfItem('+_itemId+', \''+_itemName+'\', \''+_itemArea+'\', \''+_itemNumberOfAdress+'\', \''+_itemAdressText+'\', \''+_completeItemAdressText1+'\', \''+_completeItemAdressText2+'\', \''+_itemcontactText+'\', \''+_itemDescontoText+'\', \''+_nomeLogo+'\')" class="more-information w-100 border-0 p-1">Mais informações</button>'
                    htmltext += '</div>'
                htmltext += '</div>'
            htmltext += '</div>'


            htmltext += '<div id="'+_itemId+'enlarged" class="enlarged disabled">'
                htmltext += '<div class="row data">'
                    htmltext += '<div class="col-4">'
                        htmltext += '<figure class="text-center">'
                             htmltext += '<img class="my-3 logo-alonged" src="img/logos/'+_nomeLogo+'.svg" alt="logo">'
                        htmltext += '</figure>'
                    htmltext += '</div>'
                    htmltext += '<div class="col-8 table">'
                        htmltext += '<div class="vertical-ali">'
                            htmltext += '<div>'
                                htmltext += '<h3 class="text-left">'+_itemName+'</h3>'
                            htmltext += '</div>'
                            htmltext += '<div>'
                                htmltext += '<h5 class="text-center vertical-ali">'
                                    htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
                                        htmltext += '<img src="img/desconto.png" alt="">'
                                    htmltext += '</figure>'
                                htmltext+= _itemDescontoText+'</h5>'
                            htmltext += '</div>'
                        htmltext += '</div>'
                    htmltext += '</div>'
                htmltext += '</div>'
                if(_itemNumberOfAdress == 1){
                    htmltext += '<div class="col-12 text-center">'
                        htmltext += '<p class="text-center mb-2 museu">Unidade1 - '+_completeItemAdressText1+'</p>'
                        htmltext += '<button class="green-btn py-1 px-3 mb-4" onClick="mapButton1(\''+_itemName+' '+_completeItemAdressText1+'\')">ver no mapa</button>'
                    htmltext += '</div>'
                }else if(_itemNumberOfAdress == 2){
                    htmltext += '<div class="col-12 text-center">'
                        htmltext += '<p class="text-center mb-2 museu">Unidade1 - '+_completeItemAdressText1+'</p>'
                        htmltext += '<button class="green-btn py-1 px-3 mb-4" onClick="mapButton1(\''+_itemName+' '+_completeItemAdressText1+'\')">ver no mapa</button>'
                    htmltext += '</div>'
                    htmltext += '<div class="col-12 text-center">'
                        htmltext += '<p class="text-center mb-2 museu" >Unidade2 - '+_completeItemAdressText2+'</p>'
                        htmltext += '<button class="green-btn py-1 px-3 mb-4" onClick="mapButton1(\''+_itemName+' '+_completeItemAdressText2+'\')">ver no mapa</button>'
                    htmltext += '</div>'
                }
                    htmltext += '<div class="col-12 text-center museu">'
                        htmltext += '<p style="text-align: center;">'+_itemcontactText+'</p>'
                            _itemcontactText = _itemcontactText.slice(0, _itemcontactText.indexOf("/")).replace(".","-")
                        htmltext += '<button class="blue-btn py-1 px-3 mb-4" onclick="location.href=\'tel:'+_itemcontactText+'\'">entrar em contato</button>'
                    htmltext += '</div>'
        document.getElementById(_itemArea).innerHTML+=htmltext;
}


function enlargedDisplayOfItem(_item, _name, _area, _numberOfAdress, _adress1, _adress2, _desconto, _contact, _nomeLogo){

    document.getElementById(_item+"reduced").classList.remove("enabled");
    document.getElementById(_item+"reduced").classList.add("disabled");
    document.getElementById(_item+"enlarged").classList.remove("disabled");
    document.getElementById(_item+"enlarged").classList.add("enabled");

    

}

function reducedDisplay(_item){

        document.getElementById(_item+"reduced").classList.remove("disabled");
        document.getElementById(_item+"reduced").classList.add("enabled");
        document.getElementById(_item+"enlarged").classList.remove("enabled");
        document.getElementById(_item+"enlarged").classList.add("disabled");
}

function mapButton1(_adress2){
    window.open("http://maps.google.com/?saddr=Current%20Location&daddr="+_adress2, "_blank")
}

function areaMenu(){
    document.querySelector(".area-menu").classList.toggle("active");
}
