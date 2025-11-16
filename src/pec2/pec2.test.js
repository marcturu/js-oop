import { 
  generatePassword, // Ex1
  generateSpiral, // Ex 2
  LibraryItem, Book, BookUnit, User, Loan, // Ex3
  Library, // Ex4
  Movie // Ex5
} from "./pec2";

// --------------------------------------------------------------------------------
// EXERCISE 1
// --------------------------------------------------------------------------------
describe('Ex1', () => {
  describe('generatePassword function', () => {
    // ---------- Default options ----------
    test('should generate password with default options', () => {
      const password = generatePassword({});
      expect(password.length).toBe(4); // 1+1+1+1
      expect(/[A-Z]/.test(password)).toBe(true);
      expect(/[a-z]/.test(password)).toBe(true);
      expect(/[0-9]/.test(password)).toBe(true);
      expect(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)).toBe(true);
    });

    // ---------- Custom options ----------
    test('should generate password with custom options', () => {
      let password = generatePassword({ uppercase: 2, lowercase: 3, numbers: 2 });
      expect(password.length).toBe(8); // 2+3+2+1
      expect(password.match(/[A-Z]/g).length).toBe(2);
      expect(password.match(/[a-z]/g).length).toBe(3);
      expect(password.match(/[0-9]/g).length).toBe(2);
      expect(password.match(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/g).length).toBe(1);

      password = generatePassword({ uppercase: 9, lowercase: 15, numbers: 12, symbols: 0 });
      expect(password.length).toBe(36); // 9+15+12+0
      expect(password.match(/[A-Z]/g).length).toBe(9);
      expect(password.match(/[a-z]/g).length).toBe(15);
      expect(password.match(/[0-9]/g).length).toBe(12);
      expect((password.match(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/g) || []).length).toBe(0);

      password = generatePassword({ uppercase: 0, lowercase: 0, numbers: 10, symbols: 0 });
      expect(password.length).toBe(10); // 9+15+12+0
      expect((password.match(/[A-Z]/g) || []).length).toBe(0);
      expect((password.match(/[a-z]/g) || []).length).toBe(0);
      expect(password.match(/[0-9]/g).length).toBe(10);
      expect((password.match(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/g) || []).length).toBe(0);
    });

    // ---------- Invalid counts ----------
    test('should throw if negative counts are given', () => {
      expect(() => generatePassword({ uppercase: -1, lowercase: 1, numbers: 1, symbols: 1 }))
        .toThrow("Uppercase count must be a non-negative number");
      expect(() => generatePassword({ lowercase: -1 }))
        .toThrow("Lowercase count must be a non-negative number");
      expect(() => generatePassword({ uppercase: 1, lowercase: 1, numbers: -1 }))
        .toThrow("Numbers count must be a non-negative number");
      expect(() => generatePassword({ uppercase: 1, lowercase: 1, numbers: 1, symbols: -1 }))
        .toThrow("Symbols count must be a non-negative number");
    });

    // ---------- Invalid length ----------
    test('should throw if length is invalid', () => {
      expect(() => generatePassword({ uppercase: 1, lowercase: 1, numbers: 0, symbols: 1}))
        .toThrow("Length must be a number between 4 and 128");
      expect(() => generatePassword({ uppercase: 3, lowercase: 0, numbers: 0, symbols: 0}))
        .toThrow("Length must be a number between 4 and 128");
    });

    // ---------- Randomness ----------
    test('should generate different passwords on multiple calls', () => {
      const pass1 = generatePassword({ uppercase: 2, lowercase: 2, numbers: 2, symbols: 2 });
      const pass2 = generatePassword({ uppercase: 2, lowercase: 2, numbers: 2, symbols: 2 });
      expect(pass1).not.toBe(pass2); // very unlikely to be the same
    });
  });  
});

// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------
describe('Ex2', () => {
  describe('generateSpiral function', () => {
    test('should generate array of correct size', () => {
      const n = 3;
      const result = generateSpiral(n);
      const expectedSize = n * 2 + 1;
      
      expect(result).toHaveLength(expectedSize);
      result.forEach(row => {
        expect(row).toHaveLength(expectedSize);
      });
    });

    test('should use only █ characters and spaces', () => {
      const result = generateSpiral(3);
      result.forEach(row => {
        for (let char of row) {
          expect(['█', ' ']).toContain(char);
        }
      });
    });

    test('should generate correct spiral for n=1 (1 turns)', () => {
      const result = generateSpiral(1);
      const expected = [
        "███",
        "  █",
        "███",
      ];
      expect(result).toEqual(expected);
    });

    test('should generate correct spiral for n=2 (2 turns)', () => {
      const result = generateSpiral(2);
      const expected = [
        "█████",
        "    █",
        "███ █",
        "█   █",
        "█████"
      ];
      expect(result).toEqual(expected);
    });

    test('should generate correct spiral for n=3 (3 turns)', () => {
      const result = generateSpiral(3);
      const expected = [
        "███████",
        "      █",
        "█████ █",
        "█   █ █",
        "█ ███ █",
        "█     █",
        "███████"
      ];
      expect(result).toEqual(expected);
    });

    test('should generate correct spiral for n=4 (4 turns)', () => {
      const result = generateSpiral(4);
      const expected = [
        "█████████",
        "        █",
        "███████ █",
        "█     █ █",
        "█ ███ █ █",
        "█ █   █ █",
        "█ █████ █",
        "█       █",
        "█████████"
      ];
      expect(result).toEqual(expected);
    });

    test('should generate correct spiral for n=5 (5 turns)', () => {
      const result = generateSpiral(5);
      const expected = [
        "███████████",
        "          █",
        "█████████ █",
        "█       █ █",
        "█ █████ █ █",
        "█ █   █ █ █",
        "█ █ ███ █ █",
        "█ █     █ █",
        "█ ███████ █",
        "█         █",
        "███████████"
      ];
      expect(result).toEqual(expected);
    });

    test('should generate correct spiral for n=6 (6 turns)', () => {
      const result = generateSpiral(6);
      const expected = [
        "█████████████",
        "            █",
        "███████████ █",
        "█         █ █",
        "█ ███████ █ █",
        "█ █     █ █ █",
        "█ █ ███ █ █ █",
        "█ █ █   █ █ █",
        "█ █ █████ █ █",
        "█ █       █ █",
        "█ █████████ █",
        "█           █",
        "█████████████"
      ];
      expect(result).toEqual(expected);
    });
  });
});

// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
describe('Ex3', () => {
  describe('LibraryItem class', () => {
    test('Cannot instantiate abstract class directly', () => {
      expect(() => new LibraryItem(1, 'Test Title')).toThrow(
        'Cannot instantiate abstract class LibraryItem directly'
      );
    });

    test('Subclass can be instantiated with id and title', () => {
      const book = new Book(101, 'My Book');
      expect(book.id).toBe(101);
      expect(book.title).toBe('My Book');
    });

    test('info() method returns correct string', () => {
      const book = new Book(202, 'Another Book', 'Test Author');
      expect(book.info()).toBe('Id: 202. Title: Another Book. Author: Test Author. Units: 0/0 available.');
    });
  });

  describe('Book class', () => {
    let book;

    beforeEach(() => {
      book = new Book('b1', 'The Great Book', 'John Doe');
    });

    test('should create a book instance', () => {
      expect(book.id).toBe('b1');
      expect(book.title).toBe('The Great Book');
      expect(book.author).toBe('John Doe');
      expect(book.units).toHaveLength(0);
    });

    test('should add a new unit', () => {
      const unit = book.addUnit('u1');
      expect(unit.unitId).toBe('u1');
      expect(unit.book).toBe(book);
      expect(book.totalUnits).toBe(1);
      expect(book.availableUnits).toBe(1);
    });

    test('should throw error when adding duplicate unit', () => {
      book.addUnit('u1');
      expect(() => book.addUnit('u1')).toThrow('Unit with id u1 already exists');
    });

    test('should remove an available unit', () => {
      book.addUnit('u1');
      const removed = book.removeUnit('u1');
      expect(removed.unitId).toBe('u1');
      expect(book.totalUnits).toBe(0);
    });

    test('should throw error when removing a non-existent unit', () => {
      expect(() => book.removeUnit('u999')).toThrow('Unit not found');
    });

    test('should throw error when removing a borrowed unit', () => {
      const unit = book.addUnit('u1');
      unit.borrowUnit();
      expect(() => book.removeUnit('u1')).toThrow('Cannot remove unit that is not available');
    });

    test('getters totalUnits, availableUnits, borrowedUnits, maintenanceUnits', () => {
      const u1 = book.addUnit('u1'); // available
      const u2 = book.addUnit('u2'); // available
      const u3 = book.addUnit('u3'); // available

      u2.borrowUnit();
      u3.updateConditionAndStatus('poor');
      
      expect(book.totalUnits).toBe(3);
      expect(book.availableUnits).toBe(1);
      expect(book.borrowedUnits).toBe(1);
      expect(book.maintenanceUnits).toBe(1);
    });

    test('getAvailableUnit should return first available unit', () => {
      const u1 = book.addUnit('u1');
      const u2 = book.addUnit('u2');
      u1.borrowUnit();
      expect(book.getAvailableUnit()).toBe(u2);
    });

    test('getUnitById should find correct unit', () => {
      const u1 = book.addUnit('u1');
      const u2 = book.addUnit('u2');
      expect(book.getUnitById('u1')).toBe(u1);
      expect(book.getUnitById('u2')).toBe(u2);
      expect(book.getUnitById('u999')).toBeUndefined();
    });

    test('info() should return correct string', () => {
      book.addUnit('u1');
      const info = book.info();
      expect(info).toContain('Id: b1');
      expect(info).toContain('Title: The Great Book');
      expect(info).toContain('Author: John Doe');
      expect(info).toContain('1/1 available');
    });
  });

  describe('BookUnit class', () => {
    let book;
    beforeEach(() => {
      book = new Book('b1', 'Test Book', 'Author A');
    });

    test('should create a BookUnit correctly', () => {
      const unit = new BookUnit('u1', book);
      expect(unit.unitId).toBe('u1');
      expect(unit.book).toBe(book);
      expect(unit.status).toBe('available');
      expect(unit.condition).toBe('good');
      expect(unit.id).toBe('b1-u1');
    });

    test('isAvailable returns true for available unit', () => {
      const unit = new BookUnit('u1', book);
      expect(unit.isAvailable()).toBe(true);
    });

    test('isConditionGoodOrFair returns correct values', () => {
      const unitGood = new BookUnit('u1', book, 'good');
      const unitFair = new BookUnit('u2', book, 'fair');
      const unitPoor = new BookUnit('u3', book, 'poor');
      const unitDamaged = new BookUnit('u4', book, 'damaged');

      expect(unitGood.isConditionGoodOrFair()).toBe(true);
      expect(unitFair.isConditionGoodOrFair()).toBe(true);
      expect(unitPoor.isConditionGoodOrFair()).toBe(false);
      expect(unitDamaged.isConditionGoodOrFair()).toBe(false);
    });

    test('isAvailableForBorrow returns correct status', () => {
      const unit = new BookUnit('u1', book);
      expect(unit.isAvailableForBorrow()).toBe(true);

      unit.borrowUnit();
      expect(unit.isAvailableForBorrow()).toBe(false);

      unit.returnUnit();
      unit.updateConditionAndStatus('poor'); // status becomes maintenance
      expect(unit.isAvailableForBorrow()).toBe(false);
    });

    test('borrowUnit sets status to borrowed if available', () => {
      const unit = new BookUnit('u1', book);
      unit.borrowUnit();
      expect(unit.status).toBe('borrowed');
    });

    test('borrowUnit throws error if not available for borrow', () => {
      const unit = new BookUnit('u1', book, 'poor');
      expect(() => unit.borrowUnit()).toThrow(/not available for borrow/);
    });

    test('returnUnit updates status and condition correctly', () => {
      const unit = new BookUnit('u1', book);
      unit.borrowUnit();
      unit.returnUnit('fair');
      expect(unit.status).toBe('available');
      expect(unit.condition).toBe('fair');
    });

    test('returnUnit throws error if unit not borrowed', () => {
      const unit = new BookUnit('u1', book);
      expect(() => unit.returnUnit()).toThrow(/not borrowed/);
    });

    test('maintenanceUnit works only if status is maintenance', () => {
      const unit = new BookUnit('u1', book);
      unit.updateConditionAndStatus('poor'); // status becomes maintenance
      expect(unit.status).toBe('maintenance');

      unit.maintenanceUnit('fair');
      expect(unit.status).toBe('available');
      expect(unit.condition).toBe('fair');
    });

    test('maintenanceUnit throws error if status not maintenance', () => {
      const unit = new BookUnit('u1', book);
      expect(() => unit.maintenanceUnit()).toThrow(/not in maintenance/);
    });

    test('updateConditionAndStatus updates condition and status correctly', () => {
      const unit = new BookUnit('u1', book);
      unit.updateConditionAndStatus('poor');
      expect(unit.condition).toBe('poor');
      expect(unit.status).toBe('maintenance');

      unit.updateConditionAndStatus('good');
      expect(unit.condition).toBe('good');
      expect(unit.status).toBe('available');
    });

    test('info method returns correct string', () => {
      const unit = new BookUnit('u1', book);
      const info = unit.info();
      expect(info).toContain('u1');
      expect(info).toContain('b1');
      expect(info).toContain('available');
    });
  });

  describe('User class', () => {
    let user;

    beforeEach(() => {
      user = new User('u1', 'Alice');
    });

    test('should create a User with correct properties', () => {
      expect(user.idUser).toBe('u1');
      expect(user.name).toBe('Alice');
      expect(user.active).toBe(true);
    });

    test('updateName should change the user name', () => {
      user.updateName('Bob');
      expect(user.name).toBe('Bob');
    });

    test('deactivate should set active to false', () => {
      user.deactivate();
      expect(user.active).toBe(false);
    });

    test('activate should set active to true', () => {
      user.deactivate(); // first deactivate
      user.activate();
      expect(user.active).toBe(true);
    });

    test('info should return correct string when active', () => {
      const info = user.info();
      expect(info).toBe('Id user: u1. Name: Alice. Active: Yes');
    });

    test('info should return correct string when inactive', () => {
      user.deactivate();
      const info = user.info();
      expect(info).toBe('Id user: u1. Name: Alice. Active: No');
    });
  });

  describe('Loan class', () => {
    let user, book, unit, loan;

    beforeEach(() => {
      user = new User('u1', 'Alice');
      book = new Book('b1', 'The Great Book', 'Author X');
      unit = book.addUnit('u1', 'good');
    });

    test('should create a Loan and mark BookUnit as borrowed', () => {
      loan = new Loan('l1', user, unit);
      expect(loan.idLoan).toBe('l1');
      expect(loan.user).toBe(user);
      expect(loan.bookUnit).toBe(unit);
      expect(loan.returned).toBe(false);
      expect(unit.status).toBe('borrowed');
    });

    test('should throw error if BookUnit is not available for borrow', () => {
      unit.borrowUnit(); // mark as borrowed
      expect(() => new Loan('l2', user, unit)).toThrow(`BookUnit ${unit.unitId} is not available for loan.`);
    });

    test('returnLoan should mark loan as returned and BookUnit as available', () => {
      loan = new Loan('l1', user, unit);
      loan.returnLoan();
      expect(loan.returned).toBe(true);
      expect(loan.returnDate).toBeInstanceOf(Date);
      expect(unit.status).toBe('available');
    });

    test('returnLoan should update condition if specified', () => {
      loan = new Loan('l1', user, unit);
      loan.returnLoan('fair');
      expect(unit.condition).toBe('fair');
    });

    test('returnLoan should throw error if called twice', () => {
      loan = new Loan('l1', user, unit);
      loan.returnLoan();
      expect(() => loan.returnLoan()).toThrow(`Loan l1 already returned.`);
    });

    test('info() should return correct string before and after return', () => {
      loan = new Loan('l1', user, unit);
      expect(loan.info()).toBe(`LoanId: l1, User: Alice, BookUnit: u1, Returned: No`);
      loan.returnLoan();
      expect(loan.info()).toBe(`LoanId: l1, User: Alice, BookUnit: u1, Returned: Yes`);
    });
  });
});


// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
describe('Ex4', () => {
  describe('Library class', () => {
    let library;

    beforeEach(() => {
      library = new Library();
    });

    // ---------- BOOKS ----------
    test('addBook should create a new book', () => {
      const book = library.addBook('b1', 'Book One', 'Author A');
      expect(book.id).toBe('b1');
      expect(library.books.length).toBe(1);
    });

    test('addBook should throw if duplicate', () => {
      library.addBook('b1', 'Book One', 'Author A');
      expect(() => library.addBook('b1', 'Book Two', 'Author B')).toThrow('Book with id b1 already exists');
    });

    test('getBook should return correct book', () => {
      const book = library.addBook('b1', 'Book One', 'Author A');
      expect(library.getBook('b1')).toBe(book);
    });

    test('listBooks should return array of info strings', () => {
      library.addBook('b1', 'Book One', 'Author A');
      library.addBook('b2', 'Book Two', 'Author B');
      const list = library.listBooks();
      expect(list).toHaveLength(2);
      expect(list[0]).toMatch(/Book One/);
      expect(list[1]).toMatch(/Book Two/);
    });

    // ---------- USERS ----------
    test('addUser should create a new user', () => {
      const user = library.addUser('u1', 'Alice');
      expect(user.idUser).toBe('u1');
      expect(library.users.length).toBe(1);
    });

    test('addUser should throw if duplicate', () => {
      library.addUser('u1', 'Alice');
      expect(() => library.addUser('u1', 'Bob')).toThrow('User with id u1 already exists');
    });

    test('getUser should return correct user', () => {
      const user = library.addUser('u1', 'Alice');
      expect(library.getUser('u1')).toBe(user);
    });

    test('updateUser should change user name', () => {
      library.addUser('u1', 'Alice');
      const user = library.updateUser('u1', 'Alicia');
      expect(user.name).toBe('Alicia');
    });

    test('removeUser should delete user', () => {
      library.addUser('u1', 'Alice');
      const removed = library.removeUser('u1');
      expect(removed.idUser).toBe('u1');
      expect(library.users.length).toBe(0);
    });

    test('listUsers should return array of info strings', () => {
      library.addUser('u1', 'Alice');
      library.addUser('u2', 'Bob');
      const list = library.listUsers();
      expect(list).toHaveLength(2);
      expect(list[0]).toMatch(/Alice/);
      expect(list[1]).toMatch(/Bob/);
    });

    // ---------- LOANS ----------
    test('createLoan should create a loan and mark unit as borrowed', () => {
      const user = library.addUser('u1', 'Alice');
      const book = library.addBook('b1', 'Book One', 'Author A');
      const unit = book.addUnit('u1');
      const loan = library.createLoan('l1', 'u1', 'b1');

      expect(loan.idLoan).toBe('l1');
      expect(loan.user).toBe(user);
      expect(loan.bookUnit).toBe(unit);
      expect(unit.status).toBe('borrowed');
      expect(library.loans).toContain(loan);
    });

    test('createLoan should throw if no available units', () => {
      const user = library.addUser('u1', 'Alice');
      const book = library.addBook('b1', 'Book One', 'Author A');
      book.addUnit('u1', 'poor'); // not borrowable
      expect(() => library.createLoan('l1', 'u1', 'b1')).toThrow('BookUnit u1 is not available for loan.');
    });

    test('returnLoan should mark loan as returned and unit as available', () => {
      library.addUser('u1', 'Alice');
      library.addBook('b1', 'Book One', 'Author A').addUnit('u1');
      library.createLoan('l1', 'u1', 'b1');

      const loan = library.returnLoan('l1');
      expect(loan.returned).toBe(true);
      expect(loan.bookUnit.status).toBe('available');
      expect(loan.returnDate).toBeInstanceOf(Date);
    });

    test('returnLoan should throw if loan already returned', () => {
      library.addUser('u1', 'Alice');
      library.addBook('b1', 'Book One', 'Author A').addUnit('u1');
      library.createLoan('l1', 'u1', 'b1');
      library.returnLoan('l1');
      expect(() => library.returnLoan('l1')).toThrow('Loan already returned');
    });

    test('removeLoan should delete loan', () => {
      library.addUser('u1', 'Alice');
      library.addBook('b1', 'Book One', 'Author A').addUnit('u1');
      const loan = library.createLoan('l1', 'u1', 'b1');

      const removed = library.removeLoan('l1');
      expect(removed).toBe(loan);
      expect(library.loans.length).toBe(0);
    });

    test('listLoans should return all loans or only active', () => {
      library.addUser('u1', 'Alice');
      const book = library.addBook('b1', 'Book One', 'Author A');
      const unit1 = book.addUnit('u1');
      const unit2 = book.addUnit('u2');

      const loan1 = library.createLoan('l1', 'u1', 'b1');
      const loan2 = library.createLoan('l2', 'u1', 'b1');

      // activeOnly false
      const allLoans = library.listLoans();
      expect(allLoans).toHaveLength(2);

      // return loan1
      library.returnLoan('l1');

      const activeLoans = library.listLoans(true);
      expect(activeLoans).toHaveLength(1);
      expect(activeLoans[0].idLoan).toBe('l2');
    });
  });
});

// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
describe('Ex5', () => {
  describe('Movie function', () => {
    let movie;
  
    beforeEach(() => {
      movie = new Movie('Inception', 240);
    });
  
    test('should initialize public properties correctly', () => {
      expect(movie.title).toBe('Inception');
      expect(movie.duration).toBe(240);
    });
  
    test('should add valid participants and return a copy of the array', () => {
      movie.addActor('Leonardo DiCaprio');
      movie.addActor('Elliot Page');
      expect(movie.getActors()).toEqual(['Leonardo DiCaprio', 'Elliot Page']);
    });
  
    test('should throw an error when adding an invalid participant', () => {
      expect(() => movie.addActor('')).toThrow('Invalid actor name');
      expect(() => movie.addActor(123)).toThrow('Invalid actor name');
      expect(() => movie.addActor(null)).toThrow('Invalid actor name');
      expect(() => movie.addActor({})).toThrow('Invalid actor name');
      expect(() => movie.addActor([])).toThrow('Invalid actor name');
    });
  
    test('should add valid ratings and calculate the average correctly', () => {
      movie.addRating(5);
      movie.addRating(3);
      movie.addRating(4);
      movie.addRating(3);
      movie.addRating(4);
      movie.addRating(5);
      expect(movie.getAverageRating()).toBe(4);
    });
  
    test('should throw an error when adding an invalid rating', () => {
      expect(() => movie.addRating(0)).toThrow('The rating must be a number between 1 and 5');
      expect(() => movie.addRating(6)).toThrow('The rating must be a number between 1 and 5');
      expect(() => movie.addRating('bad')).toThrow('The rating must be a number between 1 and 5');
    });
  
    test('getAverageRating should return 0 if there are no ratings', () => {
      expect(movie.getAverageRating()).toBe(0);
    });
  
    test('getInfo should return an object with the correct movie information', () => {
      movie.addActor('Leonardo DiCaprio');
      movie.addActor('Elliot Page');
      movie.addActor('Joseph Gordon-Levitt');
      movie.addRating(5);
      const info = movie.getInfo();
      expect(info).toEqual({
        title: 'Inception',
        duration: 240,
        actors: ['Leonardo DiCaprio', 'Elliot Page', 'Joseph Gordon-Levitt'],
        averageRating: 5
      });
    });
  
    test('updateDuration should update the duration if the value is valid', () => {
      movie.updateDuration(205);
      expect(movie.duration).toBe(205);
    });
  
    test('updateDuration should throw an error if the new value is invalid', () => {
      expect(() => movie.updateDuration(0)).toThrow('Duration must be a positive number');
      expect(() => movie.updateDuration(-3)).toThrow('Duration must be a positive number');
      expect(() => movie.updateDuration('bad')).toThrow('Duration must be a positive number');
    });
  });
});