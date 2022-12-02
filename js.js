var SimpleVisita = {
    ID: location.hash.split("#")[1],
    tracking_id: "",
    on_its_way: "",
    status: "",
    planned_date:"",
    current_eta: "",
    myFunction: function(IdNotification, IDBarra) {
        var x = document.getElementById(IdNotification);
        var y = document.getElementById(IDBarra);
        if (x.style.opacity == 0.3) {
            x.style.opacity = 0.3;
            y.className = "step0";
        } else {
            x.style.opacity = 1;
            y.className = "active step0";
            console.log(y.className);
        }
    }
  };



var myHeaders = new Headers();
myHeaders.append("Authorization", "Token 15107173101c467520085d9d83c5c8ab28b70392");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.simpliroute.com/v1/routes/visits/", requestOptions, SimpleVisita)
  .then(response => response.json())
  .then(result => {console.log(result)

    for (const item of result) {
        if (item.tracking_id == SimpleVisita.ID) {
            SimpleVisita.tracking_id = item.tracking_id;
            SimpleVisita.on_its_way = item.on_its_way;
            SimpleVisita.current_eta = item.current_eta;
            SimpleVisita.status = item.status;
            SimpleVisita.planned_date = item.planned_date;
      }
    }
    
    console.log(SimpleVisita);
    if (SimpleVisita.tracking_id) {
        SimpleVisita.myFunction("Not1", "Barra1")
        document.getElementById("Planificado").innerHTML =
        "Se planifico un pedido para la fecha " + SimpleVisita.planned_date +" en caso de no estar disponible contactarse con Mesa de ayuda. ";
        document.getElementById("SRpantalla").innerHTML = "#" + SimpleVisita.tracking_id;
    }

    if(SimpleVisita.current_eta != null) {
        SimpleVisita.myFunction("Not2", "Barra2");
   }
  
   if(SimpleVisita.on_its_way != null){
        SimpleVisita.myFunction("Not3", "Barra3");
    }
    if (SimpleVisita.status == "completed"){
        SimpleVisita.myFunction("Not4", "Barra4");
    }else if (SimpleVisita.status == "failed"){
        var y = document.getElementById("alert-fallida");
        y.style.display = "block";
        document.getElementById("alert-fallida").innerHTML =
        "Disculpe, algo salio mal, pronto se comunicaran con usted para recoordinar el envio";
    }

    
})
  .catch(error => console.log('error', error));