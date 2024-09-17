const first = document.getElementById("first");
const second = document.getElementById("second");
const container = document.getElementById("container");
const title = document.getElementById("title");
const won = document.getElementById("won");
const returnButton = document.getElementById("return");

const choices = document.getElementsByClassName("choice");

let firstOption;
let secondOption;
let clicks = 0;

const burnt = [];

function loadOption(obj, choice) {
    const image = document.createElement("img");
    const name = document.createElement("p");

    image.classList.add("image");
    image.id = choice.id;

    name.classList.add("option-name");
    name.id = choice.id;

    image.src = obj.img;
    name.innerHTML = obj.name;

    choice.appendChild(image);
    choice.appendChild(name);
}

const chooseMe = (e) => {
    clicks++;
    let wonOption;
    if(clicks >= options.length - 1){
        if(e.target.id == "first"){
            wonOption = firstOption;
        } else {
            wonOption = secondOption;
        }

        clearElement(container);
        loadOption(options[getIndex(wonOption)], won);
        won.style.display = "grid";
        won.onmouseover = e => {
            won.style.scale = "100%"
        }

        title.innerHTML = "She wants to eat " + wonOption;
        returnButton.style.display = "grid";
        
        return;
    }


    if (e.target.id == "first") {
        burnt.push(getIndex(secondOption));

        let indexToLoad = randomIndex();
        while (
            burnt.includes(indexToLoad) ||
            indexToLoad == getIndex(firstOption) || 
            options[indexToLoad] == secondOption
        ) {
            indexToLoad = randomIndex();
        }
        const optionToLoad = options[indexToLoad];

        
        clearElement(second);
        loadOption(optionToLoad, second);
        secondOption = optionToLoad.name;
    } else if (e.target.id == "second") {
        burnt.push(getIndex(firstOption));

        let indexToLoad = randomIndex();
        while (
            burnt.includes(indexToLoad) ||
            indexToLoad == getIndex(secondOption) ||
            options[indexToLoad] == secondOption
        ) {
            indexToLoad = randomIndex();
        }
        const optionToLoad = options[indexToLoad];

        
        clearElement(first);
        loadOption(optionToLoad, first);
        firstOption = optionToLoad.name;
    }

    console.log("Burnt: " + burnt);
};

for (const choice of choices) {
    choice.addEventListener("click", chooseMe);
}

function clearElement(element) {
    element.innerHTML = "";
}

function getIndex(name) {
    for (let index = 0; index < options.length; index++) {
        if (name == options[index].name) return index;
    }
    return -1;
}

function start() {
    console.log(options);

    const indexes = randomIndexes();
    console.log(indexes);

    loadOption(options[indexes[0]], first);
    firstOption = options[indexes[0]].name;
    loadOption(options[indexes[1]], second);
    secondOption = options[indexes[1]].name;
}

function randomIndexes() {
    const firstIndex = randomIndex();
    let secondIndex = randomIndex();

    while (secondIndex == firstIndex) {
        secondIndex = randomIndex();
    }

    return [firstIndex, secondIndex];
}

function randomIndex() {
    return Math.floor(Math.random() * options.length);
}
