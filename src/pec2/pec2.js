// --------------------------------------------------------------------------------
// EXERCISE 1
// --------------------------------------------------------------------------------
/** 
 * Genera una contraseña aleatoria basada en los criterios especificados en el objeto options.
 * 
 * @param {Object} options Objeto con las propiedades opcionales: uppercase, lowercase, numbers, symbols.
 * @returns {string} Contraseña generada.
*/
export function generatePassword(options = {}) {

    // El parámetro options debe ser un objeto válido (no null).
    if (typeof options !== "object" || options === null) throw new Error("Options must be an object"); // Se utiliza comparación !== y === en vez de != y ==.

    // Objeto con las siguientes propiedades opcionales (todas ellas deben tener valor por defecto = 1).
    const counts = {
        uppercase: options.uppercase !== undefined ? options.uppercase : 1,
        lowercase: options.lowercase !== undefined ? options.lowercase : 1,
        numbers: options.numbers !== undefined ? options.numbers : 1,
        symbols: options.symbols !== undefined ? options.symbols : 1
    };

    // Todos los contadores deben ser números no negativos.
    const keys = ["uppercase", "lowercase", "numbers", "symbols"];

    const n = keys.length; // Declaramos n fuera del bucle para evitar calcular keys.length en cada iteración.
    for (let i = 0; i < n; i++) {
        const key = keys[i]; //La "palabra" de counts.
        const value = counts[key]; //El valor obtenido a través de la palabra.

        if (typeof value !== "number" || value < 0 || !Number.isInteger(value)) {
            throw new Error(`${key.charAt(0).toUpperCase() + key.slice(1)} count must be a non-negative number`); //Passar el primer carácter de uppercase a mayúscula
        }
    }
    // La longitud debe estar entre 4 y 128 caracteres.
    const propertiesLength = counts.uppercase + counts.lowercase + counts.numbers + counts.symbols;
    
    if (propertiesLength < 4 || propertiesLength > 128) throw new Error("Length must be a number between 4 and 128");

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const sym = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    /** 
     * Genera una contraseña aleatoria para un único tipo de propiedad y su contador.
     * 
     * @param {string} type Cadena de carácteres sobre la que escoger carácteres randoms.
     * @param {number} count Número de carácteres a añadir del tipo "type".
     * @returns {string} Contraseña de carácteres de un tipo.
    */
    function randomTypeFormer(type, count) {
        let res = "";
        const n = type.length; 
        for (let i = 0; i < count; i++) {
            const pos = Math.floor(Math.random() * n);
            res += type.charAt(pos);
        }
        return res;
    }

    let password = randomTypeFormer(upper, counts.uppercase) + randomTypeFormer(lower, counts.lowercase) +
                   randomTypeFormer(nums, counts.numbers) + randomTypeFormer(sym, counts.symbols);

    // Dividir el "password" formado en carácteres individuales.
    let array = password.split("");

    // Mezcla aleatoriamente el "password" de carácteres individuales.
    const m = array.length;
    for (let i = 0; i < m; i++) {
        let j = Math.floor(Math.random() * m);
        let aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }

    // Une los carácteres individuales para formar el password final a retornar. 
    return array.join("");
}


/** 
 * Genera una espiral formada por los caracteres "█" y " ".
 * 
 * @param {number} n Número de vueltas de la espiral.
 * @returns {string[]} Array de strings, donde cada string representa una fila de la espiral.
*/
// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------
export function generateSpiral(n) {

    const size = 2 * n + 1;
    const matrix = [];

    // Creamos la matriz resultado vacía a partir del tamaño (para después solamente rellenar los █).
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = " ";
        }
    }

    // Arrays que representan el desplazamiento de row y column para las 4 direcciones posibles.
    // (0, 1) Derecha
    // (1, 0) Abajo
    // (0, -1) Izquierda
    // (-1, 0) Arriba
    const dRow = [0, 1, 0, -1];
    const dColumn = [1, 0, -1, 0];

    // Devuelve true si la celda (row, column) está dentro del tablero.
    function inBounds(row, column) {
        return row >= 0 && row < size && column >= 0 && column < size;
    }

    // Garantiza el separador de " " entre vueltas.
    function isValidStep(row, column, prevRow, prevColumn) {
        if (!inBounds(row, column) || matrix[row][column] !== " ") return false; // Fuera del tablero o ya hay un "█" dibujado.

        const neighbors = [ [row - 1, column], [row + 1, column], [row, column - 1], [row, column + 1] ]; // Básicamente, los vecinos de la celda (row, column). Las diagonales, no.

        for (const [nRow, nColumn] of neighbors) {
            if (!inBounds(nRow, nColumn)) continue; // Si el vecino está fuera del tablero, continuamos.
            if (nRow === prevRow && nColumn === prevColumn) continue; // Si el vecino es una celda previa, continuamos.
            if (matrix[nRow][nColumn] === "█") return false; // Si el vecino ya está dibujado, no queremos que sea valido porque entonces se tocarían dos █.
        }

        return true; // Está permitido dibujar en esa celda.
    }

    let row = 0, column = 0; // Row y column actuales.
    let dir = 0; // Es derecha (primer movimiento).

    matrix[row][column] = "█";

    let moved;
    // Con el do queremos movernos en la espiral hasta que no se pueda. Entonces, será false y no se cumplirá el bucle.
    do {
        moved = false; // En esta iteración no nos hemos movido aún.

        for (let attempt = 0; attempt < 4; attempt++) { // Intenta probar en las 4 direcciones posibles.
            const nextRow = row + dRow[dir]; // Row de la siguiente celda (con dirección dir).
            const nextColumn = column + dColumn[dir]; // Column de la siguiente celda (con dirección dir).

            // Se comprueba con la nueva celda potencial y la celda previa.
            if (isValidStep(nextRow, nextColumn, row, column)) {
                row = nextRow; // Actualiza la row actual con la nueva.
                column = nextColumn; // Actualiza la column actual con la nueva. 
                matrix[row][column] = "█"; // Pinta esta nueva celda.
                moved = true; // Nos hemos movido.
                break; // Sale del for porque ya ha encontrado la dirección correcta de movimiento.
            }
            dir = (dir + 1) % 4; // Si esa step no era valida, gira en la nueva dirección (con orden derecha, abajo, izquierda, arriba) para utilizar dRow y dColumn.
        }

    } while (moved); // Si cuando acabamos el bucle for y no se ha pintado en ninguna dirección (no se ha establecido moved = true), significa que no hay movimientos disponibles y debemos salir.

    return matrix.map(row => row.join("")); // Como matrix es un array de arrays de caracteres, debemos convertirlo a un array de strings.

}

// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
export class LibraryItem {
    constructor(id, title) {
        if (this.constructor === LibraryItem) throw new Error("Cannot instantiate abstract class LibraryItem directly"); // Si se intenta instanciar directamente la clase abstracta.
        this.id = id;
        this.title = title;
    }

    info() {
        return `Id: ${this.id}. Title: ${this.title}.`;
    }
}

export class Book extends LibraryItem {
    constructor(id, title, author) {
        super(id, title);
        this.author = author;
        this.units = [];
    }

    addUnit(unitId, condition) {
        const exists = this.getUnitById(unitId);
        if (exists) throw new Error(`Unit with id ${unitId} already exists`); // Ya existe una copia con el mismo id.
        
        const bookUnit = new BookUnit(unitId, this, condition);
        this.units.push(bookUnit);
        return bookUnit; // Devuelve la nueva instancia.
    }

    removeUnit(unitId) {
        const unit = this.getUnitById(unitId);
        if (!unit) throw new Error("Unit not found"); // No existe.
        if (unit.status !== "available") throw new Error("Cannot remove unit that is not available"); // La copia no está disponible.

        // Elimina una copia por su id.
        const unitsAux = [];
        const n = this.units.length; 
        for (let i = 0; i < n; i++) {
            if (this.units[i].unitId !== unitId) unitsAux.push(this.units[i]);
        }
        this.units = unitsAux;

        return unit; // Devuelve la unidad eliminada.
    }

    get totalUnits() {
        return this.units.length;
    }

    // Se ha implementado con .filter y //bucle.
    get availableUnits() {
        return this.units.filter(u => u.status === "available").length;

        /* Manera de hacerlo con bucle:*/ /*
        let num = 0;
        const n = this.units.length;
        for (let i = 0; i < n; i++) {
            if (this.units[i].status === "available") num++;
        }
        return num; */
    }

    // Se ha implementado con .filter y //bucle.
    get borrowedUnits() {
        return this.units.filter(u => u.status === "borrowed").length;

        /* Manera de hacerlo con bucle:*/ /*
        let num = 0;
        const n = this.units.length;
        for (let i = 0; i < n; i++) {
            if (this.units[i].status === "borrowed") num++;
        }
        return num; */
    }

    // Se ha implementado con .filter y //bucle.
    get maintenanceUnits() {
        return this.units.filter(u => u.status === "maintenance").length;

        /* Manera de hacerlo con bucle:*/ /*
        let num = 0;
        const n = this.units.length;
        for (let i = 0; i < n; i++) {
            if (this.units[i].status === "maintenance") num++;
        }
        return num; */
    }

    // Se ha implementado con .find y //bucle.
    getAvailableUnit() {
        return this.units.find(u => u.status === "available"); // Si no encuentra, devuélve undefined automáticamente.

        /* Manera de hacerlo con bucle:*/ /*
        const n = this.units.length;
        for(let i = 0; i < n; i++) {
            if (this.units[i].status === "available") return this.units[i]; // Devuelve la primera copia disponible.
        }
        return undefined; //No hay ninguna copia con status "available". */
    }

    // Se ha implementado con .find y //bucle.
    getUnitById(unitId) {
        return this.units.find(u => u.unitId === unitId); // Si no encuentra, devuélve undefined automáticamente.

        /* Manera de hacerlo con bucle:*/ /*
        const n = this.units.length;
        for(let i = 0; i < n; i++) {
            if (this.units[i].unitId === unitId) return this.units[i];
        }
        return undefined; //No hay ninguna copia con la unitId pasada por parámetro. */
    }

    // .call: Llamamos a .info de la clase padre (LibraryItem). De esta manera, reutilizamos la lógica de la clase abstracta y añadimos la información específica de Book.
    info() {
        const base = LibraryItem.prototype.info.call(this);
        return `${base} Author: ${this.author}. Units: ${this.availableUnits}/${this.totalUnits} available.`
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

    /** 
     * Actualiza el estado de una BookUnit basándose en su condición.
     * Si esta es "good" o "fair", el estado pasa a "available". En caso contrario, pasa a "maintenance".
     * Esta función protegida general nos permite evitar utilizar el mismo código en muchos sitios, ya que se puede reutilizar en returnUnit, maintenanceUnit y updateConditionAndStatus.
     * 
     * @returns {void}
    */
    _updateStatusByCondition() {
        this.status = this.isConditionGoodOrFair() ? "available" : "maintenance"; // El estado pasa a available si la condición es buena (good o fair). En caso contrario, pasa a maintenance.
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
        if (!this.isAvailableForBorrow()) throw new Error(`Unit ${this.unitId} is not available for borrow (Status: ${this.status}. Condition: ${this.condition})`); // No se cumple que: la copia esté disponible y además se encuentre en condiciones aceptables.
        this.status = "borrowed";
    }

    returnUnit(newCondition) {
        if (this.status !== "borrowed") throw new Error(`Unit ${this.unitId} is not borrowed (Status: ${this.status})`); // El estado no es borrowed.
        if (newCondition) this.condition = newCondition; // Actualiza la condición si esta se pasa por parámetro.
        
        this._updateStatusByCondition();
    }

    maintenanceUnit(newCondition) {
        if (this.status !== "maintenance") throw new Error(`Unit ${this.unitId} is not in maintenance`); // El estado no es maintenance.
        if (newCondition) this.condition = newCondition; // Actualiza la condición si esta se pasa por parámetro.
        
        this._updateStatusByCondition();
    }

    updateConditionAndStatus(newCondition) {
        if (newCondition) this.condition = newCondition; // Actualiza la condición si esta se pasa por parámetro. Por defecto, la nueva condición serà nula.
        
        this._updateStatusByCondition();
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
        const activeYN = this.active ? "Yes" : "No" // Transformar el valor booleano a string para el return.
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
        if (this.returned) throw new Error(`Loan ${this.idLoan} already returned.`); // Ya está devuelto.

        this.bookUnit.returnUnit(newCondition);
        this.returnDate = new Date(); // Establece la fecha de devolución a la fecha actual.
        this.returned = true; // Marca el préstamo como devuelto.
    }

    info() {
        const returnedYN = this.returned ? "Yes" : "No" // Transformar el valor booleano a string para el return.
        return `LoanId: ${this.idLoan}, User: ${this.user.name}, BookUnit: ${this.bookUnit.unitId}, Returned: ${returnedYN}`;
    }
  
}

// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
export class Library {
    constructor() {
        this.books = [];
        this.users = [];
        this.loans = [];
    }

    /** 
     * Busca un objeto dentro de una colección por su id.
     * Esta función protegida general nos permite evitar utilizar el mismo código en muchos sitios, ya que se puede reutilizar para buscar un objeto por su id.
     * 
     * @param {Object[]} collection Colección a la cual pertenece el objeto y sobre la cual iterar.
     * @param {*} id Valor que identifica el objeto.
     * @param {string} field Campo sobre el cual buscar.
     * @returns {Object|undefined} Objeto relacionado con el id del field correspondiente o undefined si no lo encuentra.
    */
    _findById(collection, id, field) {
        //return collection.find(item => item[field] === id); // Lo he hecho de la otra manera porque no sabía si era complicarme demasiado ya.
        const n = collection.length;
        for (let i = 0; i < n; i++) {
            if (collection[i][field] === id) return collection[i];
        }
        return undefined
    }

    /** 
     * Elimina un objeto dentro de una colección por su id.
     * Esta función protegida general nos permite evitar utilizar el mismo código en muchos sitios, ya que se puede reutilizar para eliminar un objeto por su id.
     * 
     * @param {Object[]} collection Colección a la cual pertenece el objeto y sobre la cual iterar.
     * @param {*} id Valor que identifica el objeto.
     * @param {string} field Campo sobre el cual buscar.
     * @returns {Object|undefined} Objeto eliminado relacionado con el id del field correspondiente o undefined si no lo encuentra.
    */
    _removeById(collection, id, field) {
        const n = collection.length;
        for (let i = 0; i < n; i++) {
            if (collection[i][field] === id) {
                const removed = collection[i]; // Nos guardamos temporalmente el removed como un auxiliar para retornarlo.
                collection.splice(i, 1); // Eliminamos solo 1 elemento del array (el de la posición i).
                return removed;
            }
        }
        return undefined;
    }

    /** 
     * Verifica que exista el value; si no, hace un throw del error pasado por parámetro.
     * Esta función protegida general nos permite evitar utilizar el mismo código en muchos sitios, ya que se puede reutilizar para gestionar los throws de errores.
     * 
     * @param {*} value Valor a comprobar.
     * @param {string} message Mensaje de error a usar en el throw new Error().
     * @returns {*} El valor (si existe).
     * @throws {Error} Si value es null o undefined.
    */
    _require(value, message) {
        if (!value) throw new Error(message);
        return value;
    }

    /* Books */
    addBook(id, title, author) {
        if (this.getBook(id)) throw new Error(`Book with id ${id} already exists`);

        const book = new Book(id, title, author);
        this.books.push(book);
        return book;
    }

    getBook(id) {
        return this._findById(this.books, id, "id");
    }

    listBooks() {
        return this.books.map(b => b.info());
    }

    /* Users */
    addUser(idUser, newName) {
        if (this.getUser(idUser)) throw new Error(`User with id ${idUser} already exists`);

        const user = new User(idUser, newName);
        this.users.push(user);
        return user;
    }

    getUser(idUser) {
        return this._findById(this.users, idUser, "idUser");
    }

    updateUser(idUser, newName) {
        const user = this._require(this.getUser(idUser), "User not found");
        user.updateName(newName);
        return user;
    }

    // Si no existe el usuario, lanza el mensaje de error, ya que _require recibirá undefined; si existe, lo elimina y devuelve el user (utilizado como auxiliar en _removeById).
    removeUser(idUser) {
        return this._require(this._removeById(this.users, idUser, "idUser"), "User not found");
    }

    // .bind: Con .bind podemos fijar el contexto de la instancia dentro de la función después de cambiar el valor de this en el callback de map()
    listUsers() {
        return this.users.map(function(u) {
            return u.info();
        }.bind(this));
    }

    /* Loans */
    createLoan(idLoan, idUser, bookId) {
        const user = this._require(this.getUser(idUser), "User not found");
        const book = this._require(this.getBook(bookId), "Book not found");

        // Si no existe la availableUnit, lanza el mensaje de error, ya que _require recibirá undefined; si existe, lo devuelve con el this.units[i] de getAvailableUnit.
        const availableBook = this._require(book.getAvailableUnit(), "No available units for this book");

        const loan = new Loan(idLoan, user, availableBook);
        this.loans.push(loan);
        return loan;
    }

    returnLoan(idLoan, newCondition) {
        // Si no existe el loan, lanza el mensaje de error, ya que _require recibirá undefined; si existe, lo devuelve con el collection[i] de _findById.
        const loan = this._require(this._findById(this.loans, idLoan, "idLoan"), "Loan not found");

        if (loan.returned) throw new Error("Loan already returned");

        loan.returnLoan(newCondition);
        return loan;
    }   

    // Si no existe el loan, lanza el mensaje de error, ya que _require recibirá undefined; si existe, lo elimina y devuelve el loan (utilizado como auxiliar en _removeById).
    removeLoan(idLoan) {
        return this._require(this._removeById(this.loans, idLoan, "idLoan"), "Loan not found");
    }

    listLoans(activeOnly = false) {
        if (!activeOnly) return this.loans; // Deveuelve todos los loans por el parámetro false.

        const n = this.loans.length;
        const res = [];
        // Lo hacemos con un bucle y pusheamos a un array los loans dentro del array loans que están activos.
        for (let i = 0; i < n; i++) {
            if (!this.loans[i].returned) res.push(this.loans[i]);
        }

        return res;
    }
}

// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
export function Movie(title, duration) {
    /* Variables públicas */
    this.title = title;
    this.duration = duration;

    /* Variables privadas */ // No ponemos el '#' delante porque, aunque sean propiedades privadas, estamos dentro de una función constructora.
    let actors = [];
    let ratings = [];

    /* Métodos Privilegiados (con el ; al final) */
    this.addActor = function(actor) {
        if (typeof actor !== "string" || actor.trim() === "") throw new Error("Invalid actor name");
        actors.push(actor);
    };

    // .apply: Como actors es una variable privada a la que no se puede acceder, devolvemos una copia pasandole el array de actors como lista de argumentos en el apply.
    this.getActors = function() {
        return [].slice.apply(actors);
    };

    this.addRating = function(rating) {
        if (typeof rating !== "number" || rating < 1 || rating > 5) throw new Error("The rating must be a number between 1 and 5");
        ratings.push(rating);
    };

    this.getAverageRating = function() {
        const n = ratings.length;
        if (n === 0) return 0;

        let sum = 0;
        for (let i = 0; i < n; i++) sum += ratings[i];

        return sum / n;
    };

    /* Métodos en el Prototipo (sin el ; al final) */
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