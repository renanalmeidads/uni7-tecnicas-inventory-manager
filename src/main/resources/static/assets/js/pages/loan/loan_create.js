async function loadListeners(){
    const form = document.querySelector("#form-create-loan");
    const { elements } = document.querySelector("#form-create-loan");

    if(form)
    {
        form.addEventListener("submit", function(e){

            e.preventDefault();

            let date = elements.namedItem('dueDate').value;
            let dateParts = date.split('/');
            let dueDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            let equipment = new Equipment(elements.namedItem('equipment').value, null, null, null, null);
            let loan = new Loan(null, equipment, dueDate);

            postData(loanEndpoint, loan, () => { window.location.href = loanIndexHtml; });
        })
    }
}

async function loadEquipments(){
    await fetch(equipmentGetAll)
        .then((response) => response.json())
        .then((data) => {
            if(data) {

                let selectEquipments = document.getElementById('select-equipment');

                for(const [key, value] of Object.entries(data))
                {
                    let opt = document.createElement('option');
                    opt.value = value.id;
                    opt.innerHTML = value.id + " - " + value.name + " - " + value.model + " - " + value.year;
                    selectEquipments.appendChild(opt);
                }
            }
        });
}

window.onload = async (event) => {
    console.log('Page is fully loaded');
    loadMaterial();
    await loadListeners();
    await loadEquipments();
};