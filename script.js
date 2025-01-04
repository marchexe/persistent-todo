const itemsDiv = document.getElementById("items");
const inputElement = document.getElementById("itemInput");
const errorElement = document.getElementById("error");

let items = [];

const storageKey = "items";

function renderItems() {
    itemsDiv.innerHTML = null;

    for (const [idx, item] of Object.entries(items)) {
        const container = document.createElement("div");
        container.classList.add("item-container");

        const text = document.createElement("p");
        text.classList.add("item-text");
        text.textContent = item;

        const button = document.createElement("button");
        button.textContent = "delete";
        button.onclick = () => removeItem(idx);

        container.appendChild(text);
        container.appendChild(button);
        itemsDiv.appendChild(container);
    }
}

renderItems();

function loadItems() {
    const oldItems = localStorage.getItem(storageKey);
    if (oldItems) items = JSON.parse(oldItems);
    renderItems();
}

function saveItems() {
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems);
}

function addItem() {
    if (!inputElement.value) {
        errorElement.textContent = "you can't add an empty item";
        return;
    }
    items.push(inputElement.value);
    renderItems();
    inputElement.value = "";
    errorElement.textContent = "";
    saveItems();
}

function removeItem(idx) {
    items.splice(idx, 1);
    renderItems();
    saveItems();
}

document.addEventListener("DOMContentLoaded", loadItems);
