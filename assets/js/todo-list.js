const formList = document.querySelector("form");
const unorderList = document.querySelector(".listaTareas");
const listado = JSON.parse(localStorage.getItem("tareas")) || [];

function renderTareas() {
  unorderList.innerHTML = "";
  listado.forEach((t) => {
    const li = document.createElement("li");
    li.setAttribute("id", t.id);
    li.innerHTML = `
      <input type="checkbox" class="checkBox" ${t.estado ? "checked" : ""}>
      <span class="newCheckbox"></span>
      <p class="tareaLista ${t.estado ? "tachar" : ""}">${t.tarea}</p>
      <button type="button" class="eliminarTarea">Eliminar</button>
    `;
    unorderList.prepend(li);
  });
}
renderTareas();

const length = document.querySelector(".contador");
const input = document.querySelector(".inputTarea");
input.addEventListener("input", (e) => {
  const countLength = e.target.value.length;
  length.textContent = `[${countLength}`;
});

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
    <span class="newCheckbox"></span>
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
    localStorage.setItem("tareas", JSON.stringify(listado)); // Mas directo
    event.target.reset();
    length.textContent = "[0"
  }
});

unorderList.addEventListener("click", (e) => {
  const idTarea = Number(e.target.closest("li").id);
  if (e.target.classList.contains("eliminarTarea")) {
    e.target.closest("li").remove();
    const elemento = listado.findIndex((t) => t.id === idTarea);
    if (elemento !== -1) {
      listado.splice(elemento, 1);
      console.log(listado);
      localStorage.setItem("tareas", JSON.stringify(listado)); //Mas directo
    }
  }

  if (e.target.classList.contains("checkBox")) {
    const tareaLista = e.target.closest("li").querySelector(".tareaLista");
    tareaLista.classList.toggle("tachar", e.target.checked);

    const tarea = listado.find((t) => t.id === idTarea);
    if (tarea) {
      tarea.estado = Boolean(e.target.checked);
      console.log(typeof listado);
      const json = JSON.stringify(listado);
      console.log(typeof json);
      localStorage.setItem("tareas", json); //Menos directo
    }
  }
});

function validarTarea(tarea) {
  const pError = document.querySelector(".mensajeError");
  if (tarea?.trim() && tarea.length > 3 && tarea.length <= 25) {
    pError.classList.add("displayNone");
    return tarea.trim();
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

//contador de caracteres en la tarea, onchage, keypress, keyup, keydown, luego con el lenght mostrar la cantidad de caracteres.
