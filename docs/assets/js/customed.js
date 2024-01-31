const miModulo = (() => {
    "use strict";
    const mostrar = ( id ) => {
       let p =  document.querySelector('#'+id);
       let btnLeer = document.querySelector("#leer");
       if( p.style.display == "none"){
           p.style.display = "inline";
           btnLeer.innerHTML = "leer menos"
       }else {
           p.style.display = "none";
           btnLeer.innerHTML = "leer más"
       }
       
    }
    // correo y teléfono
    const copiar = (text, element) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            let mensajeCopiado = document.querySelector(element);
            mensajeCopiado.style.display = 'inline';
            setTimeout(() => {
                mensajeCopiado.style.display = 'none';
            }, 2000);
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles:', err);
        })
    }
    

    const formulario = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('#contactForm input');
    const textarea = document.querySelector('#message');
    const msjErr = document.querySelector('.error-message');
    const msjsuccess= document.querySelector('.sent-message');

    const expresiones = {
        texto: /^.{3,}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    const campos = {
        name: false,
        email: false,
        subject: false,
        message: false,
    }


    const datos = (token)=> {
        return {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            subject: document.querySelector('#subject').value,
            message: document.querySelector('#message').value,
            token: token
        }
    }

  
    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "name":
                validarCampo(expresiones.texto, e.target, 'name');
            break;
            case "email":
                validarCampo(expresiones.correo, e.target, 'email');
            break;
            case "subject":
                validarCampo(expresiones.texto, e.target, 'subject');
            break;

        }
    }

    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)){
            document.getElementById(`${campo}`).classList.remove('is-invalid');
            campos[campo] = true;
        } else {
            document.getElementById(`${campo}`).classList.add('is-invalid');
            campos[campo] = false;
        }
    }
    const validarTextarea = () => {
        if(expresiones.texto.test(textarea.value)){
            textarea.classList.remove('is-invalid');
            campos.message = true;
        } else {
            textarea.classList.add('is-invalid');
            campos.message = false;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });
    textarea.addEventListener('keyup', validarTextarea);
    textarea.addEventListener('blur', validarTextarea);
    
   

    const onSubmit= async (token)=>{
        if(campos.name && campos.email && campos.subject && campos.message &&  grecaptcha.getResponse() != '' ){
            const response = await fetch("https://ia087os9xb.execute-api.us-east-2.amazonaws.com/contacts", {
                mode: 'no-cors',
                method: "POST",
                headers: {
                     "Content-Type": "application/json"
                },        
                body: JSON.stringify(datos(token)),
              })
              .then(response => {
                msjErr.style.display = 'none';
                msjsuccess.style.display = 'block';
                setTimeout(function() {
                    msjsuccess.style.display = 'none';
                }, 4000); 
                formulario.reset();
              })
              .catch(err => {
                msjErr.style.display = 'Algo salió mal. Contactese con el administrador';
              });
        }else {
            msjErr.style.display = 'block';
            msjErr.innerHTML = 'Completa todos los campos';
        }
    }

    return {
        mostrar: mostrar,
        copiar: copiar,
        onSubmit: onSubmit,
    };

})()