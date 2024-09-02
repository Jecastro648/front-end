document.addEventListener("DOMContentLoaded", () => { // Este evento espera que cargue todo el documento HTML y este listo para ejecutarse

    // Objeto correo
    const correo = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    //Seleccionar los elementos de la interfaz:
    const email = document.querySelector("#email");
    const subject = document.querySelector("#asunto");
    const message = document.querySelector("#mensaje");
    const form = document.querySelector("#formulario");
    const btnSubmit = document.querySelector("#formulario button[type=submit]");
    const btnReset = document.querySelector("#formulario button[type=reset]");
    const spinner = document.querySelector("#spinner");


    //Asignar eventos
    email.addEventListener("input", validar);
    subject.addEventListener("input", validar);
    message.addEventListener("input", validar);

    btnReset.addEventListener("click", e => {
        e.preventDefault();

        resetCorreo();
        
        limpiarHtml(e.target.parentElement.parentElement);
    });

    form.addEventListener("submit", enviarCorreo);


    function enviarCorreo(e) {
        e.preventDefault();
        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");

            const alertExito = document.createElement("P");

            alertExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "m-10", "font-blod", "text-sm", "uppercase");

            alertExito.textContent = "Mensaje enviado correctamente";

            form.appendChild(alertExito);

            setTimeout(() => {
                alertExito.remove();
                resetCorreo()
            }, 2000);

        }, 3000);

        
    }


    function validar(e) {   
        if (e.target.value.trim() === "") {
            showAlert(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            correo[e.target.id] = e.target.value.trim().toLowerCase();
            //console.log(correo);
            comprobarCorreo()
            return; // detiene la ejecución del codigo si no seguiria ejecutando
        } 

        if(e.target.id === "email" && !validarEmail(e.target.value)) {
            showAlert(`El ${e.target.id} no es valido`, e.target.parentElement);
            correo[e.target.id] = "";
            //console.log(correo);
            comprobarCorreo()
            return;
        }

        limpiarHtml(e.target.parentElement);

        //Aigna los valores al objeto correo
        correo[e.target.id] = e.target.value.trim().toLowerCase();

        comprobarCorreo();
        //console.log(correo);
    }

    function showAlert(mensaje, referencia) {

        limpiarHtml(referencia);

        //Crea el elemento HTML de la alerta
        const error = document.createElement("p");
        error.textContent = mensaje;
        error.classList.add("text-red", "text-center", "alerta")
        

        //Inyecta la alerta al formulario teniendo en cuenta la referencia
        referencia.appendChild(error); // Lo agrega al final del div de cada input

        // formulario.innerHTML = error.innerHTML; // Este nos muestra el mensaje pero borra todo los que tenga el contenedor que en este caso son los inputs y labels del formulario
    }

    function limpiarHtml(referencia) {

        while (referencia.querySelector(".alerta")) {
            const alerta = referencia.querySelector(".alerta");
            if (alerta) {
                alerta.remove();
            }
        }
       
    }
    
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email); // Este metodo nos arroja un true si cumple con la comparacion del valor que en este caso en el email con la expresión regular si no cumple es un false
        return resultado;
    }

    function comprobarCorreo() {
        //console.log(Object.values(correo).includes(""))
        if (Object.values(correo).includes("")) {
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove("opacity-50");
            btnSubmit.disabled = false;
        }
    }
   
    function resetCorreo() {
        correo.email = "";
        correo.asunto = "";
        correo.mensaje = "";

        formulario.reset();
        comprobarCorreo();
    }
})



// Glosario:
// CSS talwind - utilidades: son clases con ciertas propiedades ya definidas 
// Expresión regular: Busca un patron en una cadena de texto o una cadena de numeros. Ejemplo: expresión regular para emails en js.