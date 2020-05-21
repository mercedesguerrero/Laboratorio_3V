
var http= new XMLHttpRequest();
window.onload= inicializar;

    function inicializar()
    {
        // var btn= document.getElementById("btnEnviar");
        // btn.onclick= login;

        http.onreadystatechange= callback;
        http.open("GET","http://localhost:3000/personas", true);
        http.send();
    }

    function callback(){
        console.log("Llego respuesta", http.readyState);
    
        if(http.readyState===4 && http.status===200){
        
            console.log("tenemos un 200");

            armarTabla(JSON.parse(http.responseText));

            //document.write(http.responseText);
            // if(http.responseText){
            //     alert("Login ok");
            // }else{
            //     alert("Error!");
            // }
        }else{
            console.log("Tenemos un error!"); 
        }
        console.log("Termino llamada");
    }

    function armarTabla(jsonObj)
    {
        console.log("Entro en armar tabla");
        var tbody= document.getElementById("tbody");
        for(i=0; i<jsonObj.length; i++)
        {
            var fila= "<tr><td>" + jsonObj[i].nombre + "</td>" + 
                    "<td>" + jsonObj[i].apellido + "</td>" + 
                    "<td>" + jsonObj[i].fecha + "</td>" + 
                    "<td>" + jsonObj[i].telefono + "</td></tr>";

            tbody.innerHTML= tbody.innerHTML + fila;
        }
    }

    // function ejecutarPost(){

    //     var httpPost= new XMLHttpRequest();

    //     httpPost.onreadystatechange= function(){

    //         if(httpPost.readyState===4 && httpPost.status===200){

    //             alert(httpPost.responseText);
    //         }

    //         httpPost.open("POST","http://localhost:3000/nuevapersona", true);
    //         httpPost.setRequestHeader("Content-Type","application/json");//para saber que va a viajar en el body, en este caso json
    //         var json= '{"nombre":"Mercedes","apellido":"Guerrero","fecha":"2019-05-01","telefono":463782991}'
    //         httpPost.send(JSON.stringify(json));

    //     }
    // }

