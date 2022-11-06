document.getElementById("input-select").addEventListener("change", function(){
    var countryFilter = document.getElementById("input-select").value;
    var countryRegions = document.querySelectorAll(".country-region")
    var allCountrys = document.querySelectorAll(".country-anchor");
    for(i = 0; i < countryRegions.length; i++){
        var region = countryRegions[i]
        var regionValue = region.innerHTML;
        var regionCheck = regionValue.includes(countryFilter)
        if(regionCheck == true){
            document.getElementById("search-input").value = "";
            allCountrys[i].style.display = "block";
        } else if (countryFilter == "null"){
            document.getElementById("search-input").value = "";
            allCountrys[i].style.display = "block";
        } else{
            document.getElementById("search-input").value = "";
            allCountrys[i].style.display = "none";
        }
    }
})

function filterCountry(){
    document.getElementById("input-select").value = "null";
    var searchBar = document.getElementById("search-input").value;
    var searchValue = searchBar.toUpperCase();
    let countryNames = document.querySelectorAll(".country-name")
    let allCountrys = document.querySelectorAll(".country-anchor")
    for(i = 0; i < countryNames.length; i++){
        var text = countryNames[i];
        var textValue = text.innerHTML;
        var textValueUpper = textValue.toUpperCase();
        if(textValueUpper.indexOf(searchValue) > -1){
            allCountrys[i].style.display = "block";
        } else{
            allCountrys[i].style.display = "none";
        }
    }
}

const newCountryHome = (alpha3Code, name, population, region, capital, flags) => {
    const newAnchor = document.createElement("a");
    newAnchor.setAttribute("href", `assets/pages/detail.html#${alpha3Code}`)
    newAnchor.className = "country-anchor"
    const divBox = `
        <div class="country" title="${name}">
            <div class="country-image">
                <img src="${flags.png}">
            </div>
            <div class="country-text">
                <h2 class="country-name">${name}</h2>
                <div class="country-infos">
                    <p class="country-population"><span class="country-span">Population:</span> ${population.toLocaleString()}</p>
                    <p class="country-region"><span class="country-span">Region:</span> ${region}</p>
                    <p class="country-capital"><span class="country-span">Capital:</span> ${capital}</p>
                </div>
            </div>
        </div>`;
        newAnchor.innerHTML = divBox;
        return newAnchor;
}

if(localStorage.getItem("darkMode") === null){
    localStorage.setItem("darkMode", "false")
}

var countryList = document.getElementById("country-list");
const http = new XMLHttpRequest();
http.open("GET", "https://restcountries.com/v2/all");
http.send();
http.onload = () => {
    const data = JSON.parse(http.response);
    data.forEach(country => {
        if(country.capital === undefined){
            country.capital = "None"
        }
        countryList.appendChild(newCountryHome(country.alpha3Code, country.name, country.population, country.region, country.capital, country.flags, country.png))
    });
    await = document.getElementById("dark-mode").addEventListener("click", function(){
        if(localStorage.getItem("darkMode") === "false"){
            localStorage.setItem("darkMode", "true")
            document.getElementsByTagName("header")[0].classList.toggle("dark-mode-element");
            document.getElementsByTagName("body")[0].classList.toggle("dark-mode-texts");
            document.getElementsByTagName("main")[0].classList.toggle("dark-mode-bg");
            document.getElementById("input-search").classList.toggle("dark-mode-element");
            document.getElementById("input-select").classList.toggle("dark-mode-element");
            let countryBox = document.querySelectorAll(".country")
            for (let i = 0; i < countryBox.length; i++) {
                countryBox[i].classList.toggle("dark-mode-element");
            }
        } else{
            localStorage.setItem("darkMode", "false")
            document.getElementsByTagName("header")[0].classList.remove("dark-mode-element");
            document.getElementsByTagName("body")[0].classList.remove("dark-mode-texts");
            document.getElementsByTagName("main")[0].classList.remove("dark-mode-bg");
            document.getElementById("input-search").classList.remove("dark-mode-element");
            document.getElementById("input-select").classList.remove("dark-mode-element");
            let countryBox = document.querySelectorAll(".country")
            for (let i = 0; i < countryBox.length; i++) {
                countryBox[i].classList.remove("dark-mode-element");
            }
        }
    })
    if(localStorage.getItem("darkMode") === "true"){
    let countryBox = document.querySelectorAll(".country")
        for (let i = 0; i < countryBox.length; i++) {
            countryBox[i].classList.toggle("dark-mode-element");
        }
    }
}

http.addEventListener("loadend", function(){
    document.getElementById("loading").remove()
})

if(localStorage.getItem("darkMode") === "true"){
    document.getElementById("dark-mode").checked = true;
    document.getElementsByTagName("header")[0].classList.toggle("dark-mode-element");
    document.getElementsByTagName("body")[0].classList.toggle("dark-mode-texts");
    document.getElementsByTagName("main")[0].classList.toggle("dark-mode-bg");
    document.getElementById("input-search").classList.toggle("dark-mode-element");
    document.getElementById("input-select").classList.toggle("dark-mode-element");
}