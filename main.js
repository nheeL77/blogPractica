//ruta de informacion
const jsonurl = "data.json" 

//seleccionamos el contenedor donde se mostraran los articulos
const articulosContainer = document.getElementById("articulos") 

//funcion para obtener y mostrar los datos
async function cargarArticulos() {
    const response = await fetch(jsonurl) 
        if(response.ok != true) {
            alert("Hubo un error en el fetch")
            return false
        } 

        const data = await response.json()
        console.log(data)
}

// cargarArticulos();

const themeDark = document.querySelector('.buttonDark');
const themeLight = document.querySelector('.buttonLight');

const darkBody =  document.querySelector('.buttonBright');
const backgroundBody = document.querySelector('body'); //document.body
    darkBody.addEventListener('click', () => {
    // backgroundBody.style.backgroundColor='black';  ///// directo al background

    // const result = backgroundBody.classList.contains('darkmode') ///// manipulamos la clase
    // if (result == true) {
    //     backgroundBody.classList.remove('darkmode')
    // } else {
    //     backgroundBody.classList.add('darkmode')
    // }
    backgroundBody.classList.toggle('darkmode') ///// simplifica la funcion de arriba
    themeDark.classList.toggle('displaynone');
    themeLight.classList.toggle('displaynone');
});    
    