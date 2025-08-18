const formList = document.querySelector("form");
const unorderList = document.querySelector(".listaTareas");

formList.addEventListener("submit", (event) => {
  event.preventDefault();

  const tareaData = new FormData(formList);
  const tareaDescription = tareaData.get("tarea");

  const tareaAnalizada = validarTarea(tareaDescription);
  const tareaCapitalizada = capitalizarText(tareaAnalizada);

  if (tareaCapitalizada) {
    const createLi = document.createElement("li");
    createLi.innerHTML = `  
        <input type="checkbox" class="checkBox">
        <p class="tareaLista">${tareaCapitalizada}</p>
        <button type="button" class="eliminarTarea">Eliminar</button>
    `;
    unorderList.prepend(createLi);
    event.target.reset();
  }
});

unorderList.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminarTarea")) {
    e.target.closest("li").remove();
  }

  if (e.target.classList.contains("checkBox")) {

    const tareaLista = e.target.closest("li").querySelector(".tareaLista");
    tareaLista.classList.toggle("tachar", e.target.checked);
  }
});

function validarTarea(tarea) {
  if (tarea?.trim() && tarea.length > 3 && tarea.length <= 25) {
    return tarea;
  }
  return false;
}

function capitalizarText(text) {
  if (text && text.length > 0) {
    return text[0].toUpperCase() + text.substring(1);
  }
  return "";
}

// FALTAN CARTELES DE ERRORES, TEXTO VACIO O DEMASIADO LARGO
// GUARDAR TAREAS EN LOCAL STORAGE Y RECUPERAR, guardar valor de la tarea y si esta compleatada o no.

