'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // ---------- REFERENCIA A ELEMENTOS DEL DOM ----------
    const passwordElem = document.querySelector('#password'); 
    const copyPasswordElem = document.querySelector('#copyPassword')

    const passwordLengthInputElem = document.querySelector('#password-length');
    const passwordLengthSpanElem = document.querySelector('.password-length-value');
    let longitudContrasena = 6;

    const uppercaseCheckBox = document.querySelector('#uppercase');
    const lowercaseCheckBox = document.querySelector('#lowercase');
    const numbersCheckBox = document.querySelector('#numbers');
    const symbolsCheckBox = document.querySelector('#symbols');

    const strengthTextElem = document.querySelector('#strength-text');
    const strengthSquaresElem = document.querySelectorAll('.strength-square');

    const genPasswordBtn = document.querySelector('#genPasswordBtn');

    // CONSTANTES DE CARACTERES A USAR PARA GENERAR LAS CONTRASEÑAS
    const upperPassword = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerPassword = 'abcdefghijklmnopqrstuvwxyz';
    const numberPassword = '0123456789';
    const symbolPassword = `!"#$%&'()*+,-./:;<=>?@[]^_{|}~`;

    // ---------- FUNCIÓN PARA COPIAR LA CONTRASEÑA GENERADA ----------
    copyPasswordElem.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordElem.textContent);

        Swal.fire({
            icon: 'info',
            title: 'Contraseña copiada al portapapeles',
            position: "top",
            showConfirmButton: false, 
            timer: 3000, 
            toast: true, 
            timerProgressBar: true,
            width: '430px'
        });
    });

    // ---------- FUNCIÓN PARA CAMBIAR ASPECTOS EN BASE AL LENGTH DEL PASSWORD ----------
    passwordLengthInputElem.addEventListener('input', (e) => {
        // Obtener la longitud de la contraseña
        const valorLongitud = e.target.value;

        // Colocar el valor de la longitud de la contraseña en la variable y en el DOM
        longitudContrasena = valorLongitud;
        passwordLengthSpanElem.textContent = valorLongitud
    });


    // ---------- FUNCIÓN PARA GENERAR LA CONTRASEÑA ----------
    genPasswordBtn.addEventListener('click', () => {
        const uppercase = uppercaseCheckBox.checked;
        const lowercase = lowercaseCheckBox.checked;
        const numbers = numbersCheckBox.checked;
        const symbols = symbolsCheckBox.checked;

        // Determinar si no se seleccionó ninguna opción
        if(!uppercase && !lowercase && !numbers && !symbols){
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Debe de seleccionar al menos una opción para generar la contraseña'
            });
        }else{
            // Asignar a una variable los caracteres que se usarán para generar la contraseña
            const caracteres = `${(uppercase) ? upperPassword : '' }${(lowercase) ? lowerPassword : '' }${(numbers) ? numberPassword : '' }${(symbols) ? symbolPassword : '' }`;
            let contraseña = '';

            const cantidadOpciones = ( (uppercase) ? 1 : 0 ) + 
            ( (lowercase) ? 1 : 0 ) + 
            ( (numbers) ? 1 : 0 ) + 
            ( (symbols) ? 1 : 0 );
            
            // Generar la contraseña
            for(let i = 1; i <= longitudContrasena; i++){
                const numeroDeCaracter = Math.floor(Math.random() * caracteres.length);
                const caracterAleatorio = caracteres[numeroDeCaracter];

                contraseña += caracterAleatorio;
            }

            // Mostrar la contraseña generada en el DOM
            passwordElem.textContent = contraseña;

            // Determinar si la contraseña generada es Muy Débil, Débil, Media y Fuerte
            if(cantidadOpciones === 1 ){
                if(longitudContrasena <= 10){
                    strengthTextElem.textContent = 'VERY WEAK';
                    rellenarCuadrados(strengthSquaresElem, 1);
                    
                } else {
                    strengthTextElem.textContent = 'WEAK';
                    rellenarCuadrados(strengthSquaresElem, 2);
                }   
            }else if(cantidadOpciones === 2) {
                if(longitudContrasena <= 13){
                    strengthTextElem.textContent = 'WEAK';
                    rellenarCuadrados(strengthSquaresElem, 2);
                    
                } else {
                    strengthTextElem.textContent = 'MEDIUM';
                    rellenarCuadrados(strengthSquaresElem, 3);
                }   
            }else if(cantidadOpciones === 3) {
                if(longitudContrasena <= 13){
                    strengthTextElem.textContent = 'MEDIUM';
                    rellenarCuadrados(strengthSquaresElem, 3);
                    
                } else {
                    strengthTextElem.textContent = 'STRONG';
                    rellenarCuadrados(strengthSquaresElem, 4);
                }  
            }else if(cantidadOpciones === 4){
                if(longitudContrasena <= 8){
                    strengthTextElem.textContent = 'MEDIUM';
                    rellenarCuadrados(strengthSquaresElem,3);
                    
                } else {
                    strengthTextElem.textContent = 'STRONG';
                    rellenarCuadrados(strengthSquaresElem, 4);
                }  
            }

        }
        
    });

})

function rellenarCuadrados(elementosSquare, cantidadRellenos) {
    elementosSquare.forEach((square, indice) => {
        square.style.backgroundColor = (indice < cantidadRellenos) ? 'var(--strengthColor)' : 'transparent';
    });
}
