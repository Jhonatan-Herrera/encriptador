// Variables para las reglas de encriptación
const encriptacion = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const desencriptacion = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
};

// Selectores del DOM
const textoEntrada = document.getElementById('texto-entrada');
const textoSalida = document.getElementById('texto-salida');
const encriptarBtn = document.getElementById('encriptar-btn');
const desencriptarBtn = document.getElementById('desencriptar-btn');
const copiarBtn = document.getElementById('copiar-btn');

// Función para encriptar texto
function encriptar(texto) {
    return texto.split('').map(c => encriptacion[c] || c).join('');
}

// Función para desencriptar texto
function desencriptar(texto) {
    let resultado = texto;
    // Asegurarse de que las reglas más largas se procesen primero
    const ordenDesencriptacion = Object.entries(desencriptacion).sort((a, b) => b[0].length - a[0].length);

    for (const [clave, valor] of ordenDesencriptacion) {
        resultado = resultado.split(clave).join(valor);
    }
    return resultado;
}

// Validar texto: solo letras minúsculas y espacios
function validarTexto(texto) {
    const regex = /^[a-z\s]+$/; // Permite letras minúsculas y espacios
    return regex.test(texto);
}

// Encriptar texto cuando se hace clic en el botón de encriptar
encriptarBtn.addEventListener('click', () => {
    const texto = textoEntrada.value;
    if (validarTexto(texto)) {
        textoSalida.value = encriptar(texto);
    } else {
        alert('Por favor, ingresa solo letras minúsculas y espacios.');
    }
});

// Desencriptar texto cuando se hace clic en el botón de desencriptar
desencriptarBtn.addEventListener('click', () => {
    const texto = textoEntrada.value;
    if (validarTexto(texto)) {
        textoSalida.value = desencriptar(texto);
    } else {
        alert('Por favor, ingresa solo letras minúsculas y espacios.');
    }
});

// Copiar el texto al portapapeles cuando se hace clic en el botón de copiar
copiarBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(textoSalida.value).then(() => {
        console.log('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
});