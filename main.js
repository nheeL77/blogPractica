//ruta de informacion
const jsonurl = "data.json" 

//seleccionamos el contenedor donde se mostraran los articulos
const articulosContainer = document.getElementById("articulos") 

//funcion para obtener y mostrar los datos
async function cargarArticulos() {
    const response = await fetch(jsonurl) 
        if(response.ok != true) {
            alert("Hubo un error en el fetch")
            return false
        } 

        const data = await response.json()
        console.log(data)
}

cargarArticulos();