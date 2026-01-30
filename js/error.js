'use strict';
    function nextPage() {
        const ids = ["21001", "23002"];
        const passes = ["573837", "582758"];

        const id = document.getElementById("idText").value;
        const pwd = document.getElementById("passText").value;

        if (id === ids[0] && pwd === passes[0]) {
        location.href = 'main.html';
        } else if (id === ids[1] && pwd === passes[1]) {
        location.href = 'main1-2.html';
        }

}

