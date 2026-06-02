
// 1. SELECTORES DEL DOM

const form = document.querySelector('#conversor-form');
const inputNumero = document.querySelector('#input-numero');
const inputBase = document.querySelector('#input-base');
const contenedorResultado = document.querySelector('#contenedor-resultado');
const textoResultado = document.querySelector('#texto-resultado');

// 🆕 NUEVO: Selectores para la dirección de conversión
const radioA6Base10 = document.querySelector('#dir-a-base10');
const radioDesdeBase10 = document.querySelector('#dir-desde-base10');
const labelNumero = document.querySelector('label[for="input-numero"]');
const labelBase = document.querySelector('label[for="input-base"]');


// 2. FUNCIONES LÓGICAS (Funciones Flecha)

/**
 * Convierte un número de una base origen a Base 10.
 */
const deBaseCualquieraABase10 = (numero, base) => parseInt(numero, base);

/**
 * 🆕 NUEVA FUNCIÓN: Convierte un número Base 10 a cualquier otra base.
 * @param {number} decimal - El número en base 10.
 * @param {number} baseDestino - La base a la que se quiere convertir (2-36).
 * @returns {string} - El número convertido en la nueva base.
 */
const deBase10ABaseCualquiera = (decimal, baseDestino) => {
    const numeroDecimal = Number(decimal);
    if (isNaN(numeroDecimal)) return NaN;
    return numeroDecimal.toString(baseDestino).toUpperCase();
};

/**
 * Muestra el resultado visual en la interfaz.
 */
const mostrarResultado = (mensaje, esExito = true) => {
    contenedorResultado.className = "mt-6 p-4 rounded-xl border text-center font-medium block";
    if (esExito) {
        contenedorResultado.classList.add("bg-green-50", "border-green-200", "text-green-800");
    } else {
        contenedorResultado.classList.add("bg-red-50", "border-red-200", "text-red-800");
    }
    textoResultado.textContent = mensaje;
};


// 3. ESCUCHADORES DE EVENTOS (Listeners)

// 🆕 Cambiar dinámicamente los textos de la interfaz según lo que elija el usuario
radioA6Base10.addEventListener('change', () => {
    labelNumero.textContent = "Número de origen";
    labelBase.textContent = "Base de origen";
    contenedorResultado.classList.add('hidden');
});

radioDesdeBase10.addEventListener('change', () => {
    labelNumero.textContent = "Número en Base 10 (Decimal)";
    labelBase.textContent = "Base de destino";
    contenedorResultado.classList.add('hidden');
});

// Escuchador para el envío del formulario
form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const numero = inputNumero.value.trim();
    const base = parseInt(inputBase.value);

    // Validación de campos vacíos
    if (!numero || !base) {
        mostrarResultado("Por favor, rellena todos los campos.", false);
        return;
    }

    // Validación de límites de base
    if (base < 2 || base > 36) {
        mostrarResultado("La base debe estar entre 2 and 36.", false);
        return;
    }

    // Procesar según la dirección seleccionada
    if (radioA6Base10.checked) {
        // Caso 1: Cualquier Base ➡️ Base 10
        const resultado = deBaseCualquieraABase10(numero, base);
        
        if (isNaN(resultado)) {
            mostrarResultado(`El número "${numero}" no es válido para la base ${base}.`, false);
        } else {
            mostrarResultado(`Resultado: ${resultado} (base 10)`, true);
        }
    } else {
        // Caso 2: Base 10 ➡️ Cualquier Base
        const resultado = deBase10ABaseCualquiera(numero, base);
        
        if (isNaN(resultado)) {
            mostrarResultado(`"${numero}" no es un número decimal (Base 10) válido.`, false);
        } else {
            mostrarResultado(`Resultado: ${resultado} (base ${base})`, true);
        }
    }
});
