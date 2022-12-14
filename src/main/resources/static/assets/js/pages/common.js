const baseUrl = 'http://localhost:8080';

const loginEndpoint = baseUrl + '/api/auth/signin';
const registerEndpoint = baseUrl + '/api/auth/signup';
const logoutEndpoint = baseUrl + '/api/auth/signout';
const loginPage = baseUrl + '/login/sign-in.html'
const dashboardIndex = baseUrl + '/dashboard/index.html';
const equipmentTableHtml = baseUrl + '/equipment/equipment_table.html';
const equipmentUpdateHtml = baseUrl + '/equipment/equipment_update.html';
const equipmentGetAll = baseUrl + '/api/equipment/all';
const equipmentEndpoint = baseUrl + '/api/equipment';
const loanTableHtml = baseUrl + '/loan/loan_table.html';
const loanIndexHtml = baseUrl + '/loan/index.html';
const loanGetAll = baseUrl + '/api/loan/all';
const loanEndpoint = baseUrl + '/api/loan';

class Usuario
{
    constructor(username, email, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

class Equipment
{
    constructor(id, name, manufacturer, model, year) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
    }
}

class Manufacturer
{
    constructor(name) {
        this.name = name;
    }
}

class Loan
{
    constructor(id, equipment, dueDate) {
        this.id = id;
        this.equipment = equipment;
        this.dueDate = dueDate;
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

async function putData(url = '', data = {}, callback) {
    await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    if(callback)
        callback();
}