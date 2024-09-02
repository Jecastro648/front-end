const courseList = document.querySelector("#lista-cursos");
const cartContent = document.querySelector("#lista-carrito tbody")
const btnCartEmpty = document.querySelector("#vaciar-carrito")
const btnDeleteCourse = document.querySelector("#lista-carrito");
let courseArray = [];

eventListener(); 

function eventListener () {
    courseList.addEventListener("click", courseAdd);
    btnCartEmpty.addEventListener("click", emptyCart);
    btnDeleteCourse.addEventListener("click", deleteCourse);
}

// Agrega el curso
function courseAdd(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        selecCourse = e.target.parentElement.parentElement; // Seleciona la card completa del curso
        
        leerDatosCurso(selecCourse); // valida información del curso
    }
}


 //Elimina el curso
 function deleteCourse(e) {

    console.log(e.target);
    if(e.target.classList.contains("borrar-curso")) {
        let courseId = e.target.getAttribute("data-id");
        courseArray = courseArray.filter( (curso) => curso.id !== courseId);
        showHTML();
    }
 }

// Lee los datos del curso
 function leerDatosCurso(curso) {
    
     const objectCourse = {
         img: curso.querySelector("img").src,
         nombre: curso.querySelector("h4").textContent,
         precio: curso.querySelector(".precio span").textContent,
         cantidad: 1,
         id: curso.querySelector("a").getAttribute("data-id")
     };

     const existe = courseArray.some((curso) => curso.id === objectCourse.id); 
     if(existe){
        courseArray.forEach((curso) => {
            if (curso.id === objectCourse.id) {
                curso.cantidad++;
            };
        });
        
     } else {
        courseArray = [...courseArray, objectCourse];     
     };   
     
     showHTML()
 }


 // Muestra el html
 function showHTML() {

    limpiarHtml();
    
    courseArray.forEach( (curso) => {
        const tr = document.createElement("TR")
        tr.innerHTML = `
            <th> <img src="${curso.img}" width="100"> </th>
            <th> <p> ${curso.nombre} </p> </th>
            <th> <p> ${curso.precio} </p> </th>
            <th> <p> ${curso.cantidad} </p> </th>
            <th> <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a> </th>
        `
        cartContent.appendChild(tr);
    }
    )
 }

 //Vaciar carrito 
 function emptyCart(e) {
    e.preventDefault();
    courseArray = [];
    showHTML();
 }


 function limpiarHtml() {
    while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild);
    }
 }

 
setTimeout(() => {
    
}, 3000);