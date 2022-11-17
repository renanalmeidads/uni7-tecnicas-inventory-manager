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

            let usuario = new Usuario(elements.namedItem('username').value, elements.namedItem('password').value);

            console.log(usuario);

            await postData(loginEndpoint, usuario, async (response) => {
                console.log(response);

                if (response.ok) {
                    console.log('Redirect');
                    let jsonResponse = await response.json();
                    //AuthProperties.setCookie(jsonResponse);
                    console.log(jsonResponse);
                    window.location.href = dashboardIndex;
                } else {
                    console.log('Usuário não encontrado');
                }
                //window.location.href = baseUrl;
            });
        })
    }
}