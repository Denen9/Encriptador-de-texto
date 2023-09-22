const userTextArea = document.querySelector(".user__textarea");
const btnEncriptar = document.querySelector(".user__btn-encriptar");
const btnDesencriptar = document.querySelector(".user__btn-desencriptar");
const resultTextArea = document.querySelector(".result__textarea");
const copy = document.querySelector(".result__copy-btn");
const resultTitle = document.querySelector(".result__title")
const resultImg = document.querySelector(".result__img")


//Validar el texto escrito
const validarTexto = ()=>{
    const i = document.getElementById("i");
    const h6 = document.getElementById("h6");

    let textoEscrito = userTextArea.value;
    let validador = textoEscrito.match(/^[a-z\s]*$/);
    
    if(!validador || validador === 0) {

        i.classList.remove("user-btn-i");
        i.classList.add("user-invalid");
        h6.classList.remove("user__btn-information");
        h6.classList.add("information-invalid");
        userTextArea.classList.add("user__textarea--invalid")
        return true;
    }else {
        i.classList.add("user-btn-i");
        i.classList.remove("user-invalid");
        h6.classList.add("user__btn-information");
        h6.classList.remove("information-invalid");
        userTextArea.classList.remove("user__textarea--invalid")
    }   
}



btnEncriptar.addEventListener('click', ()=>{

    copy.textContent = "Copiar";
    copy.classList.add("result__copy-btn")
    copy.classList.remove("result__copy-btn-ok")

    if(!validarTexto()) {
        const textoEncriptado = encriptar(userTextArea.value)
        valorUsuario = userTextArea.value;
        resultTextArea.value = textoEncriptado;
        userTextArea.value = "";

        resultTitle.classList.add("display-none")
        resultImg.classList.add("display-none")
        resultTextArea.classList.add("display-block")
        copy.classList.add("display-block")

    
    }
});


//Evento para enviar el texto presionando "enter" validando que cumpla las condiciones
userTextArea.addEventListener('keydown', (event)=> {

    const textoEscrito = userTextArea.value;

    if (event.key === "Enter" && textoEscrito.match(/^[a-z\s]*$/)) {
        const textoEncriptado = encriptar(userTextArea.value);
        valorUsuario = userTextArea.value;
        resultTextArea.value = textoEncriptado;
        userTextArea.value = "";
        event.preventDefault()
        resultTitle.classList.add("display-none")
        resultImg.classList.add("display-none")
        resultTextArea.classList.add("display-block")
        copy.classList.add("display-block")
        
    } else {
        validarTexto()
    }

  });

//Funcion para encriptar
const encriptar = (stringEncriptada)=> {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "omes"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase()

    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringEncriptada.includes(matrizCodigo[i][0])){
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])

        }

    }
    return stringEncriptada
}

//Para que el boton encriptar llame a la funcion desencriptar
btnDesencriptar.addEventListener('click', ()=>{
    const textoEncriptado = desencriptar(userTextArea.value);
    resultTextArea.value = textoEncriptado;

})

//Funcion para desencriptar
const desencriptar = (stringDesencriptada)=>{
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "omes"], ["u", "ufat"]] ;
    stringDesencriptada = stringDesencriptada.toLowerCase()

    for(let i = 0; i < matrizCodigo.length; i++){
        if(stringDesencriptada.includes(matrizCodigo[i][1])){
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1] , matrizCodigo[i][0])

        }

    }
    return stringDesencriptada
}


//Funcion para copiar el texto encriptado
function copiar(){
    if(resultTextArea.value == 0){
    } else {
    resultTextArea.select();
    navigator.clipboard.writeText(resultTextArea.value)
    resultTextArea.value = "";
    copy.textContent = "Texto copiado!";
    copy.classList.remove("result__copy-btn")
    copy.classList.add("result__copy-btn-ok")
    }
}


copy.addEventListener('click', copiar);

//Para que solo se pueda leer el resultado
resultTextArea.setAttribute('readonly', 'readonly');


