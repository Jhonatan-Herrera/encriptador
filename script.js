// Reglas de encriptación y desencriptación
const ENCRYPTION_RULES = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const DECRYPTION_RULES = Object.fromEntries(
    Object.entries(ENCRYPTION_RULES).map(([key, value]) => [value, key])
);

// Selectores del DOM
const textoEntrada = document.getElementById('texto-entrada');
const textoSalida = document.getElementById('texto-salida');
const encriptarBtn = document.getElementById('encriptar-btn');
const desencriptarBtn = document.getElementById('desencriptar-btn');
const copiarBtn = document.getElementById('copiar-btn');
const emptyState = document.querySelector(".encrypt__section2__empty-state");

// Función para encriptar texto
function encriptar(texto) {
    return texto.split('')
        .map(char => ENCRYPTION_RULES[char] || char)
        .join('');
}

// Función para desencriptar texto
function desencriptar(texto) {
    // Ordenar reglas de desencriptación por longitud descendente
    const sortedRules = Object.entries(DECRYPTION_RULES).sort((a, b) => b[0].length - a[0].length);

    return sortedRules.reduce((result, [key, value]) => result.split(key).join(value), texto);
}

// Validar texto: solo letras minúsculas y espacios
function validarTexto(texto) {
    return /^[a-z\s]+$/.test(texto);
}

// Actualizar estado de visibilidad
function actualizarEstado() {
    const isEmpty = textoSalida.value.trim() === '';
    emptyState.style.display = isEmpty ? 'flex' : 'none';
    copiarBtn.style.display = isEmpty ? 'none' : 'block';
}

// Manejar clic en el botón de encriptar
function manejarEncriptar() {
    const texto = textoEntrada.value;
    if (validarTexto(texto)) {
        textoSalida.value = encriptar(texto);
        actualizarEstado();
    } else {
        alert('Por favor, ingresa solo letras minúsculas y espacios.');
    }
}

// Manejar clic en el botón de desencriptar
function manejarDesencriptar() {
    const texto = textoEntrada.value;
    if (validarTexto(texto)) {
        textoSalida.value = desencriptar(texto);
        actualizarEstado();
    } else {
        alert('Por favor, ingresa solo letras minúsculas y espacios.');
    }
}

// Manejar clic en el botón de copiar
function manejarCopiar() {
    navigator.clipboard.writeText(textoSalida.value)
        .then(() => console.log('Texto copiado al portapapeles'))
        .catch(err => console.error('Error al copiar al portapapeles:', err));
}

// Agregar eventos a los botones
encriptarBtn.addEventListener('click', manejarEncriptar);
desencriptarBtn.addEventListener('click', manejarDesencriptar);
copiarBtn.addEventListener('click', manejarCopiar);