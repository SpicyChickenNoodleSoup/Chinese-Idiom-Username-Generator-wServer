var chineseIdiomsArr;
// creates a global variable for array of chinese idioms, now empty
d3.csv("static/chineseIdiomsDataset.csv").then(function (data) {
    chineseIdiomsArr = getChineseIdiomsArr(data);
    launchSite();
});
// get data from csv
function getChineseIdiomsArr(data) {
    const arr = [];
    for (let i = 0; i < data.length; i++){
        const v = Object.values(data[i]);
        const v1 = v[0];
        arr.push(v1);
    }
    return arr;
}
// get chinese idioms in 1d array form from 2d array

function launchSite() {
    document.getElementById("submitForm").addEventListener("submit", (event) => {
        event.preventDefault();
        clearSuggestions();
        const suggestionsArray = generateSuggestions();
        displaySuggestions(suggestionsArray);
    });
}

document.addEventListener("DOMContentLoaded", launchSite);

function clearSuggestions() {
    const display = document.getElementById("suggestionSection");
    if (!display.classList.contains("hidden"))
        display.classList.toggle("hidden");
    const list = document.querySelector('.suggestionSection ol');
    list.innerHTML = "";
}

function generateSuggestions() {
    const nameInput = document.getElementById("submitSection__textInput").value;
    const nameInputArr = nameInput.split("");
    const firstNameInput = nameInputArr[0];
    const secondNameInput = nameInputArr[1];
    const firstChengyuDisplayArr = getChengyuDis(firstNameInput);
    const secondChengyuDisplayArr = getChengyuDis(secondNameInput);
    const suggestion1 = firstChengyuDisplayArr[0] + " " + secondChengyuDisplayArr[3];
    const suggestion2 = firstChengyuDisplayArr[1] + " " + secondChengyuDisplayArr[0];
    const suggestion3 = firstChengyuDisplayArr[2] + " " + secondChengyuDisplayArr[1];
    const suggestion4 = firstChengyuDisplayArr[3] + " " + secondChengyuDisplayArr[2];
    return [suggestion1,suggestion2,suggestion3,suggestion4];
}

function getChengyuDis(someNameChar){
    function match(item){
        console.log(item);
        if (item.includes(someNameChar)==true){
            console.log(item);
            return item;
        } 
    }
    const selectedCIArr = chineseIdiomsArr.filter(match);
    // if a chinese idiom includes the chinese character from the name input, add to an array
    const standardCIArr = [];
    for (let i = 0; i < 4; i++){
        const randomInt = Math.floor(Math.random() * selectedCIArr.length);
        const c = selectedCIArr[randomInt];
        standardCIArr.push(c);
    }
    // randomise the order of the chinese idioms in the array
    return standardCIArr;
}

function displaySuggestions(suggestionsArray){
    for (let i = 0; i < 4; i++) {
        appendSuggestion(i);
    }
    function appendSuggestion(y){
        var z = document.createElement("LI");
        var t = document.createTextNode(suggestionsArray[y]);
        z.appendChild(t);
        document.getElementById("suggestionList").appendChild(z);
    }
    const display = document.getElementById("suggestionSection");
    if (display.classList.contains("hidden")) display.classList.toggle("hidden");
}
