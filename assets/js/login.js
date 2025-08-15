const nombreUsuario = document.getElementById("nombreDeUsuario");
nombreUsuario.addEventListener("submit", (event) => {
  event.preventDefault();

  const datosInput = new FormData(nombreUsuario);
  const nombreLogin = datosInput.get("nombreUsuario")

  const datosValidados = validarNombre(nombreLogin);

  const containerUsuario = document.querySelector(".containerInput");
  const saludoUsuario = document.querySelector("main");
  if (datosValidados.length === 0) {
    event.target.reset();
    console.log("Formulario validado!");
    const msjBienvenida = `<p class="mensajeBienvenida"> Bienvenido ${nombreLogin} !</p>`;
    saludoUsuario.insertAdjacentHTML("afterbegin", msjBienvenida);
  } else {
    datosValidados.forEach((objetoError) => {
      console.log(objetoError.campo, objetoError.mensaje);
      const msjError = objetoError.mensaje;
      const usuarioIncorrecto = `<p class="errorUsario"> ${msjError} </p>`;
      containerUsuario.insertAdjacentHTML("afterbegin", usuarioIncorrecto);
    });
  }
});

function validarNombre(nombre) {
  let errorUsuario = [];

  if (!nombre || nombre.trim().length === 0) {
    errorUsuario.push({
      status: "invalido",
      campo: "usuario",
      mensaje: "Campo vacio",
    });
  } else {
    const condicion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-_0-9]+$/;
    if (!condicion.test(nombre)) {
      errorUsuario.push({
        status: "invalido",
        campo: "usuario",
        mensaje: "Usuario invalido o en uso.",
      });
    }
  }
  return errorUsuario;
}
