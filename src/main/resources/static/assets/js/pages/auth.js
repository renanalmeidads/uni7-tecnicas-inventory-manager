AuthProperties = {
    CookieName: "renan",
    setCookie: (value) =>
    {
        document.cookie = value;
    },
    getCookie: () => {
        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(AuthProperties.CookieName) + '=([^;]*)'));
        return match ? match[1] : null;
    }
}

function escape(s) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
}