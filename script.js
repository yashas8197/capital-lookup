const searchInput = document.querySelector("#search");
const stateList = document.querySelector("#stateList");

function searchState(searchText) {
  fetch("./states.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (states) {
      let matches = states.filter((state) => {
        const searchTextLower = searchText.toLowerCase();
        const stateNameLower = state.name.toLowerCase();
        const stateAbbrLower = state.abbr.toLowerCase();

        return (
          stateNameLower.startsWith(searchTextLower) ||
          stateAbbrLower.startsWith(searchTextLower)
        );
      });
      searchText === "" ? (matches = []) : matches;
      displayList(matches);
    });
}

function displayList(match) {
  stateList.innerHTML = " ";
  for (let i = 0; i < match.length; i++) {
    const listElement = document.createElement("li");
    listElement.className =
      "list-group-item p-2 m-2 border border-white rounded";
    listElement.innerHTML = `
      <p>${match[i].name} - ${match[i].capital}</p> 
      `;

    stateList.appendChild(listElement);
  }
}

searchInput.addEventListener("input", () => searchState(searchInput.value));
