const formList = document.querySelector("form");
const unorderList = document.querySelector(".listaTareas");
const listado = [];

formList.addEventListener("submit", (event) => {
  event.preventDefault();

  const tareaData = new FormData(formList);
  const tareaDescription = tareaData.get("tarea");

  const tareaAnalizada = validarTarea(tareaDescription);
  const tareaCapitalizada = capitalizarText(tareaAnalizada);

  if (tareaCapitalizada) {
    const id = Date.now();
    const createLi = document.createElement("li");
    createLi.setAttribute("id", id.toString());
    createLi.innerHTML = `  
    <input type="checkbox" class="checkBox">
    <p class="tareaLista">${tareaCapitalizada}</p>
    <button type="button" class="eliminarTarea">Eliminar</button>
    `;
    unorderList.prepend(createLi);
    const nuevaTarea = {
      id: id,
      tarea: tareaCapitalizada,
      estado: false,
    };
    listado.push(nuevaTarea);
    event.target.reset();
  }
});

unorderList.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminarTarea")) {
    const idTarea = Number(e.target.closest("li").id);

    e.target.closest("li").remove();

    const elemento = listado.findIndex(t => t.id === idTarea);
    if (elemento !== -1) {
      listado.splice(elemento, 1);
      console.log (listado)
    }
  }

  if (e.target.classList.contains("checkBox")) {
    const idTarea = Number(e.target.closest("li").id);
    const tareaLista = e.target.closest("li").querySelector(".tareaLista");
    tareaLista.classList.toggle("tachar", e.target.checked);

    const tarea = listado.find((t) => t.id === idTarea);
    if (tarea) {
      tarea.estado = e.target.checked;
      console.log (listado)
    }
  }
});

function validarTarea(tarea) {
  const pError = document.querySelector(".mensajeError");
  if (tarea?.trim() && tarea.length > 3 && tarea.length <= 25) {
    pError.classList.add("displayNone");
    return tarea;
  }
  pError.classList.remove("displayNone");
  return false;
}

function capitalizarText(text) {
  if (text && text.length > 0) {
    return text[0].toUpperCase() + text.substring(1);
  }
  return "";
}

