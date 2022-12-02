async function loadListeners(){
    const form = document.querySelector("#form-create-equipment");
    const { elements } = document.querySelector("#form-create-equipment");

    if(form)
    {
        form.addEventListener("submit", function(e){

            e.preventDefault();

            let manufacturer = new Manufacturer(elements.namedItem('manufacturer').value);
            let equipment = new Equipment(null,
                elements.namedItem('name').value,
                manufacturer,
                elements.namedItem('model').value,
                elements.namedItem('year').value);

            postData(equipmentEndpoint, equipment, () => { window.location.href = dashboardIndex; });
        })
    }
}

window.onload = async (event) => {
    console.log('Page is fully loaded');
    loadMaterial();
    await loadListeners();
};