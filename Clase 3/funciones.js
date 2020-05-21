
window.onload= inicializar;

    function Sumar(a, b)
    {
        alert(a + b);
    }

    function inicializar()
    {
        var btn= document.getElementById("btn");
        btn.onclick= saludar;
    }

    function saludar()
    {
        alert("HOLA");
    }
