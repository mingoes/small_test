class MultipleFinder {
    constructor() {

    }

    runFor(limit) {
        for(let i = 1; i <= limit; i += 1) {
            // Define the result for the current iteration.
            let result = '';

            // Append message for every multiple
            // Easily (un)comment a line for different messages
            // result += i % 2 === 0 ? 'Top' :'';
            result += i % 3 === 0 ? 'Bizz' :'';
            result += i % 5 === 0 ? 'Appz' :'';

            // Show the concatenated messages if there is any, or just the number.
            result  = result || i;

            //Output the final result for this iteration
            console.log(result);
        }
    }

    runOnelinerFor(limit) {
        for(let i = 1; i <= limit; i += 1){
            console.log((i % 3 == 0 ? 'Bizz' : '') + (i % 5 == 0 ? 'Appz' : '') || i);
        }
    }
}

export default new MultipleFinder;