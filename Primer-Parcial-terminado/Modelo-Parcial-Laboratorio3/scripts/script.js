var btnAlta;
var divFrm;
var frmAlta;
var divInfo;
var btnCancelar;

var lista;

window.onload = asignarEventos;

function asignarEventos() {

    document.getElementById('btnAlta').addEventListener('click',crearFormulario);
    traerPersonajes();
}

function crearHeader(tabla)
{
    var header = document.createElement('tr');
    var theader = document.createElement('thead');
    theader.id = 'theader';
    var atributos = [];
    for(atributo in lista[0])
    {
        if(atributo == 'active')
        {
            continue;
        }
        atributos.push(atributo);
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(atributo));
        header.appendChild(th);
    }
    theader.appendChild(header);
    tabla.appendChild(theader);
    return crearBody(tabla,atributos);

}

function crearBody(tabla,atributos)
{
    var tbody = document.createElement('tbody');
    tbody.id = 'bodyTabla';
    for(persona of lista)
    {
        var tr = document.createElement('tr');
        for(atributo of atributos)
        {
            if(atributo == 'active')
            {
                continue;
            }
            
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(persona[atributo]));
            tr.appendChild(td);
            
        }
        tr.id = 'tableRow';
        tr.addEventListener('click',crearFormulario);
        tbody.appendChild(tr);
    }
    tabla.appendChild(tbody);
    return tabla;
}

function actualizarTabla(lista) 
{
    var tabla = document.createElement('table');
    tabla.id = "tablaLista";
    tabla = crearHeader(tabla);
    document.body.appendChild(tabla);
}

function consultarFormExistente()
{
    for(hijos of document.body.children)
    {
        if(hijos.className == 'frmAlta')
        {
            return 0;
        }
    }
}

function crearFormulario()
{
    if(consultarFormExistente()==0)
    {
        return -1;
    }
    var formulario = document.createElement('form');
    formulario.className = 'frmAlta';
    var tabla = document.createElement('table');
    var header = document.getElementById('theader');
    var i = 0;
    for(i = 0; i< header.children[0].children.length; i++)
    {
        if(header.children[0].children[i].innerText == 'casa')
        {
            continue;
        }
        var tr = document.createElement('tr');
        var label = document.createElement('label');
        label.className = 'labelForm';
        label.innerText = header.children[0].children[i].innerText;
        var td = document.createElement('td');
        td.appendChild(label);
        tr.appendChild(td);
        var input = document.createElement('input');
        input.className = 'inputForm';
        if(this.id == 'tableRow')
        {
            input.value = this.children[i].innerText;
        }
        if(header.children[0].children[i].innerText == 'id')
        {
            input.disabled = true;
        }
        if(header.children[0].children[i].innerText == 'edad')
        {
            input.type = 'edad';
        }
        if(header.children[0].children[i].innerText == 'traidor')
        {
            input.type = 'checkbox';
            input.id = "traidor";
            input.name = 'traidor';
        }
        
        var td = document.createElement('td');
        td.appendChild(input);
        tr.appendChild(td);
        tabla.appendChild(tr);
    }
    agregarRadioButtons(tabla,this);
    agregarBotonesRow(tabla,this);
    agregarBotonEnviar(tabla,this);
    formulario.appendChild(tabla);
    document.body.appendChild(formulario);
}

function agregarBotonEnviar(tabla,caller)
{
    if(caller.id == 'btnAlta')
    {
        var tr = document.createElement('tr');
        var Enviar = document.createElement('button');
        Enviar.innerText = 'Dar de Alta';
        Enviar.type = 'button';
        Enviar.className = 'btnForm';
        Enviar.addEventListener('click',altaPersona);
        var td = document.createElement('td');
        td.appendChild(Enviar);
        tr.appendChild(td);
        agregarBotonCancelar(tabla,tr);
        tabla.appendChild(tr);
    }
}

function agregarBotonesRow(tabla, caller)
{
    if(caller.id == 'tableRow')
    {
        var botones = ["Eliminar","Modificar","Cancelar"];
        for(var i = 0 ; i<botones.length;i++)
        {
            var tr = document.createElement('tr');
            var boton = document.createElement('button');
            boton.innerText = botones[i];
            boton.type = 'button';
            boton.className = 'btnForm';
            if(i == 0)
            {
                boton.addEventListener('click',eliminacionPersonaje);
            }
            else if(i==1)
            {
                boton.addEventListener('click',modificacionPersonaje);
            }
            else
            {
                boton.addEventListener('click',cerrarForm);
            }
            var td = document.createElement('td');
            td.appendChild(boton);
            tr.appendChild(td);
            tabla.appendChild(tr);
        }
    }
}

function agregarBotonCancelar(tabla,tr)
{
    var Cancelar = document.createElement('button');
    Cancelar.innerText = 'Cancelar';
    Cancelar.type = 'button';
    Cancelar.className = 'btnForm';
    Cancelar.addEventListener('click',cerrarForm);
    var td = document.createElement('td');
    td.appendChild(Cancelar);
    tr.appendChild(td);
}

function agregarRadioButtons(table,caller)
{
    var labelValor = ["Lannister","Stark","Targaryen"];
    var id = ["Lannister","Stark","Targaryen"]; 
    var tr = document.createElement('tr');    
    for(var i = 0; i<labelValor.length;i++)
    {
        var label = document.createElement('label');
        label.className = 'labelForm';
        label.innerText = labelValor[i];
        tr.appendChild(label);
        var input = document.createElement('input');
        input.type = 'radio';
        input.id = id[i];
        input.name = 'casa';
        input.className = 'inputForm';
        cargarRadioButtons(caller,input);
        tr.appendChild(input);
    }
    table.appendChild(tr);
}

function cargarRadioButtons(caller,input)
{
    if(caller.id == 'tableRow')
    {
        var casa = document.getElementsByName("casa");
        var casaseleccionada;

        for(var i = 0; i < casa.length; i++) {
        if(casa[i].checked)
            casaseleccionada = casa[i].value;
        }
    }
}

function agregarCheckbox(table,caller)
{
    var tr = document.createElement('tr');    
    var label = document.createElement('label');
    label.className = 'labelForm';
    label.innerText = "traidor";
    tr.appendChild(label);
    var input = document.createElement('input');

    input.setAttribute("id", "traidor");

    input.type = 'checkbox';
    input.id = "traidor";
    input.name = 'traidor';
    input.className = 'inputForm';
    //cargarRadioButtons(caller,input);
    tr.appendChild(input);
    table.appendChild(tr);
}


function cerrarForm()
{
    document.body.removeChild(document.getElementsByClassName('frmAlta')[0]);
}

function removerObjetos()
{
    cerrarForm();
    document.body.removeChild(document.getElementById('tablaLista'));    
}

function validarCampos()
{
    return 0;
    var inputs = document.getElementsByClassName('inputForm');
    for(var i = 1; i<inputs.length;i++)
    {
        if(inputs[i].value == "" || inputs[i].value == " " || (inputs[4].checked == false && inputs[5].checked == false))
        {
            return -1;
        }
        
    }
    return 0;    
}

function altaPersona() 
{
    var inputs = document.getElementsByClassName('inputForm');
    var traidor = document.getElementById('traidor');

    if (traidor.checked == true){
        traidor=true;
    }else{
        traidor=false;
    }


    var casa;

    if(inputs[4].checked == true)
    {
        casa = "Lannister";
    }
    else if(inputs[5].checked == true)
    {
        casa = "Stark";
    }
    else
    {
        casa = "Targaryen";
        
    }
   
    var nuevaPersona = new Persona(inputs[1].value, inputs[2].value, inputs[3].value, casa, traidor);
    guardarPersonaje(nuevaPersona);
    removerObjetos();
}

function eliminacionPersonaje() 
{
    var inputs = document.getElementsByClassName('inputForm');
    if(confirm("¿Desea eliminar a " + inputs[1].value +", " +inputs[2].value+"?"))
    {
        bajaPersonaje(inputs[0].value);
        removerObjetos();        
    }
}

function modificacionPersonaje(persona) 
{
    var traidor = document.getElementById('traidor');

    if (traidor.checked == true){
        traidor=true;
    }else{
        traidor=false;
    }

    var casa;
    if (document.getElementById('Stark').checked) {
        casa = "Stark";
    }
    else if (document.getElementById('Targaryen').checked) {
        casa = "Targaryen";
    }
    else if (document.getElementById('Lannister').checked) {
        casa = "Lannister";
    }

    var inputs = document.getElementsByClassName('inputForm');
    var persona = new Persona(inputs[1].value,inputs[2].value,inputs[3].value,casa, traidor);
    persona.id = inputs[0].value;
    modificarPersonaje(persona);
    removerObjetos();
}

function Persona(nombre,apellido,edad,casa, traidor){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.casa = casa;
    this.traidor = traidor;
    this.active = "true";
}

//funciones de servidor y json

function traerManejador()
{
  if(xhr.readyState == 4)
  {
    if(xhr.status == 200)
    {
      document.getElementById('spinner').style.display = 'none';
      var aux = JSON.parse(xhr.responseText);
      lista = aux["data"];
      actualizarTabla(lista);
    }
    else
    {
      //alert("Error: " + xhr.status + " - " + xhr.statusText);
    }
  }
  else
  {
    document.getElementById('spinner').style.display = 'block';    
  }
}

function postManejador()
{
    if(xhr.readyState == 4)
    {
      if(xhr.status == 200)
      {
        document.getElementById('spinner').style.display = 'none';
        traerPersonajes();
      }
      else
      {
        //alert("Error: " + xhr.status + " - " + xhr.statusText);
      }
    }
    else
    {
      document.getElementById('spinner').style.display = 'block';    
    }
}

var xhr;
function traerPersonajes() 
{
  var url = "http://localhost:3000/traerPersonajes"
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = traerManejador;
  xhr.open('GET',url,true);
  xhr.send();
}

function guardarPersonaje(persona) 
{
  var body=
  {
    'objeto':persona
  }
  var url = "http://localhost:3000/altaPersonaje";
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = postManejador;
  xhr.open('POST',url,true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
}

function bajaPersonaje(id) 
{
  var body=
  {
    'id':id
  }
  var url = "http://localhost:3000/bajaPersonaje";
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = postManejador;
  xhr.open('POST',url,true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
}

function modificarPersonaje(persona) 
{
  var body=
  {
    'objeto':persona
  }
  var url = "http://localhost:3000/modificarPersonaje";
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = postManejador;
  xhr.open('POST',url,true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
}


