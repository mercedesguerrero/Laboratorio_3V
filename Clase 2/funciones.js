
window.onload= inicializar;

    function inicializar()
    {
        var btn= document.getElementById("btnEnviar");
        btn.onclick= agregar;
    }

    function agregar()
    {
        var nombre = document.getElementById("txtNombre").value;
        var apellido = document.getElementById("txtApellido").value;

        if(apellido=="" || nombre==""){

            document.getElementById("txtNombre").className="error";
            document.getElementById("txtApellido").className="error";
            alert("Debe ingresar nombre y apellido");
            return;
        }

        var resultado = confirm("¿Está seguro que desea agregar una persona?");

        if(resultado){
            document.getElementById("txtNombre").className="sinerror";
            document.getElementById("txtApellido").className="sinerror";

            var tCuerpo= document.getElementById("tcuerpo");

            tCuerpo.innerHTML+=
            "<tr>"+
            "<td>"+nombre+"</td>"+
            "<td>"+apellido+"</td>"+
            "<td><a href=''>borrar</a></td>";
        }

    }
