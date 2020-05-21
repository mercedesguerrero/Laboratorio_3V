//creamos el objeto
/*
var http= new XMLHttpRequest();

http.onreadystatechange= function(){
    console.log("LLego respuesta", http.readyState);

    if(http.readyState===4){
        if(http.status===200){
            console.log("tenemos un 200");
            document.write(http.responseText);
        }else{
            console.log("Tenemos un error!");
        }
    }
}

http.open("GET","http://localhost:3000/login",true);//abrimos una peticion contra el servidor

http.send();
*/

window.onload= inicializar;
var http= new XMLHttpRequest();

    function inicializar()
    {
        var btn= document.getElementById("btnEnviar");
        btn.onclick= login;
    }

function login(){

    http.onreadystatechange= function(){
        console.log("Llego respuesta", http.readyState);
    
        if(http.readyState===4){
            if(http.status===200){
                console.log("tenemos un 200");
                //document.write(http.responseText);
                if(http.responseText){
                    alert("Login ok");
                }else{
                    alert("Error!");
                }
            }else{
                console.log("Tenemos un error!");
            }
        }
    }
    
    http.open("GET","http://localhost:3000/loginUsuario?usr="+document.getElementById("txtNombre").value+"&pass="+document.getElementById("mypassword").value,true);//"usuario"&&req.query.pass==="1234"
    
    http.send();
    
    console.log("Termino llamada");
}

