const nombreInput = document.getElementById("nombre")
const textInput = document.getElementById("texto")
const btnGenerar = document.getElementById("btn-generar")
const btnDescargar = document.getElementById("btn-descargar")
const canvas = document.getElementById("qrcode")


function validarCampo(){
    const nombreValido = nombreInput.value.trim() !== "";
    const textValido = textInput.value.trim() !== "";
    btnGenerar.disabled = !(nombreValido && textValido)
}

nombreInput.addEventListener('input', validarCampo);
textInput.addEventListener('input', validarCampo);

function generarQR(){
    const texto = textInput.value.trim()
    const color = document.querySelector('input[name="color"]:checked').value;
    if(!texto) return;

    QRCode.toCanvas(canvas, texto, {
        color:{
            dark: color,
            light:'#ffffff'

        },
        width: 200,
        margin: 2
    }, function (error) {
        if(error) console.error(error);
        else {
            btnDescargar.disabled = false
        }
    })
}


function descargarQR(){
    const enlace = document.createElement('a');
    const nombreQR = nombreInput.value.trim () || 'qrcode';
    enlace.href = canvas.toDataURL('image/png');
    enlace.download = `${nombreQR}.png`;
    enlace.click();
}

function reiniciarFormulario() {
    nombreInput.value = '';
    textInput.value = '';
    document.querySelector('input[name="color"][value="#000000"]').checked = true;

    const contexto = canvas.getContext('2d');
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    btnGenerar.disabled = true;
    btnDescargar.disabled = true;
    nombreInput.focus();
}


