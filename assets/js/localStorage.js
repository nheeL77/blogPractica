///////////////////      Funcion light/dark mode      ////////////////////////////////
//////////////////           localStorage            ////////////////////

const buttonLight = document.querySelector(".buttonLight");
const buttonDark = document.querySelector(".buttonDark");

const body = document.querySelector("body"); //document.body

function setDarkmode() {
  buttonLight.classList.remove("displaynone");
  buttonDark.classList.add("displaynone");
  body.classList.add("darkmode");
  localStorage.setItem("theme", "dark");
}

buttonDark.addEventListener("click", () => {
  setDarkmode();
});

buttonLight.addEventListener("click", () => {
  buttonDark.classList.remove("displaynone");
  buttonLight.classList.add("displaynone");
  body.classList.remove("darkmode");
  localStorage.removeItem("theme");
});

document.addEventListener("DOMContentLoaded", () => {
  let tema = localStorage.getItem("theme");
  if (tema != null) {
    setDarkmode();
  }
});


