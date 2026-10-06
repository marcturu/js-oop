# PJP PEC 2

En esta PEC vamos a practicar la programación con JavaScript por medio de ejercicios concretos que evaluarán una o varias características del lenguaje.

## Competencias

En esta PEC se desarrollan las siguientes competencias:

* [CG1] Analizar y sintetizar información técnica compleja.
* [CE3] Utilizar de manera adecuada los lenguajes de programación y las mejores herramientas de desarrollo para el análisis, el diseño y la implementación de lugares y aplicaciones web en función de las necesidades del proyecto.
* [CE8] Adaptarse a las tecnologías web y a los futuros entornos actualizando las competencias profesionales.

## Objetivos

Los objetivos concretos de esta PEC son:

* Aprender a utilizar JavaScript y sus características básicas.
* Contribuir a conocer a fondo el lenguaje JavaScript para poder usarlo en el desarrollo de aplicaciones Web.

## Puntuación

La puntuación de los ejercicios prácticos se basa en dos criterios: **Funcionalidad** e **Implementación**. Se espera que los ejercicios funcionen correctamente (pasen los tests) y que la implementación (el código) tenga una calidad adecuada. 

Algunos detalles a tener en cuenta:

- Se penalizará cualquier intento de _hardcodear_ los tests para forzar que pasen. Esta técnica consiste en cambiar la implementación para que devuelva únicamente el valor esperado por el test (cualquier otro test fallaría).
- Los tests automáticos están diseñados para detectar ejercicios erróneos o incompletos para casos concretos. El hecho de que un test pase no garantiza que el ejercicio esté realizado correctamente, es decir, que cubra todos los casos.
- Un ejercicio cuyos tests no pasan se puntuará con un 0 salvo que existan problemas con el test.
- Además de pasar los tests, se evaluará el código en base a los siguientes criterios:
  - Legibilidad, sencillez y calidad del código.
  - Conocimientos de programación. Por ejemplo, no utilizar las estructuras de control adecuadas, como utilizar un bucle para construir una sentencia condicional o viceversa.

## Requisitos mínimos

- Tener instalado Visual Studio Code (o cualquier otro IDE).
- Estudio de la introducción y repaso a JavaScript.
- Estudio de la conceptos de JavaScript.

## Ejercicios prácticos (10 puntos)

Para realizar los ejercicios prácticos debes dirigirte a la siguiente ruta, dentro del repositorio: `src/pec2/pec2.js`.
En este fichero deberás implementar las funciones que te indicamos en los ejercicios que verás más abajo.

Por otro lado, los tests que te permitirán saber si la solución que propones para los ejercicios es correcta están en el fichero `src/pec2/pec2.test.js`.
**No debes editar este fichero**.
Ten en cuenta que los tests son condiciones que deben cumplir las funciones que implementarás en los ejercicios, por lo que pueden servirte de ayuda para corregirlos.

### Preparando el entorno

Una vez hecho **clone** del repositorio, debes instalar las dependencias del proyecto.

```
npm install
```

A continuación, para lanzar los tests debes ejecutar el siguiente comando:

```
npm t
```

La instrucción anterior lanzará los tests cada vez que guardes el fichero `src/pec2/pec2.js`, que es precisamente donde implementarás los ejercicios de esta PEC.

La primera vez que ejecutes `npm t` y se lancen los tests, muy posiblemente fallarán todos, ya que no hay ningún ejercicio implementado. Conforme vayas trabajando en los ejercicios y guardes el fichero, puede que algún test lance algún error. Revisa el mensaje de error que se imprime para conocer su formato y entender cómo se notifican los errores.

### Ejercicio 1 (1,5 puntos)

#### Objetivos

- Practicar la validación de parámetros de entrada y manejo de errores.
- Aplicar algoritmos de aleatorización y mezcla de caracteres.

#### Descripción

Debes implementar la función `generatePassword` que genere contraseñas aleatorias basadas en los criterios especificados en el objeto `options`. La función debe permitir controlar la cantidad de cada tipo de carácter (mayúsculas, minúsculas, números y símbolos) que se incluye en la contraseña final.

La función debe garantizar que la contraseña generada contenga exactamente la cantidad especificada de cada tipo de carácter y que estos estén distribuidos aleatoriamente dentro de la contraseña.

#### Requisitos

Parámetros de entrada:

- `options`: Objeto con las siguientes propiedades opcionales (todas ellas deben tener valor por defecto = 1):
  - `uppercase` (número entero): Cantidad de letras mayúsculas.
  - `lowercase` (número entero): Cantidad de letras minúsculas.
  - `numbers` (número entero): Cantidad de números.
  - `symbols` (número entero): Cantidad de símbolos.

Validaciones obligatorias:

- El parámetro `options` debe ser un objeto válido (no null). En caso de no serlo, se debe lanzar un Error con el texto `Options must be an object`.
- Todos los contadores deben ser números no negativos. En caso de no serlo, se debe lanzar un Error con el texto `{Tipo} count must be a non-negative number`.
- La longitud debe estar entre 4 y 128 caracteres. En caso de no serlo, se debe lanzar un Error con el texto `Length must be a number between 4 and 128`.

Conjuntos de caracteres a utilizar:

- Mayúsculas: Letras del alfabeto inglés (26 letras).
- Minúsculas: Letras del alfabeto inglés (26 letras).
- Números: del 0 al 9.
- Símbolos: Se permiten únicamente los siguientes: `!@#$%^&*()_+-=[]{}|;:,.<>?`.

Retorno:

- Contraseña como string.

#### Ejemplos

```javascript
generatePassword({}); // "A!3b"
generatePassword({ uppercase: 2, lowercase: 3, numbers: 2, symbols: 1 }); // "Ab2Cd3!z"
generatePassword({ uppercase: -1 }); // Error (parámetros incorrectos)
generatePassword({ uppercase: 2, lowercase: 1, numbers: 0, symbols: 0 }); // Error (Longitud incorrecta)
```

### Ejercicio 2 (1,5 puntos)

#### Objetivos

- Practicar la generación de estructuras bidimensionales en arrays.
- Desarrollar algoritmos para recorrer y rellenar matrices.
- Representar gráficamente patrones mediante caracteres ASCII.

#### Descripción

Debes implementar la función `generateSpiral` que genere una espiral formada por los caracteres `█` (bloque sólido) y espacios en blanco.  

La espiral se debe formar de fuera hacia dentro hasta completarse y estar contenida en una matriz bidimensional (Mirar ejemplos: Más abajo y en el archivo de tests `pec2.test.js`).

#### Requisitos

1. **Parámetros de entrada**

  - `n` (número entero): Número de "vueltas" de la espiral. Siempre serà un número entero mayor o igual a 1, por lo que no és necesario realizar ningún control sobre este parámetro.

2. **Restricciones**

  - La matriz debe ser cuadrada con lado de tamaño `2n + 1`.
  - La espiral debe estar formada **únicamente** por los caracteres `█` y espacio `" "`.
  - La espiral debe comenzar desde el borde superior izquierdo y avanzar hacia dentro en sentido horario.
  - **Entre cada vuelta de la espiral debe existir siempre un separador de un espacio en blanco**, de modo que dos líneas paralelas de la espiral nunca lleguen a tocarse.

3. **Retorno**

  - El resultado debe devolverse como un **array de strings**, donde cada string representa una fila de la espiral.

#### Ejemplos

```javascript
generateSpiral(2);
/*
[
  "█████",
  "    █",
  "███ █",
  "█   █",
  "█████"
]
*/

generateSpiral(3);
/*
[
  "███████",
  "      █",
  "█████ █",
  "█   █ █",
  "█ ███ █",
  "█     █",
  "███████"
]
*/
```

### Ejercicio 3 (3,0 puntos)

#### Objetivos

- Practicar la definición de **clases en JavaScript**.
- Aplicar el concepto de **clases abstractas** y **herencia**.
- Modelar una estructura de clases relacionadas.

#### Descripción

Se debe implementar un conjunto de clases que representen los elementos de una biblioteca.  
El sistema debe permitir acciones como: añadir ejemplares de libros, prestar y devolver ejemplares, controlar usuarios y mantener registros de préstamos.

#### Clases y Métodos a Implementar

**1. `LibraryItem`**
Es una clase abstracta.

- **Constructor**: `(id, title)`
  - Propiedades: `id`, `title`.
  - Debe lanzar un error con el texto `Cannot instantiate abstract class LibraryItem directly`, si se intenta instanciar directamente.
- **Método**: `info()`
  - Devuelve un string con el siguente formato: `"Id: {id}. Title: {title}."`

**2. `Book`**
Representa una obra (ejemplo: **Don Quijote**). Hereda de `LibraryItem`.

- **Constructor**: `(id, title, author)`
  - Propiedades: `id`, `title`, `author`, `units` (array de instancias de `BookUnit`).

- **Método**: `addUnit(unitId, condition)`
  - Crea una nueva copia física (`BookUnit`) asociada al libro.
  - Lanza el error `Unit with id {unitId} already exists`, si ya existe una copia con el mismo id.
  - Devuelve la nueva instancia.
  - Por defecto, el estado (condition) del libro es: `good`.

- **Método**: `removeUnit(unitId)`
  - Elimina una copia por su id.
  - Lanza el error `Unit not found`, si no existe.
  - Lanza el error `Cannot remove unit that is not available`, si la copia no está disponible.
  - Devuelve la unidad eliminada.

- **Getters**:
  - `totalUnits`: número total de copias.
  - `availableUnits`: número de copias disponibles.
  - `borrowedUnits`: número de copias prestadas.
  - `maintenanceUnits`: número de copias en mantenimiento.

- **Método**: `getAvailableUnit()`
  - Devuelve la **primera copia disponible** o `undefined`, si no hay.

- **Método**: `getUnitById(unitId)`
  - Devuelve la copia con el id pasado o `undefined`, si no existe.

- **Método**: `info()`
  - Devuelve string con el siguiente formato: `"Id: {id}. Title: {title}. Author: {author}. Units: {disponibles}/{totales} available."`

**3. `BookUnit`**
Representa una copia física concreta de un libro. Hereda de `LibraryItem`.

- **Constructor**: `(unitId, book, condition)`
  - Propiedades:
    - `unitId`: identificador de la copia.
    - `book`: referencia al objeto `Book`.
    - `condition`: estado físico. Valores posibles:
      - `good`
      - `fair`
      - `poor`
      - `damaged`
    - `status`: estado de la copia. Valores posibles:
      - `available` (por defecto)
      - `borrowed`
      - `maintenance`
  - El `id` de `LibraryItem` será compuesto: `{id. de llibro}-{id. de la unidad}`.
  - Por defecto, el estado (condition) del libro es: `good`.

- **Método**: `isAvailable()`
  - Devuelve un valor booleano, indicando si la copia está disponible (estado = `available`).

- **Método**: `isConditionGoodOrFair()`
  - Devuelve un valor booleano, indicando si las condiciones en que se encuentra el libro son aceptables (`good` o `fair`).

- **Método**: `isAvailableForBorrow()`
  - Devuelve un valor booleano, indicando si la copia está disponible y además se encuentra en condiciones aceptables (para ser prestado, obviamente).

- **Método**: `borrowUnit()`
  - Marca la copia como `borrowed`.
  - Lanza el error `Unit ${unitId} is not available for borrow (Status: ${status}. Condition: ${condition})`, si no se cumple que: la copia esté disponible y además se encuentre en condiciones aceptables.

- **Método**: `returnUnit(newCondition)`
  - Actualiza la condición si esta se pasa por parámetro. Por defecto, la nueva condición serà nula.
  - Si el estado no es `borrowed`, debe lanzar el error `Unit ${unitId} is not borrowed (Status: ${status})`.
  - El estado pasa a `available` si la condición es buena (`good` o `fair`). En caso contrario, pasa a `maintenance`.

- **Método**: `maintenanceUnit(newCondition)`
  - Actualiza la condición si esta se pasa por parámetro. Por defecto, la nueva condición serà nula.
  - Si el estado no es `maintenance`, debe lanzar el error `Unit ${unitId} is not in maintenance`.
  - El estado pasa a `available` si la condición es buena (`good` o `fair`). En caso contrario, pasa a `maintenance`.

- **Método**: `updateConditionAndStatus(newCondition)`
  - Actualiza la condición si esta se pasa por parámetro. Por defecto, la nueva condición serà nula.
  - El estado pasa a `available` si la condición es buena (`good` o `fair`). En caso contrario, pasa a `maintenance`.

- **Método**: `info()`
  - Devuelve string con el siguente formato: `Id: {id}, BookId: {book.id}, Status: {status}, Condition: {condition}`

**4. `User`**
Representa a una persona usuaria de la biblioteca.

- **Constructor**: `(idUser, name)`
  - Propiedades: `idUser`, `name`, `active`.
  - Por defecto, el usuario estará activo.

- **Método**: `updateName(newName)`
  - Cambia el nombre. No es necesario realizar ningún control extra.

- **Método**: `deactivate()`
  - Desactiva el usuario.

- **Método**: `activate()`
  - Activa el usuario.

- **Método**: `info()`
  - Devuelve un string con el siguente formato: `Id user: {idUser}. Name: {name}. Active: Yes|No`

**5. `Loan`**
Representa un préstamo de una copia de libro a un usuario.

- **Constructor**: `(idLoan, user, bookUnit)`
  - Valida que la copia esté disponible para préstamo, en caso contrario, debe lanzar el error `BookUnit {unitId} is not available for loan.`.
  - Propiedades:
    - `idLoan`.
    - `user`.
    - `bookUnit`.
    - `loanDate` (fecha actual).
    - `returnDate` (por defecto: null).
    - `returned` (por defecto: falso).
  - Marca la copia como prestada.

- **Método**: `returnLoan(newCondition)`
  - Actualiza la condición de la copia si esta se pasa por parámetro. Por defecto, la nueva condición serà nula.
  - En caso de que ya esté devuelto, se debe lanzar el error `BookUnit {unitId} is not available for loan`.
  - Establece la fecha de devolución a la fecha actual.
  - Marca el préstamo como devuelto.

- **Método**: `info()`
  - Devuelve string con el formato: `"LoanId: {idLoan}, User: {user.name}, BookUnit: {unitId}, Returned: Yes|No"`

#### Consideraciones

En este ejercicio se valorará con **especial importancia** la capacidad de reutilización de código, así como la interacción entre clases.

### Ejercicio 4 (3,0 puntos)

#### Objetivo

El objetivo de este ejercicio es implementar la clase `Library`, que gestionará la interacción entre los libros, los usuarios y los préstamos de nuestra biblioteca.
En este ejercicio te serán útiles las clases implementadas en el ejercicio anterior.

#### Descripción

La clase `Library` actuará como punto central del sistema de gestión de la biblioteca.  
Será responsable de almacenar y gestionar:

- Una colección de libros (`Book`).  
- Una colección de usuarios (`User`).  
- Una colección de préstamos (`Loan`).  

#### Métodos a Implementar en la clase `Library`

**Gestión de libros**

- `addBook(id, title, author)`
  Añade un libro nuevo a la biblioteca. Si el identificador ya existe, debe lanzar el error `Book with id {id} already exists`.
- `getBook(id)`  
  Devuelve el libro con el identificador dado.
- `listBooks()`  
  Devuelve la información de todos los libros disponibles en la biblioteca.

**Gestión de usuarios**

- `addUser(idUser, name)`
  Añade un nuevo usuario. Si el identificador ya existe, debe lanzar el error `User with id {id} already exists`.
- `getUser(idUser)`  
  Devuelve el usuario con el identificador dado.
- `updateUser(idUser, newName)`  
  Actualiza el nombre de un usuario existente. Si el usuario no existe, debe lanzar el erro `User not found`. Devuelve el usuario modificado.
- `removeUser(idUser)`  
  Elimina un usuario de la biblioteca. Si el usuario no existe, debe lanzar el erro `User not found`. Devuelve el usuario eliminado.
- `listUsers()`  
  Devuelve la información de todos los usuarios.

**Gestión de préstamos**

- `createLoan(idLoan, idUser, bookId)`
  Crea un préstamo si el usuario y el libro existen y hay al menos una unidad disponible. La función debe devolver el préstamo. Debe lanzar los siguientes errores, cuando corresponda:
  - `User not found`.
  - `Book not found`.
  - `No available units for this book`.
- `returnLoan(idLoan, newCondition)`  
  Marca un préstamo como devuelto. La función debe devolver el préstamo. Opcionalmente actualiza la condición de la unidad de libro (Por defecto, la nueva condición serà nula). Debe lanzar los siguientes errores, cuando corresponda:
  - `Loan not found`.
  - `Loan already returned`.
- `removeLoan(idLoan)`  
  Elimina un préstamo de la biblioteca. Si el préstamo no exsite, debe devolver el error `Loan not found`. Devuelve el préstamo eliminado.
- `listLoans(activeOnly)`  
  Devuelve todos los préstamos o solo los que están activos, según el parámetro que, por defecto, ha de ser falso.

#### Consideraciones

En este ejercicio, ai igual que en el anterior, se valorará con **especial importancia** la capacidad de reutilización de código, así como la interacción entre clases.

### Ejercicio 5 (1,0 puntos)

#### Objetivos

Practicar la combinación de encapsulación mediante closures, métodos privilegiados y la herencia prototípica.

#### Descripción

Implementa una **función constructora** llamada `Movie` que gestione la información de una película. La implementación debe combinar datos públicos y privados, utilizando closures para encapsular información sensible y métodos privilegiados para interactuar con ella, junto con métodos en el prototipo para funcionalidades comunes a todas las instancias.

Un método **privilegiado** es aquel que puede acceder a las variables y métodos privados y, a su vez, es accesible a los métodos públicos y al exterior. Para obtener más información revisa el apartado "Más información", al final del ejercicio.

#### Requisitos

1. **Parámetros del Constructor**  
  La función `Movie` recibirá los siguientes parámetros:
    - `title` (string): El título de la película.
    - `duration` (number): La duración de la película, en minutos.

2. **Propiedades Públicas**  
  Asigna las siguientes propiedades públicas:
    - `title`.
    - `duration`.

3. **Variables Privadas**  
  Utiliza variables privadas para almacenar:
    - `actors`: Un array para guardar los nombres de los actores.
    - `ratings`: Un array para almacenar calificaciones (números entre 1 y 5).

4. **Métodos Privilegiados (dentro del Constructor)**  
  Define los siguientes métodos para interactuar con las variables privadas:
    - `addActor(actor)`:  
      - Agrega un actor al array `actors`.
      - Valida que `actor` sea un string no vacío; en caso contrario, lanza una instancia de Error con el texto `Invalid actor name`.
    - `getActors()`:  
      - Devuelve **una copia** del array `actors`.
    - `addRating(rating)`:  
      - Agrega una calificación al array `ratings`.
      - Valida que `rating` sea un número entre 1 y 5; en caso contrario, lanza una instancia de Error con el texto `The rating must be a number between 1 and 5`.
    - `getAverageRating()`:  
      - Calcula y devuelve el promedio de las calificaciones de `ratings`.
      - Si no hay calificaciones, devuelve 0.

5. **Métodos en el Prototipo**  
  Define los siguientes métodos en el prototipo de `Movie`:
    - `getInfo()`:  
      - Devuelve un objeto con la estructura del siguiente ejemplo:
        ```javascript
        {
          title: 'The Shawshank Redemption',
          duration: 142,
          actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
          AverageRating: 4
        }
        ```
    - `updateDuration(newDuration)`:  
      - Permite actualizar la propiedad `duration`.
      - Antes de asignar el nuevo valor, valida que `newDuration` sea un número positivo; de lo contrario, lanza una instancia de Error con el texto `Duration must be a positive number`.

#### Más información

  - Métodos privilegiados:
    - [Info](https://www.crockford.com/javascript/private.html#:~:text=a%20privileged%20method.-,Privileged,to%20give%20up%20its%20secrets.)
    - [Video](https://www.youtube.com/watch?v=Y_nsJCFrG48)
