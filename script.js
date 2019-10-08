let typer;
let filter = "music";

document.addEventListener("DOMContentLoaded", getJson);

async function getJson() {
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1jl6MdbXubiMR7gnSGQVXMYqaHi8yWNcSitW_W5Qbbh4/od6/public/values?alt=json");
    console.log("jsonData", jsonData);
    typer = await jsonData.json();
    start();
    addEventListenerToButtons();
}

function start() {
    const dest = document.querySelector("#liste");
    const temp = document.querySelector("template");
    dest.innerHTML = "";

    typer.feed.entry.forEach((type) => {
        if (filter == type.gsx$kategori.$t) {
            const klon = temp.cloneNode(true).content;
            klon.querySelector("img").src = `imgs/${type.gsx$billede.$t}.jpg`;
            klon.querySelector("#iframe").innerHTML = type.gsx$musik.$t;
            dest.appendChild(klon);

        };
    })

}


function addEventListenerToButtons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })
}

function filtrering() {
    filter = this.dataset.kat;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("nu");

    })
    this.classList.add("nu");
    start();
}
