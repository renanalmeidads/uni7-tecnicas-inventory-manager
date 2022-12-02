const baseUrl = 'http://localhost:8080';

const loginEndpoint = baseUrl + '/api/auth/signin';
const loginPage = baseUrl + '/login/sign-in.html'
const dashboardIndex = baseUrl + '/dashboard/index.html';
const equipmentTableHtml = baseUrl + '/equipment/equipment_table.html';
const equipmentRowHtml = baseUrl + '/equipment/equipment_row.html';
const equipmentGetAll = baseUrl + '/api/equipment/all';

class Usuario
{
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

async function postData(url = '', data = {}, callback) {
    await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }).then((response) => callback(response));
}

async function getAuthenticatedData(url = '', callback) {
    await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
    .then(response => response)
    .then((data) => {
        callback(data);
    });
}