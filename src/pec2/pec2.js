// --------------------------------------------------------------------------------
// EXERCISE 1
// --------------------------------------------------------------------------------
/** 
 * Genera una contraseña aleatoria basada en los criterios especificados en el objeto options.
 * 
 * @param {Object} options Objeto con las propiedades opcionales: uppercase, lowercase, numbers, symbols.
 * @returns {string} Contraseña generada.
*/
export function generatePassword(options) {

    // El parámetro options debe ser un objeto válido (no null).
    if (typeof options != "object" || options == null) throw new Error("Options must be an object");

    // Objeto con las siguientes propiedades opcionales (todas ellas deben tener valor por defecto = 1).
    const counts = {
        uppercase: options.uppercase != undefined ? options.uppercase : 1,
        lowercase: options.lowercase != undefined ? options.lowercase : 1,
        numbers: options.numbers != undefined ? options.numbers : 1,
        symbols: options.symbols != undefined ? options.symbols : 1
    };

    // Todos los contadores deben ser números no negativos.
    const keys = ["uppercase", "lowercase", "numbers", "symbols"];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]; //La "palabra" de counts.
        const value = counts[key]; //El valor obtenido a través de la palabra.

        if (typeof value != "number" || value < 0) throw new Error(`${key} count must be a non-negative number`);
    }

    // La longitud debe estar entre 4 y 128 caracteres.
    const propertiesLength = counts.uppercase + counts.lowercase + counts.numbers + counts.symbols;
    
    if (propertiesLength < 4 || propertiesLength > 128) throw new Error("Length must be a number between 4 and 128");

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const sym = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    /** 
     * Genera una contraseña aleatoria para un único tipo de propiedad y su contador.
     * 
     * @param {string} type Cadena de carácteres sobre la que escoger carácteres randoms.
     * @param {number} count Número de carácteres a añadir del tipo "type".
     * @returns {string} Contraseña de carácteres de un tipo.
    */
    function randomTypeFormer(type, count) {
        let res = "";
        for (let i = 0; i < count; i++) {
            const pos = Math.floor(Math.random() * type.length);
            res += type.charAt(pos);
        }
        return res;
    }

    let password = randomTypeFormer(upper, counts.uppercase) + randomTypeFormer(lower, counts.lowercase) +
                   randomTypeFormer(nums, counts.numbers) + randomTypeFormer(sym, counts.symbols)

    // Dividir el "password" formado en carácteres individuales.
    let array = password.split("");

    // Mezcla aleatoriamente el "password" de carácteres individuales.
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        let aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }

    // Une los carácteres individuales para formar el password final a retornar. 
    return array.join("");
}


/** 
 * Genera una espiral formada por los caracteres █ (bloque sólido) y espacios en blanco.
 * 
 * @param {number} n Número de "vueltas" de la espiral.
 * @returns {[string]} Array de strings, donde cada string representa una fila de la espiral.
*/
// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------
export function generateSpiral(n) {

    let size = 2*n + 1;
    let array = [];

    // Primero de todo, creamos al matriz resultado vacía a partir del tamaño (para después solamente rellenar los █).
    for (let i = 0; i < size; i++) {
        array[i] = [];
        for (let j = 0; j < size; j++) {
            array[i][j] = " ";
        }
    }

    // Recorremos las vueltas que da la espiral (formando 1 cuadrado por vuelta con sus 4 lados).
    for (let lap = 0; lap < n; lap++) {
        let start = lap * 2;
        let end = size - 1 - (lap * 2);

        // Lado de arriba (dibujamos de izquierda a derecha, es decir, manteniendo la row (start) pero editando la column (j)).
        for (let j = start; j <= end; j++) {
            array[start][j] = "█";
        }

        // Lado derecho (dibujamos de arriba a bajo, es decir, manteniendo la column (end) pero editando la row (i)).
        for (let i = start; i <= end; i++) {
            array[i][end] = "█";
        }

        // Lado de abajo (dibujamos de derecha a izquierda, es decir, manteniendo la row (end) pero editando la column (j)).
        for (let j = end; j >= start; j--) {
            array[end][j] = "█";
        }

        // Lado izquierdo (dibujamos de abajo a arriba, es decir, manteniendo la column (start) pero editando la row (i)).
        // Esta vez lo hacemos hasta start + 2, ya que en el enunciado nos piden "un separador de un espacio en blanco" para cada vuelta.
        for (let i = end; i >= start + 2; i--) {
            array[i][start] = "█";
        }

    }

    let res = [];

    for (let i = 0; i < size; i++) res[i] = array[i].join("");
    
    return res;

}

// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
export class LibraryItem {

}

export class Book {
  
}

export class BookUnit {
  
}

export class User {
 
}

export class Loan {
  
}

// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
export class Library {

}

// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
export function Movie() {

}