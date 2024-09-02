document.addEventListener("DOMContentLoaded", function () {
    
    // Se crea Objeto
    const correo = {
        name: "",
        email: "",
        password: ""
    }

    // Seleccionar elementos del HTML
    const inputName = document.querySelector("#name");
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const form = document.querySelector("#form");
    const formRegister = document.querySelector(".form__register");
    const btnSubmit = document.querySelector("#form input[type=submit]");
    const spinner = document.querySelector("#spinner");

    // Eventos
    inputEmail.addEventListener("input", validar);
    inputName.addEventListener("input", validar);
    inputPassword.addEventListener("input", validar);

    form.addEventListener("submit", enviarCorreo)

    function enviarCorreo(e) {
        e.preventDefault()
        resetForm();

        spinner.classList.add("spinner");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.add("hidden");
            spinner.classList.remove("spinner");

            const alertGreen = document.createElement("P");
            alertGreen.classList.add("alertGreen")
            alertGreen.textContent = "Mensaje enviado correctamente";

            formRegister.appendChild(alertGreen);

            setTimeout(() => {
                alertGreen.remove();
                
            }, 2000);

        }, 3000);
    }

    function validar(e) {
        
        if (e.target.value.trim() === "") {
            showAlert(`El campo ${e.target.id} esta vacio`, e.target.parentElement)
            correo[e.target.id] = "";
            comprobarCorreo();
            return;
        } 

        if(e.target.id === "email" && !validarEmail(e.target.value)) { // El signo ! niega la condición osea que para que se cumpla tiene que ser false
            showAlert(`El ${e.target.id} no es valido`, e.target.parentElement);
            correo[e.target.id] = "";
            comprobarCorreo()
            console.log(correo)
            return;
        }

        //Asigna los valores al objeto
        correo[e.target.id] = e.target.value.trim().toLowerCase();
        console.log(correo)
        limpiarHTML(e.target.parentElement);
        comprobarCorreo()
    }

    function showAlert(mensaje, referencia) {

        limpiarHTML(referencia);

        const alert = document.createElement("P");
        alert.classList.add("alert")
        alert.textContent = mensaje;

        referencia.appendChild(alert);
    }

    function limpiarHTML(referencia) {
        
        while (referencia.querySelector(".alert")) {
            const alerta = referencia.querySelector(".alert");
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

    function resetForm() {

        correo.email = "";
        correo.name = "";
        correo.password = "";

        form.reset();
        comprobarCorreo();
    }
       
})