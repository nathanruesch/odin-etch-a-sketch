function colorDiv(e) {
    let selectedColor = "#000000";

    if (shouldRandomizeColor === true) {
        selectedColor = randomizeColor();
    }

    if (shouldDarken === true) {
        let currentOpacity = e.target.style.opacity;

        if (currentOpacity === "") {
            currentOpacity = 0;
        }

        let newOpacity = parseFloat(currentOpacity) + 0.1;

        if (newOpacity > 1) {
            newOpacity = 1;
        }

        e.target.style.opacity = newOpacity;
    }

    e.target.style.background = selectedColor;
}

function randomizeColor() {
    let colorLetters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += colorLetters[Math.floor(Math.random() * 16)];
    }

    return color
}

function generateDivs(size) {
    // Validates our size, ensuring its between 2 and 100
    size = size > 100 ? 100 : size;
    size = size < 2 ? 2 : size;

    divWidth = gridDivContainerSize / size;
    divHeight = divWidth;

    // Clear our current divs
    gridDivContainer.innerHTML = "";

    colorDivArray = [];

    // Generate our new divs
    for (let i = 0; i < size; i++) {
        // Create a new row
        let rowDiv = document.createElement("div");
        rowDiv.className = "gridDivRow";
        rowDiv.style.width = `${gridDivContainerSize}px`;
        rowDiv.style.height = `${divHeight}px`;
        rowDiv.style.display = "flex";

        gridDivContainer.appendChild(rowDiv);

        for (let j = 0; j < size; j++) {
            // Create our new div and apply style
            let createdDiv = document.createElement("div");
            createdDiv.style.background = "#FFFFFF";
            //createdDiv.style.background = "#000000";
            createdDiv.className = "gridDiv";
            createdDiv.style.width = `${divWidth}px`;
            createdDiv.style.height = `${divHeight}px`;
            createdDiv.style.flex = `0 0 ${divWidth}px`;

            // Add our event to our div
            createdDiv.addEventListener('mouseover', (e) => {
                colorDiv(e);
            });

            // Add our div to the array
            colorDivArray[i + j] = createdDiv;

            // Add our div to the DOM
            rowDiv.appendChild(createdDiv);
        }
    }
}

// Const
const gridDivContainerSize = 480;
const initialGridSize = 16;

// General Variables
let shouldRandomizeColor = false;
let shouldDarken = false;

// DOM Elements
let colorDivArray = [];

const gridDivContainer = document.querySelector("#gridDivContainer");

const randomizeColorCheckbox = document.querySelector("#randomColorCheckbox");
const shouldDarkenCheckbox = document.querySelector("#shouldDarkenCheckbox");
const generateDivsButton = document.querySelector("#generateDivsButton");
const gridSizeInput = document.querySelector("#gridSizeInput");

// DOM Element events
randomizeColorCheckbox.addEventListener('change', (e) => {
    shouldRandomizeColor = !shouldRandomizeColor;
});

shouldDarkenCheckbox.addEventListener('change', (e) => {
    shouldDarken = !shouldDarken;
});

generateDivsButton.addEventListener('click', (e) => {
    generateDivs(parseInt(gridSizeInput.value), parseInt(gridSizeInput.value));
});

// Initial Grid
generateDivs(initialGridSize, initialGridSize);