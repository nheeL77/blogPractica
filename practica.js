const formulario = document.querySelector('form'); //Capturamos el formulario y lo guardamos en una constante

formulario.addEventListener("submit", (event) => {
  //Escuchamos el evento cuando se envia.
  event.preventDefault(); //Cuando se envia, lo frenamos para manipularlo

  const result = new FormData(formulario); //A los datos obtenidos los convertimos en un formulario
  const objectResult = Object.fromEntries(result.entries()); //A los datos en formato formulario, los convertimos en un object.
  const resultadoValidacion = validacionDatos(objectResult);
  if (Array.isArray(resultadoValidacion) && resultadoValidacion.lenght === 0) {
    const formularioValido = document.querySelector(".buttones");
    // const msjExito = document.createElement('p');
    // msjExito.textContent = 'Formulario enviado con exito !'
    // formularioValido.appendChild(msjExito);
    const msjExito =
      '<p style="color: green;">Formulario enviado con exito !</p>';
    formularioValido.insertAdjacentHTML("beforebegin", msjExito);
  } else {
    resultadoValidacion.forEach((objectError) => {
      console.log(objectError);
      mensajeError(objectError.campo, objectError.mensaje);
    });
  }
});

function validacionDatos(datos) {
  //Funcion que corrobora si lo que le pasamos por parametro es un object
  const erroresFormulario = [];
  if (datos && datos.nombre && datos.email && datos.tel) {
    //Si object tiene la propiedad nombre, email y tel

    const nombre = datos.nombre;
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    if (!regexNombre.test(nombre) || nombre.trim() === 0) {
      erroresFormulario.push({
        status: "invalido",
        campo: "nombre",
        error: "nombre invalido, inserte nombre valido.",
      });
    }

    const email = datos.email;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email) || email.trim() === 0) {
      erroresFormulario.push({
        status: "invalido",
        campo: "email",
        mensaje: "Email no valido",
      });
    }

    const tel = datos.tel;
    const regexTel = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,}\)?[-.\s]?){2,}\d{1,}$/;
    if (!regexTel.test(tel) || tel.trim() === 0) {
      erroresFormulario.push({
        status: "invalido",
        campo: "tel",
        mensaje: "Telefono no valido",
      });
    }
  } else {
    erroresFormulario.push({
      status: "invalido",
      campo: "formulario",
      mensaje: "formulario invalido",
    });
  }
  return erroresFormulario;
}

function mensajeError(campo, mensaje) {
  const input = document.querySelector(`input[name="${campo}"]`);
  if (input) {
    const parentInput = input.parentElement;
    const advertencia = document.createElement("p");
    advertencia.classList.add("mensajeAdvertencia");
    advertencia.style.color = "red";
    advertencia.textContent = mensaje;

    if (parentInput) {
      parentInput.append(advertencia);
    }
  }
}

formulario.addEventListener("reset", () => {
  const mensajesDeErrorExistentes = formulario.querySelectorAll(".mensajeAdvertencia");
  mensajesDeErrorExistentes.forEach((elemento) => {
    elemento.style.display = "none";
  });
});

