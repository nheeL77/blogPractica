//////////////////     Funcion para capturar el submit      ///////////////////////////

const formulario = document.querySelector("form");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  // Limpiar mensajes de errores existentes
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

  // validamos que sea un array y que no tenga objetos de errores dentro
  if (Array.isArray(resultadoValidacion) && resultadoValidacion.length === 0) {
    // mostramos mensaje de exito en el html
    event.target.reset();
    const formularioValido = document.querySelector(".buttones");
    const msjExito =
      '<p style="color: green;">Formulario enviado con exito !</p>';
    formularioValido.insertAdjacentHTML("afterbegin", msjExito);

    console.log("Formulario validado!");
    console.log(resultadoValidacion);
  } else {
    // Array con los objetos de errores - recorremos para crear cada mensaje de error
    resultadoValidacion.forEach((objetoError) => {
      console.log(objetoError.campo, objetoError.mensaje);
      // enviamos campo y mensaje de error
      crearMensajeDeError(objetoError.campo, objetoError.mensaje); // campo, mensajeDeError
    });
  }

});

//////////////////// Funcion para validacion de datos  ////////////////////////

function validacionDatos(datos) {
  let erroresARetornar = [];

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
    erroresARetornar.push({
      status: "invalido",
      campo: "formulario",
      mensaje: "formulario no valido",
    });
  }

  // erroresARetornar puede ser un Array vacio, si todos los campos son validos,
  //  o puede ser un Array con objetos de los distintos errores
  return erroresARetornar;
}

//////////////////// Funcion para mostrar el error ///////////////////////

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

//////////////////// Limpiar mensajes de errores existentes ////////////////////

formulario.addEventListener("reset", () => {
  const mensajesDeErrorExistentes =
    formulario.querySelectorAll(".mensaje-de-error");
  mensajesDeErrorExistentes.forEach((elemento) => {
    elemento.style.display = "none";
  });
  
  const validado = document.querySelector(".buttones");
  const removeExito = validado.querySelector("p");
  if (removeExito) {
    removeExito.remove();
  }
});
