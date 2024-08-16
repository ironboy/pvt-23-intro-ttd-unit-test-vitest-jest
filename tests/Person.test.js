import { expect, test } from 'vitest';
import fs from 'fs';
import Person from '../classes/Person.js';

test('Check that a new instance of Person gets the firstName set as a property with the same value as sent to the constructor', () => {
    let gabriella = new Person('Gabriella', 'Johansson');
    expect(gabriella.firstName).toBe('Gabriella');
});

test('Check that a new instance of Person gets the lastName set as a property with the same value as sent to the constructor', () => {
    let gabriella = new Person('Gabriella', 'Johansson');
    expect(gabriella.lastName).toBe('Johansson');
});

test('Check that a new instance of Person gets the firstName and lastName set as properties with the same values as sent to the constructor', () => {
    let pelle = new Person('Pelle', 'Persson');
    expect(pelle).toEqual({ firstName: 'Pelle', lastName: 'Persson' });
});

test('Check that the constructor throws an error if we try to create a Person with an empty string as firstName', () => {
    expect(() => {
        new Person('', 'Eriksson');
    }).toThrow();
});

test('Check that the constructor throws an error if we try to create a Person with an empty string as firstName', () => {
    expect(() => {
        new Person('Greta', '');
    }).toThrow();
});


test('Check that the constructor throws an error if we try to create a Person with an empty string as firstName and an empty a string as lastName', () => {
    expect(() => {
        new Person('', '');
    }).toThrow();
});

test('The Person constructor should throw an error if the firstName is not a string', () => {
    let nonStringValues = [
        // Chosing some common values that are non-string data types
        // null, undefined, numbers, booleans, oject, array, bigInt, date
        null, undefined, 10, -15, true, false,
        { anObject: true }, ['I', 'am', 'an', 'array'],
        150n, new Date()
    ];
    // Check for each nonStringValue that constructor throws an error
    for (let nonStringValue of nonStringValues) {
        expect(() => {
            new Person(nonStringValue, 'Dahl');
        }).toThrow();
        // console.log('Testing that firstName throws an error with data type', typeof nonStringValue, 'and value', nonStringValue);
    }
});

test('The Person constructor should throw an error if the lastName is not a string', () => {
    let nonStringValues = [
        null, undefined, 10, -15, true, false,
        { anObject: true }, ['I', 'am', 'an', 'array'],
        150n, new Date()
    ];
    for (let nonStringValue of nonStringValues) {
        expect(() => {
            new Person('Eva', nonStringValue);
        }).toThrow();
    }
    // console.log('Testing that lastName throws an error with data type', typeof nonStringValue, 'and value', nonStringValue);
});

test('Check that aPerson.sayHi() returns the correct value according to specs.', () => {
    let beata = new Person('Beata', 'Bengtsson');
    expect(beata.sayHi()).toBe('Hi! I am Beata Bengtsson!');
});


// Example of HiVat = high volume automated testing of setting first and lastNames
let personNames = JSON.parse(fs.readFileSync('./mockData/personNames.json', 'utf-8'));

test('HiVat testing of firstName + lastName working with Person instances', () => {
    for (let { firstName, lastName } of personNames) {
        let aPerson = new Person(firstName, lastName);
        expect(aPerson).toEqual({ firstName, lastName });
        // console.log('Testing with', { firstName, lastName });
    }
});

// An alternative when you have loops is to loop through the different values
// and then create ONE TEST per loop iteration
// Advantage: You can set an individual test label for each small test
// Disadvantage: Very verbose test output
for (let { firstName, lastName } of personNames) {
    let aPerson = new Person(firstName, lastName);
    test(`Test of creating a person with the firstName ${firstName} and lastName ${lastName}`, () => {
        expect(aPerson).toEqual({ firstName, lastName });
    });
}