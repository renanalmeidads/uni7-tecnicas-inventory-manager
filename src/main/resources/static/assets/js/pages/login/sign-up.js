window.onload = (event) => {
    loadMaterial();
    load();
};

function load(){
    const form = document.querySelector("#form-register");
    const { elements } = document.querySelector("#form-register");

    if(form)
    {
        form.addEventListener("submit", async function (e) {

            e.preventDefault();

            let usuario = new Usuario(elements.namedItem('username').value,
                elements.namedItem('email').value,
                elements.namedItem('password').value);

            await postData(registerEndpoint, usuario, async (response) => {
                if (response.ok) {
                    window.location.href = loginPage;
                } else {
                    console.log('Usuário não encontrado');
                }
            });
        })
    }
}