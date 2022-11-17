window.onload = (event) => {
    console.log('Index is fully loaded');

    if(AuthProperties.getCookie())
    {
        window.location.href = dashboardIndex;
    }
    else {
        window.location.href = loginPage;
    }
};