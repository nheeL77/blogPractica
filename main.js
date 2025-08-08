//ruta de informacion por lo general una url
const jsonurl = "data.json" 

//funcion para obtener y mostrar los datos
async function cargarArticulos() { 
    const response = await fetch(jsonurl) 
    if(response.ok != true) {
        console.log("Hubo un error en el fetch")
        return false
    } 
    
    const data = await response.json()
    return data
};


async function setInformation() {
    const articulosContainer = document.getElementById("articulos")  //seleccionamos el contenedor donde se mostraran los articulos
    
    const editCards = await cargarArticulos()

    if (Array.isArray(editCards)) {
        //     editCards.forEach(function (articulo) {
        //     }
        // )
    }    
};

setInformation();

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

const newTitle = document.querySelectorAll('h4');
const titleArticle = document.querySelector('.editTitle');
    titleArticle.addEventListener('change', (event) => {    //event seria el valor de change //function(event){ } "funcionaria de la misma manera"
        const valueInput = event.target.value;
        newTitle.forEach(function (elemento){
            elemento.textContent = valueInput;
        })
    });