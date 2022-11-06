document.getElementById("btn-back").addEventListener("click", function(){
    window.location.href = "https://renato-roca-dev.github.io/where-in-the-world/"
})

window.addEventListener("hashchange", function(){
    this.location.reload();
})

var mainCountryDiv = document.getElementById("main-country");
var url = location.hash;
var urlCode = url.replace("#", "");
const http = new XMLHttpRequest();
http.open("GET", "https://restcountries.com/v2/all");
http.send();
http.onload = () => {
    const data = JSON.parse(http.response);
    for(i = 0; i < data.length; i++){
        if(data[i].alpha3Code.includes(urlCode)){
            var languagesName = new Array;
            for(x = 0; x < data[i].languages.length; x++){
                languagesName.push(data[i].languages[x].name)
            }
            var currenciesName = new Array;
            if(data[i].currencies == undefined){
                var dontHave = "None";
                currenciesName.push(dontHave)
            } else{
                for(y = 0; y < data[i].currencies.length; y++){
                    currenciesName.push(data[i].currencies[y].name)
                }
            }
            var capitalName = new Array;
            if(data[i].capital == undefined){
                var dontHave = "None";
                capitalName.push(dontHave)
            } else{
                capitalName.push(data[i].capital)
            }
            var borderOne = new Array, borderTwo = new Array, borderThree = new Array;
            var dontHave = "None";
            if(data[i].borders == undefined){
                borderOne.push(dontHave)
                borderTwo.push(dontHave)
                borderThree.push(dontHave)
            } else{
                if(data[i].borders[0] == undefined){
                    borderOne.push(dontHave)
                } else{
                    borderOne.push(data[i].borders[0])
                }
                if(data[i].borders[1] == undefined){
                    borderTwo.push(dontHave)
                } else{
                    borderTwo.push(data[i].borders[1])
                }
                if(data[i].borders[2] == undefined){
                    borderThree.push(dontHave)
                } else{
                    borderThree.push(data[i].borders[2])
                }
            }
            mainCountryDiv.innerHTML +=  `
            <div id="main-country-image">
                <img src="${data[i].flags.svg}">
            </div>
            <div id="main-country-texts">
                    <h1 id="country-name">${data[i].name}</h1>
                <div id="country-texts" class="flex">
                    <div id="country-info-main">
                        <p id="country-native-name"><span class="country-span">Native Name:</span> ${data[i].nativeName}</p>
                        <p id="country-population"><span class="country-span">Population:</span> ${data[i].population.toLocaleString()}</p>
                        <p id="country-region"><span class="country-span">Region:</span> ${data[i].region}</p>
                        <p id="country-sub-region"><span class="country-span">Sub Region:</span> ${data[i].subregion}</p>
                        <p id="country-capital"><span class="country-span">Capital:</span> ${capitalName}</p>
                    </div>
                    <div id="country-info-sub">
                        <p id="country-level-domain"><span class="country-span">Top Level Domain:</span> ${data[i].topLevelDomain}</p>
                        <p id="country-currencies"><span class="country-span">Currencies:</span> ${currenciesName}</p>
                        <p id="country-languages"><span class="country-span">Languages:</span> ${languagesName}</p>
                    </div>
                </div>
                <div id="country-borders" class="flex">
                    <span class="country-span">Border Countries: </span>
                    <div class="anchor-borders">
                    ${borderOne[0] != "None" && `<a href="#${borderOne}" class="border-country-anchor">${borderOne}</a>` || borderOne[0] === "None" && "None"}
                    ${borderTwo[0] != "None" && `<a href="#${borderTwo}" class="border-country-anchor">${borderTwo}</a>` || borderTwo[0] === "None" && ""}
                    ${borderThree[0] != "None" && `<a href="#${borderThree}" class="border-country-anchor">${borderThree}</a>` || borderThree[0] === "None" && ""}
                    </div>
                </div>
            </div>`
        } 
    }
    await = document.getElementById("dark-mode").addEventListener("click", function(){
        if(localStorage.getItem("darkMode") === "false"){
            localStorage.setItem("darkMode", "true");
            document.getElementsByTagName("header")[0].classList.toggle("dark-mode-element");
            document.getElementsByTagName("body")[0].classList.toggle("dark-mode-texts");
            document.getElementsByTagName("main")[0].classList.toggle("dark-mode-bg");
            document.getElementById("btn-back").classList.toggle("dark-mode-element");
            let countryBorders = document.querySelectorAll(".border-country-anchor")
            for (let i = 0; i < countryBorders.length; i++) {
                countryBorders[i].classList.toggle("dark-mode-element");
            }
        } else {
            localStorage.setItem("darkMode", "false")
            document.getElementsByTagName("header")[0].classList.remove("dark-mode-element");
            document.getElementsByTagName("body")[0].classList.remove("dark-mode-texts");
            document.getElementsByTagName("main")[0].classList.remove("dark-mode-bg");
            document.getElementById("btn-back").classList.remove("dark-mode-element");
            let countryBorders = document.querySelectorAll(".border-country-anchor")
            for (let i = 0; i < countryBorders.length; i++) {
                countryBorders[i].classList.remove("dark-mode-element");
            }
        }
    })
    if(localStorage.getItem("darkMode") === "true"){
        let countryBorders = document.querySelectorAll(".border-country-anchor")
        for (let i = 0; i < countryBorders.length; i++) {
            countryBorders[i].classList.toggle("dark-mode-element");
        }
    }
}

http.addEventListener("loadend", function(){
    document.getElementById("loading").remove();
})

if(localStorage.getItem("darkMode") === "true"){
    document.getElementById("dark-mode").checked = true;
    document.getElementsByTagName("header")[0].classList.toggle("dark-mode-element");
    document.getElementsByTagName("body")[0].classList.toggle("dark-mode-texts");
    document.getElementsByTagName("main")[0].classList.toggle("dark-mode-bg");
    document.getElementById("btn-back").classList.toggle("dark-mode-element");
}

window.addEventListener("hashchange", function(){
    if(this.location.hash == "#None" || this.location.hash == "#"){
        window.location.href = "https://renato-roca-dev.github.io/where-in-the-world/"
    }
})