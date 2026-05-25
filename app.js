const nombreInput = document.getElementById("nombre");
const textInput = document.getElementById("texto");
const btnGenerar = document.getElementById("btn-generar");
const btnDescargar = document.getElementById("btn-descargar");
const canvas = document.getElementById("qrcode");
const qrContainer = document.getElementById("qr-container-wrapper");
const qrBadgeText = document.getElementById("qr-badge-text");

function validarCampo() {
    const nombreValido = nombreInput.value.trim() !== "";
    const textValido = textInput.value.trim() !== "";
    btnGenerar.disabled = !(nombreValido && textValido);
}

nombreInput.addEventListener('input', validarCampo);
textInput.addEventListener('input', validarCampo);

function generarQR() {
    const texto = textInput.value.trim();
    const color = document.querySelector('input[name="color"]:checked').value;
    if (!texto) return;

    // Generar el código QR con un tamaño mayor para mejor resolución al descargar
    QRCode.toCanvas(canvas, texto, {
        color: {
            dark: color,
            light: '#ffffff'
        },
        width: 300,
        margin: 2
    }, function (error) {
        if (error) {
            console.error(error);
        } else {
            btnDescargar.disabled = false;
            // Activar la animación de escaneo y cambiar el estado
            qrContainer.classList.add("has-qr");
            qrBadgeText.textContent = "Listo para escanear";
        }
    });
}

function descargarQR() {
    const enlace = document.createElement('a');
    const nombreQR = nombreInput.value.trim() || 'qrcode';
    enlace.href = canvas.toDataURL('image/png');
    enlace.download = `${nombreQR}.png`;
    enlace.click();
}

function reiniciarFormulario() {
    nombreInput.value = '';
    textInput.value = '';
    
    // Resetear al color negro por defecto
    const defaultColor = document.querySelector('input[name="color"][value="#000000"]');
    if (defaultColor) defaultColor.checked = true;

    // Limpiar canvas
    const contexto = canvas.getContext('2d');
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // Desactivar clases y textos de estado
    qrContainer.classList.remove("has-qr");
    qrBadgeText.textContent = "Esperando datos";

    // Resetear botones y focus
    btnGenerar.disabled = true;
    btnDescargar.disabled = true;
    nombreInput.focus();
}
