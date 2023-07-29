let ts = "1688494250873";
let publicKey = "217d9446b5e62f9f614f8f3a7bf30748";
let hashV = "a435e74a353825a0c0f740d978cf58dd";
let nameStartsWith = "Spider";
let limit = 100;

const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${nameStartsWith}&limit=${limit}&apikey=${publicKey}&ts=${ts}&hash=${hashV}`;

const characterBackgrounds = {
  "spider-dok": "/src/img/1-dok.jpg",

  "spider-girl (anya corazon)": "/src/img/2-Anya-Corazon.jpg",

  "spider-girl (may parker)": "/src/img/3-May-Parker.jpg",

  "spider-gwen (gwen stacy)": "/src/img/4-Gwen-Stacy.jpg",

  "spider-ham (larval earth)": "/src/img/5-Larval-Earth.jpg",

  "spider-man (1602)": "/src/img/6-spider-1602.jpg",

  "spider-man (2099)": "/src/img/7-spider-2099.jpg",

  "spider-man (ai apaec)": "/src/img/8-Ai-Apaec.jpg",

  "spider-man (ben reilly)": "/src/img/9-Ben-Reilly.jpg",

  "spider-man (house of m)": "/src/img/10-House-of-M.jpg",

  "spider-man (lego marvel super heroes)":
    "/src/img/11-LEGO-Marvel-Super-Heroes.jpg",

  "spider-man (marvel zombies)": "/src/img/12-Zombie.jpg",

  "spider-man (marvel: avengers alliance)": "/src/img/13-Spider-Marvels.jpg",

  "spider-man (miles morales)": "/src/img/14-Miles-Morales.jpg",

  "spider-man (noir)": "/src/img/15-Noir.jpg",

  "spider-man (peter parker)": "/src/img/16-Peter-Parker.jpg",

  "spider-man (takuya yamashiro)": "/src/img/17-Takuya-Yamashiro.jpg",

  "spider-man (ultimate)": "/src/img/18-Ultimate.jpg",

  "spider-woman (charlotte witter)": "/src/img/19-Charlotte-Witter.jpg",

  "spider-woman (jessica drew)": "/src/img/20-Jessica-Drew.jpg",

  "spider-woman (mattie franklin)": "/src/img/21-Mattie-Franklin.jpg",
};

async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data.data.results;
}

async function displayWords(value) {
  const input = document.getElementById("input-box");
  const listContainer = document.querySelector(".list");
  input.value = value;
  removeElements(listContainer);
}

function removeElements(container) {
  container.innerHTML = "";
}

let previousName = "";

function changeBackground(name) {
  const body = document.body;
  const lowerCaseName = name.toLowerCase();
  if (lowerCaseName !== previousName) {
    const backgroundPath = characterBackgrounds[lowerCaseName];
    body.style.backgroundImage = backgroundPath
      ? `url('${backgroundPath}')`
      : "";
    previousName = lowerCaseName;
  }
}

function hideBackground() {
  const backgroundImage = document.querySelector(".background-image-center");
  backgroundImage.style.display = "none";
}

async function init() {
  const data = await fetchData();

  const input = document.getElementById("input-box");
  const button = document.getElementById("submit-button");
  const showContainer = document.getElementById("show-container");
  const listContainer = document.querySelector(".list");

  input.addEventListener("keyup", () => {
    removeElements(listContainer);
    if (input.value.length > 0) {
      data.forEach((character) => {
        if (
          character.name.toLowerCase().startsWith(input.value.toLowerCase())
        ) {
          listContainer.innerHTML += `<div class="autocomplete-items" onclick="displayWords('${character.name}')">${character.name}</div>`;
        }
      });
    }
  });

  button.addEventListener("click", () => {
    removeElements(listContainer);
    const characterName = input.value;
    const selectedCharacter = data.find(
      (character) => character.name === characterName
    );
    if (selectedCharacter) {
      showContainer.innerHTML = `
        <div class="container-character-image">
          <img src="${selectedCharacter.thumbnail.path}.${
        selectedCharacter.thumbnail.extension
      }" alt="${selectedCharacter.name}" />
        </div>
        <div class="character-name">${selectedCharacter.name}</div>
        <div class="character-description">${
          selectedCharacter.description.length > 0
            ? selectedCharacter.description
            : "No description available"
        }</div>
      `;
      changeBackground(selectedCharacter.name);
    }
    hideBackground();
  });
}

init();
