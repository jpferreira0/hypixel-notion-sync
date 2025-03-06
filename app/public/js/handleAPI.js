import { dataParsing } from './dataParsing.js';

document.getElementById('apiButton').addEventListener('click', function () {
    getAPI();
});

function getAPI() {
    fetch('http://localhost:3000/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Sending data to be parsed");
            dataParsing(data);
        })
        .catch(error => {
            document.getElementById('apiOutput').innerHTML = 'Error: ' + error.message;
        });
}
