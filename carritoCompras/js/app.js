// Variables.

const submenu = document.querySelector(".submenu");

const carrito = document.querySelector("#carrito");

const carritoList1 = document.querySelector("#lista-carrito");

const carritoList = document.querySelector("#lista-carrito tbody");

const closeBtn = document.querySelector("#vaciar-carrito");

const cursosList = document.querySelector("#lista-cursos");

let articulosCarrito = [];

eventListeners();

function eventListeners() {
  // Agrega un curso dando click en "Agregar al Carrito"
  cursosList.addEventListener("click", agregarCursos);


  //Vaciar carrito de compras
  closeBtn.addEventListener("click", () => {
    articulosCarrito = []; // Resetea el carrito
    limpiarHtml(); // imprime el HMTL limpio
  });


  //Elimina cursos de carrito 
  carrito.addEventListener("click", eliminarCurso);


  //Muestra el carrito de compras dando lick en la imagen
   let icon_car = document.querySelector("#img-carrito");

   icon_car.addEventListener("click", (e) => {
     if (carrito.classList.contains("carrito-mostrar")) {
       carrito.classList.remove("carrito-mostrar");
     } else {
       carrito.classList.add("carrito-mostrar");
     }
   });


  
 }


// Mostrar carrito
//    submenu.addEventListener("click", (e) => {
//      console.log(e.target.getAttribute("id"));
//      if (e.target.getAttribute("id") === "img-carrito") {
//        if (carrito.classList.contains("carrito-mostrar")) {
//          carrito.classList.remove("carrito-ocultar");
//          carrito.classList.add("carrito-mostrar");
//        } else {
//          carrito.classList.add("carrito-ocultar");
//          carrito.classList.remove("carrito-mostrar");
//        }
//      }
//    });
//  }

//Funciones

function agregarCursos(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    cursoSelec = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSelec);
  }
}

function eliminarCurso(e) {
     e.preventDefault();
     if (e.target.classList.contains("borrar-curso")) {
      let cursoId = e.target.getAttribute("data-id");
      articulosCarrito = articulosCarrito.filter( (curso) => curso.id !== cursoId);
      carritoHtml();
      }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso

function leerDatosCurso(curso) {
  const cursoInfo = {
    img: curso.querySelector(".imagen-curso").src,
    title: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe
  const existe = articulosCarrito.some((curso) => curso.id === cursoInfo.id);
  if (existe) {
    // actualizamos la cantidad
    const cursos = articulosCarrito.map((articulo) => {
      if (articulo.id === cursoInfo.id) {
        articulo.cantidad++;
        return articulo; // Retorna el objeto actualizado
      } else {
        return articulo; // retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, cursoInfo];
  }

  carritoHtml();
}

// Muestra el carrito de compras en el HTML

function carritoHtml() {
  //limpia el html del carrito para no tener duplicados
  limpiarHtml();

  // Recorre el carrito y genera HTML con la información del curso
  articulosCarrito.forEach((info) => {
    const articulo = document.createElement("tr");
    articulo.innerHTML = `
            <td>
                <img src ="${info.img}" width = "100">
            </td>
            <td>
                <p>${info.title}</p>
            </td>
            <td>
                <p>${info.precio}</p>
            </td>
            <td>
                <p>${info.cantidad}</p>
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${info.id}"> X </a>
            </td>
        `;
    // Agrega el HTML del carrito en el tbody
    carritoList.appendChild(articulo);
  });
  console.log(articulosCarrito);
}

function limpiarHtml() {
  // Forma lenta - menos performance
  // carritoList.innerHTML = " ";

  // Elimina los cursos del tbody
  while (carritoList.firstChild) {
    carritoList.removeChild(carritoList.firstChild);
  }
}

// Nota:
// 1. normalmente los elementos HTML van a ser const ya que no se reasignan
