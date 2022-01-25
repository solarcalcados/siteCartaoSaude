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

  console.log("V 2.2")


  db.collection("credenciados").get()
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
            console.log(nomeLogo)

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

            

            itemNumberOfAdress = Object.keys(doc.data().endereco).length;
            itemAdress = doc.data().endereco;

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
function changeDisplayOfItem(_itemId, _itemName,_itemArea, _itemNumberOfAdress, _itemAdressText, _completeItemAdressText1, _completeItemAdressText2, _itemDescontoText, _itemcontactText){

    let statusOfDisplay = document.getElementById("item"+_itemId).classList;
    
    if(statusOfDisplay[2] == "reduced" || statusOfDisplay[1] == "reduced"){
        document.getElementById("item"+_itemId).classList.remove("reduced");
        document.getElementById("item"+_itemId).classList.add("enlarged");

        enlargedDisplayOfItem(_itemId, _itemName,_itemArea, _itemNumberOfAdress, _completeItemAdressText1, _completeItemAdressText2, _itemDescontoText, _itemcontactText);
        admChangesToItemDisplay(_itemId);
        lastEnlargedItem = _itemId;
        
    }
    else{

        document.getElementById("item"+_itemId).classList.remove("enlarged");
        document.getElementById("item"+_itemId).classList.add("reduced");
        reducedDisplay(_itemId, _itemName, _itemArea, _itemNumberOfAdress, _itemAdressText, _completeItemAdressText1, _completeItemAdressText2, _itemDescontoText, _itemcontactText);

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

            htmltext = '<div id="item'+_itemId+'" class="cred-item container reduced">'



            console.log();

            htmltext += '<div class="row">'
            htmltext += '<div class="col-4">'
            htmltext += '<figure class="cred-item-logo vertical-align">'
            htmltext += '<img src="img/'+_nomeLogo+'.svg" alt="Logo">'
            htmltext += '</figure>'
            htmltext += '</div>'
            htmltext += '<div class="col-8 p-0">'
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
            htmltext += '<button onclick="changeDisplayOfItem('+_itemId+', \''+_itemName+'\', \''+_itemArea+'\', \''+_itemNumberOfAdress+'\', \''+_itemAdressText+'\', \''+_completeItemAdressText1+'\', \''+_completeItemAdressText2+'\', \''+_itemcontactText+'\', \''+_itemDescontoText+'\')" class="more-information w-100 border-0 p-1">mais informações</button>'
            htmltext += '<hr style="background-color: #9d9d9d;" class="m-0">'
            htmltext += '</div>'
            htmltext += '</div>'
            htmltext += '</div>'
            document.getElementById(_itemArea).innerHTML+=htmltext;
}


function enlargedDisplayOfItem(_item, _name, _area, _numberOfAdress, _adress1, _adress2, _desconto, _contact){

    document.getElementById("item" + _item).classList.remove("cred-item");

    incresedHtml = '<div class="row data">'
        incresedHtml += '<div class="col-12">'
            incresedHtml += '<h3 class="text-center m-2">'+_name+'</h3>'
        incresedHtml += '</div>'
        incresedHtml += '<div class="col-12">'
            incresedHtml += '<h5 class="text-center m-2">'+_contact+'</h5>'
        incresedHtml += '</div>'
        incresedHtml += '<div class="col-12">'
            incresedHtml += '<figure class="text-center">'
                incresedHtml += '<img class="w-50 my-3" src="img/logo.png" alt="logo">'
            incresedHtml += '</figure>'
        incresedHtml += '</div>'
        console.log(_numberOfAdress)
        if(_numberOfAdress == 1){
            incresedHtml += '<div class="col-12 text-center">'
            incresedHtml += '<p class="text-center mb-2 museu">Unidade1 - '+_adress1+'</p>'
            incresedHtml += '<button class="green-btn py-1 px-3 mb-4" onClick="mapButton1(\''+_name+' '+_adress1+'\')">ver no mapa</button>'
            incresedHtml += '</div>'
        }else if(_numberOfAdress == 2){
            incresedHtml += '<div class="col-12 text-center">'
            incresedHtml += '<p class="text-center mb-2 museu">Unidade1 - '+_adress1+'</p>'
            incresedHtml += '<button class="green-btn py-1 px-3 mb-4" onClick="mapButton1(\''+_name+' '+_adress1+'\')">ver no mapa</button>'
            incresedHtml += '</div>'
            incresedHtml += '<div class="col-12 text-center">'
            incresedHtml += '<p class="text-center mb-2 museu" >Unidade2 - '+_adress2+'</p>'
            incresedHtml += '<button class="green-btn py-1 px-3 mb-4" onClick="mapButton1(\''+_name+' '+_adress2+'\')">ver no mapa</button>'
            incresedHtml += '</div>'
        }

        incresedHtml += '<div class="col-12 text-center museu">'
            incresedHtml += '<p style="text-align: center;">'+_desconto+'</p>'
            _desconto = _desconto.slice(0, _desconto.indexOf("/")).replace(".","-")
            incresedHtml += '<button class="blue-btn py-1 px-3 mb-4" onclick="location.href=\'tel:'+_desconto+'\'">entrar em contato</button>'
    incresedHtml += '</div>'
    incresedHtml += '<hr>'
    incresedHtml += '</div>'

    document.getElementById("item"+_item).innerHTML = incresedHtml;

}

function reducedDisplay(_item){

        let id = "item" + _item;
        document.getElementById(id).classList.remove("cred-item");
        

        htmltext = '<div class="row">'
        htmltext += '<div class="col-4">'
        htmltext += '<figure class="cred-item-logo vertical-align">'
        htmltext += '<img src="img/logo.png" alt="Logo">'
        htmltext += '</figure>'
        htmltext += '</div>'
        htmltext += '<div class="col-8 p-0">'
        htmltext += '<div class="cred-item-name">'
        htmltext += '<h3>nome parceiro</h3>'
        htmltext += '</div>'
        htmltext += '<div class="cred-item-data">'
        htmltext += '<h4>'
        htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
        htmltext += '<img class="" src="img/gps.png" alt="">'
        htmltext += '</figure>'
        
        
        htmltext += '</h4>'
        htmltext += '<br>'
        htmltext += '<h4 class="text-uppercase">'
        htmltext += '<figure class="d-inline-block cred-data-icon m-1">'
        htmltext += '<img src="img/desconto.png" alt="">'
        htmltext += '</figure>'
        htmltext += 'desconto'
        htmltext += '</h4>'
        htmltext += '</div>'
        htmltext += '</div>'
        htmltext += '</div>'
        htmltext += '<div class="row">'
        htmltext += '<div class="col-12 p-0">'
        htmltext += '<button onclick="changeDisplayOfItem('+_item+')" class="more-information w-100 border-0 p-1">mais informações</button>'
        htmltext += '<hr style="background-color: #9d9d9d;" class="m-0">'
        htmltext += '</div>'
        htmltext += '</div>'
        document.getElementById("item"+_item).innerHTML = htmltext;

}

function mapButton1(_adress2){
    window.open("http://maps.google.com/?saddr=Current%20Location&daddr="+_adress2, "_blank")
}
