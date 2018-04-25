/**
 * Simple class that can be extended to demonstrate inheritance.
 */
class ClassA {
    constructor() {
    }

    reverse(message) {
        return message.split('').reverse().join('');
    }
}

export default ClassA;