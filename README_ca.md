# PJP PAC 2

En aquesta PAC practicarem la programació amb JavaScript per mitjà d'exercicis concrets que avaluaran una o diverses característiques del llenguatge.

## Competències

En aquesta PAC es desenvolupen les següents competències:

* [CG1] Analitzar i sintetitzar informació tècnica complexa.
* [CE3] Utilitzar de manera adequada els llenguatges de programació i les millors eines de desenvolupament per a l'anàlisi, el disseny i la implementació de llocs i aplicacions web en funció de les necessitats del projecte.
* [CE8] Adaptar-se a les tecnologies web i als futurs entorns actualitzant les competències professionals.

## Objectius

Els objectius concrets d'aquesta PAC són:

* Aprendre a utilitzar JavaScript i les seves característiques bàsiques.
* Contribuir a conèixer a fons el llenguatge JavaScript per poder fer-lo servir en el desenvolupament d'aplicacions Web.

## Puntuació

La puntuació dels exercicis pràctics es basa en dos criteris: **Funcionalitat** i **Implementació**. S'espera que els exercicis funcionin correctament (passin els tests) i que la implementació (el codi) tingui una qualitat adequada.

Alguns detalls a tenir en compte:

- Es penalitzarà qualsevol intent de _hardcodejar_ els tests per forçar que passin. Aquesta tècnica consisteix a canviar la implementació perquè retorni únicament el valor esperat pel test (qualsevol altre test fallaria).
- Els tests automàtics estan dissenyats per detectar exercicis erronis o incomplets per a casos concrets. El fet que un test passi no garanteix que l'exercici sigui correcte, és a dir, que cobreixi tots els casos.
- Un exercici els tests del qual no passen es puntuarà amb un 0 llevat que hi hagi problemes amb el test.
- A més de passar els tests, el professorat avaluarà el vostre codi en base als següents criteris:
  - Llegibilitat, senzillesa i qualitat del codi.
  - Coneixements de programació. Per exemple, no utilitzar les estructures de control adequades, com ara utilitzar un bucle per construir una sentència condicional o viceversa.

## Requisits mínims

- Tenir instal·lat Visual Studio Code (o qualsevol altre IDE).
- Estudi de la introducció i repàs a JavaScript.
- Estudi de conceptes de JavaScript.

## Exercicis pràctics (10 punts)

Per realitzar els exercicis pràctics t'has de dirigir a la següent ruta, dins del repositori: `src/pec2/pec2.js`.
En aquest fitxer hauràs d'implementar les funcions que t'indiquem als exercicis que veuràs més avall.

D'altra banda, els tests que et permetran saber si la solució que proposes per als exercicis és correcta són al fitxer `src/pec2/pec2.test.js`.
**No has d'editar aquest fitxer**.
Tingues en compte que els tests són condicions que han de complir les funcions que implementaràs en els exercicis, per la qual cosa et poden servir d'ajuda per corregir-los.

### Preparant l'entorn

```
npm install
```

A continuació, per llançar els tests has d'executar la següent ordre:

```
npm t
```

La instrucció anterior llançarà els tests cada cop que desis el fitxer `src/pec2/pec2.js`, que és precisament on implementaràs els exercicis d'aquesta PAC.

Tal com t'indiquem a la PAC 1, la primera vegada que executis `npm t` i es llencin els tests, molt possiblement fallaran tots, ja que no hi ha cap exercici implementat. Conformi vagis treballant en els exercicis i guardis el fitxer, pot ser que algun test llanci algun error. Revisa el missatge d'error que s'imprimeix per conèixer el format i entendre com es notifiquen els errors.

### Exercici 1 (1,5 punts)

#### Objectius

- Practicar la validació de paràmetres d'entrada i control d'errors.
- Aplicar algorismes d'aleatorització i mescla de caràcters.

#### Descripció

Has d'implementar la funció `generatePassword` que generi contrasenyes aleatòries basades en els criteris especificats a l'objecte `options`. La funció ha de permetre controlar la quantitat de cada tipus de caràcter (majúscules, minúscules, números i símbols) que s'inclou a la contrasenya final.

La funció ha de garantir que la contrasenya generada contingui exactament la quantitat especificada de cada tipus de caràcter i que aquests estiguin distribuïts aleatòriament dins la contrasenya.

#### Requisits

Paràmetres d'entrada:

- `options`: Objecte amb les següents propietats opcionals (totes elles han de tenir valor per defecte = 1):
  - `uppercase` (número sencer): Quantitat de lletres majúscules.
  - `lowercase` (número sencer): Quantitat de lletres minúscules.
  - `numbers` (número sencer): Quantitat de números.
  - `symbols` (nombre sencer): Quantitat de símbols.

Validacions obligatòries:

- El paràmetre `options` ha de ser un objecte vàlid (no null). En cas de no ser-ho, cal llençar un Error amb el text `Options must be an object`.
- Tots els comptadors han de ser números no negatius. En cas de no ser-ho, cal llançar un Error amb el text `{Tipus} count must be a non-negative number`.
- La longitud ha d'estar entre 4 i 128 caràcters. En cas de no ser-ho, cal llançar un Error amb el text `Length must be a number between 4 and 128`.

Conjunts de caràcters a utilitzar:

- Majúscules: Lletres de l'alfabet anglès (26 lletres).
- Minúscules: Lletres de l'alfabet anglès (26 lletres).
- Números: del 0 al 9.
- Símbols: Es permeten únicament els següents: `!@#$%^&*()_+-=[]{}|;:,.<>?`.

Retorn:

- Contrasenya com a string.

#### Exemples

```javascript
generatePassword({}); // "A!3b"
generatePassword({ uppercase: 2, lowercase: 3, numbers: 2, symbols: 1 }); // "Ab2Cd3!z"
generatePassword({ uppercase: -1 }); // Error (paràmetres incorrectes)
generatePassword({ uppercase: 2, lowercase: 1, numbers: 0, symbols: 0 }); // Error (Longitud incorrecta)
```

### Exercici 2 (1,5 punts)

#### Objectius

- Practicar la generació d'estructures bidimensionals en arrays.
- Desenvolupar algorismes per recórrer i emplenar matrius.
- Representar gràficament patrons mitjançant caràcters ASCII.

#### Descripció

Has d'implementar la funció `generateSpiral` que generi una espiral formada pels caràcters `█` (bloc sòlid) i espais en blanc.

L'espiral s'ha de formar de fora cap a dins fins a completar-se i estar continguda en una matriu bidimensional (Mirar exemples: Més avall i a l'arxiu de tests `pec2.test.js`).

#### Requisits

1. **Paràmetres d'entrada**

  - `n` (nombre sencer): Nombre de "voltes" de l'espiral. Sempre serà un nombre enter més gran o igual a 1, per la qual cosa no cal fer cap control sobre aquest paràmetre.

2. **Restriccions**

  - La matriu ha de ser quadrada amb costat de mida `2n + 1`.
  - L'espiral ha d'estar formada **únicament** pels caràcters `█` i espai `" "`.
  - L'espiral ha de començar des de la vora superior esquerra i avançar cap a dins en sentit horari.
  - **Entre cada volta de l'espiral ha d'existir sempre un separador d'un espai en blanc**, de manera que dues línies paral·leles de l'espiral no arribin mai a tocar-se.

3. **Retorn**

  - El resultat s'ha de retornar com un **array de strings**, on cada string representa una fila de l'espiral.

#### Exemples

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

### Exercici 3 (3,0 punts)

#### Objectius

- Practicar la definició de **classes en JavaScript**.
- Aplicar el concepte de **classes abstractes** i **herència**.
- Modelar una estructura de classes relacionades.

#### Descripció

S'han d'implementar un conjunt de classes que representin els elements d'una biblioteca.
El sistema ha de permetre accions com ara: afegir exemplars de llibres, prestar i tornar exemplars, controlar usuaris i mantenir registres de préstecs.

#### Classes i Mètodes a Implementar

**1. `LibraryItem`**
És una classe abstracta.

- **Constructor**: `(id, title)`
  - Propietats: `id`, `title`.
  - Ha de llançar un error amb el text `Cannot instantiate abstract class LibraryItem directly`, si s'intenta instància directament.
- **Mètode**: `info()`
  - Retorna un string amb el següent format: `"Id: {id}. Title: {title}."`

**2. `Book`**
Representa una obra (exemple: **Mecanoscrit del segon origent**). Hereta de `LibraryItem`.

- **Constructor**: `(id, title, author)`
  - Propietats: `id`, `title`, `author`, `units` (array d'instàncies de `BookUnit`).

- **Mètode**: `addUnit(unitId, condition)`
  - Crea una nova còpia física (`BookUnit`) associada al llibre.
  - Llança l'error `Unit with id {unitId} already exists`, si ja hi ha una còpia amb el mateix id.
  - Retorna la nova instància.
  - Per defecte, l'estat (condition) del llibre és: `good`.

- **Mètode**: `removeUnit(unitId)`
  - Elimina una còpia pel seu id.
  - Llança l'error `Unit not found`, si no existeix.
  - Llança l'error `Cannot remove unit that is not available`, si la còpia no està disponible.
  - Retorna la unitat eliminada.

- **Getters**:
  - `totalUnits`: nombre total de còpies.
  - `availableUnits`: nombre de còpies disponibles.
  - `borrowedUnits`: nombre de còpies prestades.
  - `maintenanceUnits`: nombre de còpies en manteniment.

- **Mètode**: `getAvailableUnit()`
  - Retorna la **primera còpia disponible** o `undefined`, si no n'hi ha.

- **Mètode**: `getUnitById(unitId)`
  - Retorna la còpia amb l'id passat o `undefined`, si no existeix.

- **Mètode**: `info()`
  - Retorna string amb el següent format: `"Id: {id}. Title: {title}. Author: {author}. Units: {disponibles}/{totals} available."`

**3. `BookUnit`**
Representa una còpia física concreta d'un llibre. Hereta de `LibraryItem`.

- **Constructor**: `(unitId, book, condition)`
  - Propietats:
    - `unitId`: identificador de la còpia.
    - `book`: referència a l'objecte `Book`.
    - `condition`: estat físic. Valors possibles:
      - `good`
      - `fair`
      - `poor`
      - `damaged`
    - `status`: estat de la còpia. Valors possibles:
      - `available` (per defecte)
      - `borrowed`
      - `maintenance`
  - L'`id` de `LibraryItem` serà compost: `{id. de llibre}-{id. de la unitat}`.
  - Per defecte, l'estat (condition) del llibre és: `good`.

- **Mètode**: `isAvailable()`
  - Retorna un valor booleà, indicant si la còpia està disponible (estat = `available`).

- **Mètode**: `isConditionGoodOrFair()`
  - Retorna un valor booleà, indicant si les condicions en què es troba el llibre són acceptables (`good` o `fair`).

- **Mètode**: `isAvailableForBorrow()`
  - Retorna un valor booleà, indicant si la còpia està disponible i a més es troba en condicions acceptables (per ser prestat, òbviament).

- **Mètode**: `borrowUnit()`
  - Marca la còpia com a `borrowed`.
  - Llança l'error `Unit ${unitId} is not available for borrow (Status: ${status}. Condition: ${condition})`, si no es compleix que: la còpia estigui disponible i a més es trobi en condicions acceptables.

- **Mètode**: `returnUnit(newCondition)`
  - Actualitza la condició si aquesta es passa per paràmetre. Per defecte, la nova condició serà nul·la.
  - Si l'estat no és `borrowed`, ha de llançar l'error `Unit ${unitId} is not borrowed (Status: ${status})`.
  - L'estat passa a `available` si la condició és bona (`good` o `fair`). En cas contrari, passa a `maintenance`.

- **Mètode**: `maintenanceUnit(newCondition)`
  - Actualitza la condició si aquesta es passa per paràmetre. Per defecte, la nova condició serà nul·la.
  - Si l'estat no és `maintenance`, ha de llançar l'error `Unit ${unitId} is not in maintenance`.
  - L'estat passa a `available` si la condició és bona (`good` o `fair`). En cas contrari, passa a `maintenance`.

- **Mètode**: `updateConditionAndStatus(newCondition)`
  - Actualitza la condició si aquesta es passa per paràmetre. Per defecte, la nova condició serà nul·la.
  - L'estat passa a `available` si la condició és bona (`good` o `fair`). En cas contrari, passa a `maintenance`.

- **Mètode**: `info()`
  - Retorna string amb el següent format: `Id: {id}, BookId: {book.id}, Status: {status}, Condition: {condition}`

**4. `User`**
Representa una persona usuària de la biblioteca.

- **Constructor**: `(idUser, name)`
  - Propietats: `idUser`, `name`, `active`.
  - Per defecte, l'usuari estarà actiu.

- **Mètode**: `updateName(newName)`
  - Canvia el nom. No cal fer cap control extra.

- **Mètode**: `deactivate()`
  - Desactiva l'usuari.

- **Mètode**: `activate()`
  - Activeu l'usuari.

- **Mètode**: `info()`
  - Retorna un string amb el següent format: `Id user: {idUser}. Name: {name}. Active: Yes|No`

**5. `Loan`**
Representa un préstec d'una còpia de llibre a un usuari.

- **Constructor**: `(idLoan, user, bookUnit)`
  - Valida que la còpia estigui disponible per a préstec, en cas contrari, ha de llançar l'error `BookUnit {unitId} is not available for loan.`.
  - Propietats:
    - `idLoan`.
    - `user`.
    - `bookUnit`.
    - `loanDate` (data actual).
    - `returnDate` (per defecte: null).
    - `returned` (per defecte: fals).
  - Marca la còpia com a prestada.

- **Mètode**: `returnLoan(newCondition)`
  - Actualitza la condició de la còpia si aquesta es passa per paràmetre. Per defecte, la nova condició serà nul·la.
  - En cas que ja estigui tornat, cal llançar l'error `BookUnit {unitId} is not available for loan`.
  - Estableix la data de devolució a la data actual.
  - Marca el préstec com a tornat.

- **Mètode**: `info()`
  - Retorna string amb el format: `"LoanId: {idLoan}, User: {user.name}, BookUnit: {unitId}, Returned: Yes|No"`

#### Consideracions

En aquest exercici es valorarà amb **especial importància** la capacitat de reutilització de codi, així com la interacció entre classes.

### Exercici 4 (3,0 punts)

#### Objectiu

L'objectiu d'aquest exercici és implementar la classe `Library`, que gestionarà la interacció entre els llibres, els usuaris i els préstecs de la nostra biblioteca.
En aquest exercici et seran útils les classes implementades a l'exercici anterior.

#### Descripció

La classe `Library` actuarà com a punt central del sistema de gestió de la biblioteca.
Serà responsable d'emmagatzemar i gestionar:

- Una col·lecció de llibres (`Book`).
- Una col·lecció d'usuaris (`User`).
- Una col·lecció de préstecs (`Loan`).

#### Mètodes a Implementar a la classe `Library`

**Gestió de llibres**

- `addBook(id, title, author)` 
  Afegeix un llibre nou a la biblioteca. Si l'identificador ja existeix, ha de llançar l'error `Book with id {id} already exists`.
- `getBook(id)`
  Retorna el llibre amb l'identificador donat.
- `listBooks()`
  Retorna la informació de tots els llibres disponibles a la biblioteca.

**Gestió d'usuaris**

- `addUser(idUser, name)` 
  Afegeix un nou usuari. Si l'identificador ja existeix, ha de llançar l'error `User with id {id} already exists`.
- `getUser(idUser)`
  Retorna l'usuari amb l'identificador donat.
- `updateUser(idUser, newName)`
  Actualitzeu el nom d'un usuari existent. Si l'usuari no existeix, ha de llançar l'error `User not found`. Retorna l'usuari modificat.
- `removeUser(idUser)`
  Elimina un usuari de la biblioteca. Si l'usuari no existeix, ha de llançar l'error `User not found`. Retorna l'usuari suprimit.
- `listUsers()`
  Retorna la informació de tots els usuaris.

**Gestió de préstecs**

- `createLoan(idLoan, idUser, bookId)`
  Crea un préstec si l'usuari i el llibre existeixen i hi ha almenys una unitat disponible. La funció ha de retornar el préstec. Ha de llançar els errors següents, quan correspongui:
  - `User not found`.
  - `Book not found`.
  - `No available units for this book`.
  - `returnLoan(idLoan, newCondition)`
  Marca un préstec com a tornat. La funció ha de retornar el préstec. Opcionalment actualitza la condició de la unitat de llibre (Per defecte, la nova condició serà nul·la). Ha de llançar els errors següents, quan correspongui:
  - `Loan not found`.
  - `Loan already returned`.
- `removeLoan(idLoan)`
  Elimina un préstec de la biblioteca. Si el préstec no existeix, ha de retornar l'error `Loan not found`. Retorna el préstec eliminat.
- `listLoans(activeOnly)`
  Retorna tots els préstecs o només els que estan actius, segons el paràmetre que, per defecte, ha de ser fals.

#### Consideracions

En aquest exercici, igual que l'anterior, es valorarà amb **especial importància** la capacitat de reutilització de codi, així com la interacció entre classes.

### Exercici 5 (1,0 punts)

#### Objectius

Practicar la combinació d'encapsulació mitjançant closures, mètodes privilegiats i herència prototípica.

#### Descripció

Implementa una **funció constructora** anomenada `Movie` que gestioni la informació d'una pel·lícula. La implementació ha de combinar dades públiques i privades, utilitzant closures per encapsular informació sensible i mètodes privilegiats per interactuar-hi, juntament amb mètodes en el prototip per a funcionalitats comunes a totes les instàncies.

Un mètode **privilegiat** és aquell que pot accedir a les variables i mètodes privats i, alhora, és accessible als mètodes públics i a l'exterior. Per obtenir més informació reviseu l'apartat "Més informació", al final de l'exercici.

#### Requisits

1. **Paràmetres del Constructor**
  La funció `Movie` rebrà els paràmetres següents:
    - `title` (string): El títol de la pel·lícula.
    - `duration` (number): La durada de la pel·lícula, en minuts.

2. **Propietats Públiques**
  Assigna les propietats públiques següents:
    - `title`.
    - `duration`.

3. **Variables Privades**
  Utilitza variables privades per emmagatzemar:
    - `actors`: Un array per guardar els noms dels actors.
    - `ratings`: Un array per emmagatzemar qualificacions (números entre 1 i 5).

4. **Mètodes Privilegiats (dins el Constructor)**
  Defineix els mètodes següents per interactuar amb les variables privades:
    - `addActor(actor)`:
      - Afegeix un actor a l'array `actors`.
      - Valida que `actor` sigui un string no buit; en cas contrari, llença una instància d'Error amb el text `Invalid actor name`.
    - `getActors()`:
      - Retorna **una còpia** de l'array `actors`.
    - `addRating(rating)`:
      - Afegeix una qualificació a l'array `ratings`.
      - Valida que `rating` sigui un número entre 1 i 5; en cas contrari, llança una instància d'Error amb el text `The rating must be a number between 1 and 5`.
    - `getAverageRating()`:
      - Calcula i retorna la mitjana de les qualificacions de `ràtings`.
      - Si no hi ha qualificacions, retorna 0.

5. **Mètodes al Prototip**
  Defineix els mètodes següents en el prototip de `Movie`:
    - `getInfo()`:
      - Retorna un objecte amb l'estructura del següent exemple:
        ```javascript
        { 
          title: 'The Shawshank Redemption', 
          durada: 142, 
          actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'], 
          AverageRating: 4 
        } 
        ```
    - `updateDuration(newDuration)`:
      - Permet actualitzar la propietat `duration`.
      - Abans d'assignar el nou valor, valida que `newDuration` sigui un nombre positiu; altrament, llança una instància d'Error amb el text `Duration must be a positive number`.

#### Més informació

  - Mètodes privilegiats:
    - [Info](https://www.crockford.com/javascript/private.html#:~:text=a%20privileged%20method.-,Privileged,to%20give%20up%20its%20secrets.)
    - [Video](https://www.youtube.com/watch?v=Y_nsJCFrG48)
