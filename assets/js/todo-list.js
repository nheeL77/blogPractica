const formList = document.querySelector("form");
formList.addEventListener("submit", (event) => {
  event.preventDefault();

  const tareaData = new FormData(formList);
  const tareaDescription = tareaData.get("tarea");

  const tareaAnalizada = validarTarea(tareaDescription);
  const tareaCapitalizada = capitalizarText(tareaAnalizada);

  const unorderList = document.querySelector(".listaTareas");
  if (tareaCapitalizada) {
    const createLi = document.createElement("li");
    event.target.reset();
    createLi.innerHTML = `
      <div class="nuevaTarea">  
        <input type="checkbox" id="checkBox">
        <p id="tareaLista">${tareaCapitalizada}</p>
        <button class="eliminarTarea">Eliminar</button>
      </div>
        `;
    unorderList.prepend(createLi);
  }

  const bottonEliminar = document.querySelectorAll(".eliminarTarea");

  bottonEliminar.forEach((button) => {
    button.addEventListener("click", () => {
      const containerBotton = button.parentElement;
      containerBotton.remove();
    });
  });

  const checkBox = document.getElementById("checkBox")
  const tareaLista = document.getElementById('tareaLista')
  checkBox.addEventListener('change', () => {
    if(checkBox.checked) {
      tareaLista.classList.add('tachar')
    } else {
      tareaLista.classList.remove('tachar')
    }
  })
});

function validarTarea(tarea) {
  if (tarea.length > 3 && tarea.length <= 25) {
    return tarea;
  } else {
    return false;
  }
}

function capitalizarText(text) {
  if(text && text.length > 0) {
    return text[0].toUpperCase() + text.substring(1);
  }
  return '';
}


// CHECKBOX TACHA TAREA
