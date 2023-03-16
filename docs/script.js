const first = document.getElementById("first");
const second = document.getElementById("second");
const container = document.getElementById("container");
const title = document.getElementById("title");
const won = document.getElementById("won");
const returnButton = document.getElementById("return");

const choices = document.getElementsByClassName("choice");

let firstFood;
let secondFood;
let clicks = 0;

let burnt = [];

function loadFood(obj, choice) {
    let image = document.createElement("img");
    let name = document.createElement("p");

    image.classList.add("image");
    image.id = choice.id;

    name.classList.add("food-name");
    name.id = choice.id;

    image.src = obj.img;
    name.innerHTML = obj.name;

    choice.appendChild(image);
    choice.appendChild(name);
}

const chooseMe = (e) => {
    clicks++;
    let wonFood;
    if(clicks >= food.length - 1){
        if(e.target.id == "first"){
            wonFood = firstFood;
        } else {
            wonFood = secondFood;
        }

        clearElement(container);
        loadFood(food[getIndex(wonFood)], won);
        won.style.display = "grid";
        won.onmouseover = e => {
            won.style.scale = "100%"
        }

        title.innerHTML = "She wants to eat " + wonFood;
        returnButton.style.display = "grid";
        
        return;
    }


    if (e.target.id == "first") {
        burnt.push(getIndex(secondFood));

        let indexToLoad = randomIndex();
        while (
            burnt.includes(indexToLoad) ||
            indexToLoad == getIndex(firstFood) || 
            food[indexToLoad] == secondFood
        ) {
            indexToLoad = randomIndex();
        }
        let foodToLoad = food[indexToLoad];

        
        clearElement(second);
        loadFood(foodToLoad, second);
        secondFood = foodToLoad.name;
    } else if (e.target.id == "second") {
        burnt.push(getIndex(firstFood));

        let indexToLoad = randomIndex();
        while (
            burnt.includes(indexToLoad) ||
            indexToLoad == getIndex(secondFood) ||
            food[indexToLoad] == secondFood
        ) {
            indexToLoad = randomIndex();
        }
        let foodToLoad = food[indexToLoad];

        
        clearElement(first);
        loadFood(foodToLoad, first);
        firstFood = foodToLoad.name;
    }

    console.log("Burnt: " + burnt);
};

for (let choice of choices) {
    choice.addEventListener("click", chooseMe);
}

function clearElement(element) {
    element.innerHTML = "";
}

function getIndex(name) {
    for (let index = 0; index < food.length; index++) {
        if (name == food[index].name) return index;
    }
    return -1;
}

function start() {
    console.log(food);

    let indexes = randomIndexes();
    console.log(indexes);

    loadFood(food[indexes[0]], first);
    firstFood = food[indexes[0]].name;
    loadFood(food[indexes[1]], second);
    secondFood = food[indexes[1]].name;
}

function randomIndexes() {
    let firstIndex = randomIndex();
    let secondIndex = randomIndex();

    while (secondIndex == firstIndex) {
        secondIndex = randomIndex();
    }

    return [firstIndex, secondIndex];
}

function randomIndex() {
    return Math.floor(Math.random() * food.length);
}
