const miModulo = (() => {
    "use strict";
    const mostar = ( id ) => {
       let p =  document.querySelector('#'+id);
       let btnLeer = document.querySelector("#leer")
       console.log({btnLeer});
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
                console.log('Texto copiado al portapapeles');
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


    return {
        mostrar: mostar,
        copiar: copiar
    };
})()