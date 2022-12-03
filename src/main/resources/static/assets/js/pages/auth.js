AuthProperties = {
    CookieName: "renan",
    setCookie: (value) =>
    {
        document.cookie = value;
    },
    getCookie: () => {
        let match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(AuthProperties.CookieName) + '=([^;]*)'));
        return match ? match[1] : null;
    }
}

AuthFunctions = {
    logout: async () => {
        await postData(logoutEndpoint, null, () => {
            window.location.href = loginPage;
        })
    }
}


function escape(s) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
}