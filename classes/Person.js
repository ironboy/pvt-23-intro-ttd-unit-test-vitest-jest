export default class Person {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        if (typeof this.firstName !== 'string') {
            throw new Error('firstName should be a string');
        }
        if (typeof this.lastName !== 'string') {
            throw new Error('lastName should be a string');
        }
        if (this.firstName === '') {
            throw new Error('firstName should not be an empty string');
        }
        if (this.lastName === '') {
            throw new Error('lastName should not be an empty string');
        }
    }

    sayHi() {
        return `Hi! I am ${this.firstName} ${this.lastName}!`;
    }
}