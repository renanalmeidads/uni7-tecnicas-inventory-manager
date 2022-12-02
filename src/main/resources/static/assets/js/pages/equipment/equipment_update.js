async function loadEquipmentValues()
{
    const urlParams = new URLSearchParams(window.location.search);

    let equipmentId = urlParams.get('equipment-id');

    let getEndpoint = equipmentEndpoint + `/${equipmentId}`;

    await fetch(getEndpoint)
        .then(response => response.json())
        .then(json => {
            fillEquipmentForm(json);
        });
}

function fillEquipmentForm(json)
{
    let { elements } = document.querySelector('#form-update-equipment');

    elements.namedItem('id').value = json.id;
    elements.namedItem('name').value = json.name;
    elements.namedItem('manufacturer').value = json.manufacturer.name;
    elements.namedItem('model').value = json.model;
    elements.namedItem('year').value = json.year;

    document.getElementById('name').focus();
    document.getElementById('manufacturer').focus();
    document.getElementById('model').focus();
    document.getElementById('year').focus();
    document.getElementById('update-button').focus();
}

async function loadListeners(){
    const form = document.querySelector("#form-update-equipment");
    const { elements } = document.querySelector("#form-update-equipment");

    if(form)
    {
        form.addEventListener("submit", function(e){

            e.preventDefault();

            let manufacturer = new Manufacturer(elements.namedItem('manufacturer').value);
            let equipment = new Equipment(elements.namedItem('id').value,
                elements.namedItem('name').value,
                manufacturer,
                elements.namedItem('model').value,
                elements.namedItem('year').value);

            putData(equipmentEndpoint, equipment, () => { window.location.href = dashboardIndex; });
        })
    }
}

window.onload = async function getBody() {
    loadMaterial();
    await loadListeners();
    await loadEquipmentValues();
}