import { dataParsing } from './dataParsing.js';

document.getElementById('hypixelAPIButton').addEventListener('click', function () {
    hypixelAPI();
});

// document.getElementById('notionAPIButton').addEventListener('click', function () {
//     dataParsing("data");
//     //notionAPI();
// });

document.getElementById('updateNotionPageIDAPIButton').addEventListener('click', function () {
    console.log("Going to backend");
    updateNotionPageIDAPI();
});

function hypixelAPI() {
    fetch('http://localhost:3002/api/hypixel')
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            //* Receives the data and begins to parse it in order to be sent to notion.
            dataParsing(data);
        })
        .catch(error => {
            document.getElementById('apiOutput').innerHTML = 'Error: ' + error.message;
        });
}

function notionAPI(pageName, amount) {
    fetch('http://localhost:3002/api/notion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pageName: pageName, amount: amount }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            //console.log("Data sent to Notion");
        })
        .catch(error => {
            console.log('Error: ' + error.message);
        });
}

function updateNotionPageIDAPI() {
    fetch('http://localhost:3002/api/updateNotionPageID')
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("PageIDs updated");
        })
        .catch(error => {
            console.log('Error: ' + error.message);
        });
}

export { notionAPI };