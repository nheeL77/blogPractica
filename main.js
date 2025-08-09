

//////////////////////////// Funcion obtener articulos e incertarlos /////////////////////////////////

const jsonurl = "data.json" //ruta de informacion por lo general una url

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

    if (editCards != false && Array.isArray(editCards.articulos)) {
            editCards.articulos.forEach(function (articulo) {
                const newArticle = document.createElement('article')

                newArticle.innerHTML = `
                                <header>
                                    <img src="./img/6.Dsq_1pG4_14nmYx.webp" alt="Manos blancas roboticas sobre teclado" width="300" height="180">
                                </header>
                                <div>
                                    <h4>${articulo.titulo}</h4>
                                    <p>${articulo.informacion_it}</p>
                                </div>
                                <footer>
                                    <small>${articulo.autor} - ${articulo.fecha}</small>
                                </footer>
                            `

                articulosContainer.append(newArticle)
            }
        )
    }    
};

setInformation();


///////////////////      Funcion light/dark mode      ////////////////////////////////

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


///////////////////      Funcion para editar textos      ///////////////////////////

const newTitle = document.querySelectorAll('h4');
const titleArticle = document.querySelector('.editTitle');
    titleArticle.addEventListener('change', (event) => {    //event seria el valor de change //function(event){ } "funcionaria de la misma manera"
        const valueInput = event.target.value;
        newTitle.forEach(function (elemento){
            elemento.textContent = valueInput;
        })
    });


//////////////////     Funcion para capturar el submit      ///////////////////////////


const formulario = document.querySelector('form');
formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    const datosFormulario = new FormData(formulario);
    const objetoDatos = Object.fromEntries(datosFormulario.entries()); // guardado los datos del form en objet
    const datosJson = JSON.stringify(objetoDatos); //Ya tenemos guardado en datosJson los datos del submit
        
});

