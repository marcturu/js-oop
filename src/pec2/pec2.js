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

        if (typeof value != "number" || value < 0) throw new Error(`${key.charAt(0).toUpperCase() + key.slice(1)} count must be a non-negative number`); //Passar el primer carácter de uppercase a mayúscula
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

    let size = 2 * n + 1;
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

        if (start > end) break;

        // Lado superior (dibujamos de izquierda a derecha, es decir, manteniendo la row (start) pero editando la column (j)).
        if (lap === 0) {
            for (let j = start; j <= end; j++) {
                array[start][j] = "█";
            }
        } else {
            for (let j = 0; j <= end; j++) {
                if (array[start][j] === " ") {
                    array[start][j] = "█"
                }
            }
        }
        
        // Lado derecho (dibujamos de arriba a bajo, es decir, manteniendo la column (end) pero editando la row (i)).
        for (let i = start + 1; i <= end; i++) {
            array[i][end] = "█";
        }

        // Lado inferior (dibujamos de derecha a izquierda, es decir, manteniendo la row (end) pero editando la column (j)).
        for (let j = end; j >= start; j--) {
            array[end][j] = "█";
        }

        // Lado izquierdo (dibujamos de abajo a arriba, es decir, manteniendo la column (start) pero editando la row (i)).
        // De end - 1 hasta start + 2 para dejar el hueco de la espiral de cada vuelta
        for (let i = end - 1; i >= start; i--) {
            if (i != start + 1) {
                array[i][start] = "█";
            }
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
    constructor(id, title) {
        if (this.constructor == LibraryItem) throw new Error("Cannot instantiate abstract class LibraryItem directly"); // Si se intenta instanciar directamente.
        this.id = id;
        this.title = title;
    }

    info() {
        return `Id: ${this.id}. Title: ${this.title}`;
    }
}

export class Book extends LibraryItem {
    constructor(id, title, author) {
        super(id, title);
        this.author = author;
        this.units = [];
    }

    addUnit(unitId, condition) {
        let exists = this.getUnitById(unitId);
        if (exists) throw new Error(`Unit with id ${unitId} already exists`); // Ya existe una copia con el mismo id.
        
        let bookUnit = new BookUnit(unitId, this, condition);
        this.units.push(bookUnit);
        return bookUnit; // Devuelve la nueva instancia.
    }

    removeUnit(unitId) {
        let unit = this.getUnitById(unitId);
        if (!unit) throw new Error("Unit not found"); // No existe.

        if (unit.status != "available") throw new Error("Cannot remove unit that is not available"); // La copia no está disponible.

        // Elimina una copia por su id.
        let unitsAux = [];
        for (let i = 0; i < this.units.length; i++) if (this.units[i].unitId !== unitId) unitsAux.push(this.units[i]);
        this.units = unitsAux;

        return unit; // Devuelve la unidad eliminada.
    }

    get totalUnits() {
        return this.units.length;
    }

    // Se podría hacer con .filter.
    get availableUnits() {
        let num = 0;
        for (let i = 0; i < this.units.length; ++i) if (this.units[i].status === "available") num++;
        return num;
    }

    // Se podría hacer con .filter.
    get borrowedUnits() {
        let num = 0;
        for (let i = 0; i < this.units.length; ++i) if (this.units[i].status === "borrowed") num++;
        return num;
    }

    // Se podría hacer con .filter.
    get maintenanceUnits() {
        let num = 0;
        for (let i = 0; i < this.units.length; ++i) if (this.units[i].status === "maintenance") num++;
        return num;
    }

    getAvailableUnit() {
        for(let i = 0; i < this.units.length; i++) {
            if (this.units[i].status === "available") return this.units[i]; // Devuelve la primera copia disponible.
        }
        return undefined; //No hay ninguna copia con status "available".
    }

    // Se podría hacer con .filter.
    getUnitById(unitId) {
        for(let i = 0; i < this.units.length; i++) {
            if (this.units[i].unitId === unitId) return this.units[i];
        }
        return undefined; //No hay ninguna copia con la unitId pasada por parámetro.
    }

    info() {
        return `Id: ${this.id}. Title: ${this.title}. Author: ${this.author}. Units: ${this.availableUnits}/${this.totalUnits} available.`
    }

}

export class BookUnit extends LibraryItem {
    constructor(unitId, book, condition) {
        super(book.id + "-" + unitId, book.title);
        this.unitId = unitId;
        this.book = book; 
        this.condition = condition ? condition : "good";
        this.status = "available";
    }

    isAvailable() {
        return this.status === "available";
    }

    isConditionGoodOrFair() {
        return this.condition === "good" || this.condition === "fair";
    }

    isAvailableForBorrow() {
        return this.isAvailable() && this.isConditionGoodOrFair();
    }

    borrowUnit() {
        try {
            if (!this.isAvailableForBorrow()) throw "error"; // No se cumple que: la copia esté disponible y además se encuentre en condiciones aceptables.
            this.status = "borrowed";

        } catch (e) {
            throw new Error(`Unit ${this.unitId} is not available for borrow (Status: ${this.status}. Condition: ${this.condition})`);
        }
    }

    returnUnit(newCondition) {
        try {
            if (this.status != "borrowed") throw "error"; // El estado no es borrowed.
            if (newCondition) this.condition = newCondition; // Actualiza la condición si esta se pasa por parámetro.
        } catch (e) {
            throw new Error(`Unit ${this.unitId} is not borrowed (Status: ${this.status})`);
        }

        this.status = this.isConditionGoodOrFair() ? "available" : "maintenance"; // El estado pasa a available si la condición es buena (good o fair). En caso contrario, pasa a maintenance.
    }

    maintenanceUnit(newCondition) {
        try {
            if (this.status != "maintenance") throw "error"; // El estado no es maintenance.
            if (newCondition) this.condition = newCondition; // Actualiza la condición si esta se pasa por parámetro.
        } catch (e) {
            throw new Error(`Unit ${this.unitId} is not in maintenance`);
        }

        this.status = this.isConditionGoodOrFair() ? "available" : "maintenance"; // El estado pasa a available si la condición es buena (good o fair). En caso contrario, pasa a maintenance.
    }

    updateConditionAndStatus(newCondition) {
        if (newCondition) this.condition = newCondition; // Actualiza la condición si esta se pasa por parámetro. Por defecto, la nueva condición serà nula.
        
        this.status = this.isConditionGoodOrFair() ? "available" : "maintenance"; // El estado pasa a available si la condición es buena (good o fair). En caso contrario, pasa a maintenance.
    }

    info() {
        return `Id: ${this.unitId}, BookId: ${this.book.id}, Status: ${this.status}, Condition: ${this.condition}`
    }
  
}

export class User {
    constructor(idUser, name) {
        this.idUser = idUser; 
        this.name = name;
        this.active = true;
    }

    updateName(newName) {
        this.name = newName;
    }

    deactivate() {
        this.active = false;
    }

    activate() {
        this.active = true;
    }

    info() {
        let activeYN = this.active ? "Yes" : "No" // Transformar el valor booleano a string para el return.
        return `Id user: ${this.idUser}. Name: ${this.name}. Active: ${activeYN}`;
    }
}

export class Loan {
    constructor(idLoan, user, bookUnit) {
        if (!bookUnit.isAvailableForBorrow()) throw new Error(`BookUnit ${bookUnit.unitId} is not available for loan.`); // Valida que la copia esté disponible para préstamo.
        
        this.idLoan = idLoan;
        this.user = user;
        this.bookUnit = bookUnit;
        this.loanDate = new Date();
        this.returnDate = null;
        this.returned = false;

        bookUnit.borrowUnit(); // Marca la copia como prestada.
    }

    returnLoan(newCondition) {
        if (this.returned) throw new Error(`BookUnit ${this.bookUnit.unitId} is not available for loan.`); // Ya está devuelto.

        this.bookUnit.returnUnit(newCondition);
        this.returnDate = new Date(); // Establece la fecha de devolución a la fecha actual.
        this.returned = true; // Marca el préstamo como devuelto.
    }

    info() {
        let returnedYN = this.returned ? "Yes" : "No" // Transformar el valor booleano a string para el return.
        return `LoanId: ${this.idLoan}, User: ${this.user.name}, BookUnit: ${this.bookUnit.unitId}, Returned: ${returnedYN}`;
    }
  
}

// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
export class Library {

}

// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
export function Movie(title, duration) {
    /* Variables públicas */
    this.title = title;
    this.duration = duration;

    /* Variables públicas */ //No ponemos el '#' delante porque, aunque sean propiedades privadas, estamos dentro de una función constructora.
    let actors = [];
    let ratings = [];

    /* Métodos privilegiados */
    this.addActor = function(actor) {
        if (typeof actor !== "string" || actor.trim() === "") throw new Error("Invalid actor name");
        actors.push(actor);
    }

    this.getActors = function() {
        return actors.slice();
    }

    this.addRating = function(rating) {
        if (typeof rating !== "number" || rating < 1 || rating > 5) throw new Error("The rating must be a number between 1 and 5");
        ratings.push(rating);
    }

    this.getAverageRating = function() {
        let n = ratings.length;
        if (n === 0) return 0;

        let sum = 0;
        for (let i = 0; i < n; i++) sum += ratings[i];

        return sum / n;
    }

    /* Métodos en el Prototipo */
    Movie.prototype.getInfo = function() {
        return {
            title: this.title,
            duration: this.duration,
            actors: this.getActors(),
            averageRating: this.getAverageRating()
        }
    }

    Movie.prototype.updateDuration = function(newDuration) {
        if (typeof newDuration !== "number" || newDuration <= 0) throw new Error("Duration must be a positive number");
        this.duration = newDuration;
    }
}