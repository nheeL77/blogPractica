//////////////////////////// Funcion obtener articulos e incertarlos /////////////////////////////////

const jsonurl = "data.json"; //ruta de informacion por lo general una url

async function cargarArticulos() {
  const response = await fetch(jsonurl);
  if (response.ok != true) {
    console.log("Hubo un error en el fetch");
    return false;
  }

  const data = await response.json();
  return data;
}

async function setInformation() {
  const articulosContainer = document.getElementById("articulos"); //seleccionamos el contenedor donde se mostraran los articulos

  const editCards = await cargarArticulos();

  if (editCards != false && Array.isArray(editCards.articulos)) {
    editCards.articulos.forEach(function (articulo) {
      const newArticle = document.createElement("article");

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
                            `;

      articulosContainer.append(newArticle);
    });
  }
}

setInformation();

///////////////////      Funcion light/dark mode      ////////////////////////////////

const themeDark = document.querySelector(".buttonDark");
const themeLight = document.querySelector(".buttonLight");

const darkBody = document.querySelector(".buttonBright");
const backgroundBody = document.querySelector("body"); //document.body
darkBody.addEventListener("click", () => {
  // backgroundBody.style.backgroundColor='black';  ///// directo al background

  // const result = backgroundBody.classList.contains('darkmode') ///// manipulamos la clase
  // if (result == true) {
  //     backgroundBody.classList.remove('darkmode')
  // } else {
  //     backgroundBody.classList.add('darkmode')
  // }
  backgroundBody.classList.toggle("darkmode"); ///// simplifica la funcion de arriba
  themeDark.classList.toggle("displaynone");
  themeLight.classList.toggle("displaynone");
});

///////////////////      Funcion para editar textos      ///////////////////////////

const newTitle = document.querySelectorAll("h4");
const titleArticle = document.querySelector(".editTitle");
titleArticle.addEventListener("change", (event) => {
  //event seria el valor de change //function(event){ } "funcionaria de la misma manera"
  const valueInput = event.target.value;
  newTitle.forEach(function (elemento) {
    elemento.textContent = valueInput;
  });
});

//////////////////     Funcion para capturar el submit      ///////////////////////////

const formulario = document.querySelector("form");

formulario.addEventListener("reset", () => {
  // limpiar mensajes de errores existentes
  const mensajesDeErrorExistentes =
    formulario.querySelectorAll(".mensaje-de-error");
  mensajesDeErrorExistentes.forEach((elemento) => {
    elemento.style.display = "none";
  });
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  // limpiar mensajes de errores existentes
  const mensajesDeErrorExistentes =
    formulario.querySelectorAll(".mensaje-de-error");
  mensajesDeErrorExistentes.forEach((elemento) => {
    elemento.style.display = "none";
  });

  const datosFormulario = new FormData(formulario);

  const objetoDatos = Object.fromEntries(datosFormulario.entries()); // guardado los datos del form en objet

  // Valido -> [ ]
  // Invalido -> [{...},{...}]
  const resultadoValidacion = validacionDatos(objetoDatos);

  if (Array.isArray(resultadoValidacion) && resultadoValidacion.length === 0) {
    // mostramos mensaje de exito en el html
    console.log("formulario validado!");
    console.log(resultadoValidacion);
  } else {

    // Array con los objetos de errores - recorremos para crear cada mensaje de error
    resultadoValidacion.forEach((objetoError) => {
      console.log(objetoError.campo , objetoError.mensaje)
      // enviamos campo y mensaje de error
      crearMensajeDeError(objetoError.campo , objetoError.mensaje); // campo, mensajeDeError
    })
  }
});

function validacionDatos(datos) {
  let erroresARetornar = []
  
  if (datos && datos.nombre && datos.email && datos.tel) {
    //muy importante validar si es el tipo de dtos que esperamos, object en este caso, array, etc.
    const nombre = datos.nombre;
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    if (!regexNombre.test(nombre) || nombre.trim() === 0) {
      erroresARetornar.push({
        status: "invalido",
        campo: "nombre",
        mensaje: "Regex no cumplida o nombre vacio",
      });
    }

    const email = datos.email;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email) || email.trim() === 0) {
      erroresARetornar.push({
        status: "invalido",
        campo: "email",
        mensaje: "Email no valido",
      });
    }

    const tel = datos.tel;
    const regexTel = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,}\)?[-.\s]?){2,}\d{1,}$/;
    if (!regexTel.test(tel) || tel.trim() === 0) {
      erroresARetornar.push({
        status: "invalido",
        campo: "tel",
        mensaje: "Telefono no valido",
      });
    }
  } else {
    erroresARetornar.push(
    {
      status: "invalido",
      campo: "formulario",
      mensaje: "formulario no valido",
    }
    )
     ;
  }

  // erroresARetornar puede ser un Array vacio, si todos los campos son validos,
  //  o puede ser un Array con objetos de los distintos errores
  return erroresARetornar;
}

function crearMensajeDeError(campo, mensajeDeError) {
  const input = document.querySelector(`input[name="${campo}"]`);
  if (input) {
    const parent = input.parentElement; // seleccionamos elemento padre del input
    // parent.style.border = "1px solid red";
    const newElement = document.createElement("p"); // creamos elemento p donde insertamos el mensaje de error
    newElement.classList.add("mensaje-de-error");
    newElement.style.color = "red";
    newElement.textContent = mensajeDeError;

    if (parent) {
      parent.append(newElement); // insertamos el p en el elemento padre del input
    }
  }
}

