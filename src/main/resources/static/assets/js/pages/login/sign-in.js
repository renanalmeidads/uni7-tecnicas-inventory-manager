window.onload = (event) => {
    console.log('Page is fully loaded');
    loadMaterial();
    load();
};

function load(){
    const form = document.querySelector("#form-login");
    const { elements } = document.querySelector("#form-login");

    if(form)
    {
        form.addEventListener("submit", async function (e) {

            e.preventDefault();

            let usuario = new Usuario(elements.namedItem('username').value, null, elements.namedItem('password').value);

            await postData(loginEndpoint, usuario, async (response) => {
                if (response.ok) {
                    window.location.href = dashboardIndex;
                } else {
                    console.log('Usuário não encontrado');
                }
            });
        })
    }
}