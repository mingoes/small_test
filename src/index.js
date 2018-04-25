import MultipleFinder from './multipleFinder';
import ClassA from './classA';
import ClassB from './classB';
import ClassC from './classC';
import PapaParse from 'papaparse';
import _ from 'lodash';
import Highcharts from 'highcharts';

// ============= 1 =================//
window.runMultipleCheck = () => {
    console.log('==== Start =====');
    MultipleFinder.runFor(100);
    console.log('==== End =====');
}

window.runMultipleCheckOneliner = () => {
    console.log('==== Start (Oneliner) =====');
    MultipleFinder.runOnelinerFor(100);
    console.log('==== End =====');
}

// ============= 2 =================//
window.performClassChecks = () => {
    // Construct the classes
    let classA = new ClassA();
    let classB = new ClassB();
    let classC = new ClassC();

    console.log('Is classB an instance of ClassB?', classB instanceof ClassB);
    console.log('Is classB an instance of ClassA as well?', classB instanceof ClassA);
    console.log('Opposite test: Is classC an instance of ClassA (should return false)', classC instanceof ClassA);
    console.log('Can classB reverse a string?', classB.reverse('Yes it can'));
}

// ============= 3 =================//
window.drawChart = () => {
    // Fetch the date from the CSV
    fetch('/data.csv').then(resp => resp.text()).then(text => {

        // Use PapaParse to parse the CSV data
        let dataArray = PapaParse.parse(text, {header:true});

        // Group and sum the data
        let dataGrouped = _(dataArray.data)
            .filter('DATE')     //Drops the last empty row.
            .groupBy('DATE')    //Groups by date
            .map((objects, key) => ({
                'date': key,
                'yespercentage': Math.round((_.sumBy(objects, {'ANSWER': 'yes'}) / _.size(objects)) * 100)
            }))

        // Make the data ready for usage in highcharts
        let dates = dataGrouped.map(object => (object.date)).value();
        let series = dataGrouped.map(object => (object.yespercentage)).value();

        // Draw the actual chart
        Highcharts.chart('chart', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Votes'
            },
            xAxis: {
                type: 'datetime',
                categories: dates
            },
            yAxis: {
                title: {
                    text: '% Yes votes'
                }
            },
            series: [{
                name: '% Yes votes',
                data: series
            }]
        });
    })
}

// ============= 4 =================//
window.fetchUrls = () => { 
    // Fetch the URL's
    const promise_1 = fetch('https://cdn.gfkdaphne.com/tests/async.php?a=1').then(resp => resp.text());
    const promise_2 = fetch('https://cdn.gfkdaphne.com/tests/async.php?a=2').then(resp => resp.text());

    // Wait for them to finish and log the response
    Promise.all([promise_1, promise_2]).then(responses => {
        console.log(responses[0] + ' ' + responses[1]);
    }); 
}