const WORDS = [
    "ZOOTOPIA",
    "ICECREAM",
    "SUSHI",
    "ROSES",
    "PASTA",
    "LUMAS",
    "ROCKY",
    "CALIB",
    "FREAKYNIKKI"
];

const GRID_SIZE = 15;

const gridElement =
document.getElementById("grid");

const wordListItems =
document.querySelectorAll("#wordList li");

const continueBtn =
document.getElementById("continueBtn");

let grid =
Array(GRID_SIZE)
.fill()
.map(() => Array(GRID_SIZE).fill(""));

let foundWords = new Set();

let isDragging = false;

let selectedCells = [];

const placedWords = [];

/* ------------------ */
/* PLACE WORDS */
/* ------------------ */

function placeWord(word){

    const directions = [

        [0,1],   // horizontal

        [1,0],   // vertical

        [1,1],   // diagonal

        [-1,1]   // diagonal up

    ];

    let placed = false;

    while(!placed){

        const direction =
        directions[
            Math.floor(
                Math.random()
                * directions.length
            )
        ];

        const dx = direction[0];
        const dy = direction[1];

        const row =
        Math.floor(
            Math.random()*GRID_SIZE
        );

        const col =
        Math.floor(
            Math.random()*GRID_SIZE
        );

        let fits = true;

        for(let i=0;i<word.length;i++){

            const r =
            row + dx*i;

            const c =
            col + dy*i;

            if(
                r < 0 ||
                r >= GRID_SIZE ||
                c < 0 ||
                c >= GRID_SIZE
            ){
                fits = false;
                break;
            }

            if(
                grid[r][c] !== "" &&
                grid[r][c] !== word[i]
            ){
                fits = false;
                break;
            }
        }

        if(fits){

            const cells = [];

            for(let i=0;i<word.length;i++){

                const r =
                row + dx*i;

                const c =
                col + dy*i;

                grid[r][c] = word[i];

                cells.push({
                    row:r,
                    col:c
                });
            }

            placedWords.push({
                word,
                cells
            });

            placed = true;
        }
    }
}

/* ------------------ */
/* PLACE ALL WORDS */
/* ------------------ */

WORDS.forEach(placeWord);

/* ------------------ */
/* FILL REMAINING */
/* ------------------ */

for(let r=0;r<GRID_SIZE;r++){

    for(let c=0;c<GRID_SIZE;c++){

        if(grid[r][c] === ""){

            grid[r][c] =
            String.fromCharCode(
                65 +
                Math.floor(
                    Math.random()*26
                )
            );
        }
    }
}

/* ------------------ */
/* CREATE GRID */
/* ------------------ */

for(let r=0;r<GRID_SIZE;r++){

    for(let c=0;c<GRID_SIZE;c++){

        const cell =
        document.createElement("div");

        cell.classList.add("cell");

        cell.textContent =
        grid[r][c];

        cell.dataset.row = r;
        cell.dataset.col = c;

        gridElement.appendChild(cell);

    }
}

const cells =
document.querySelectorAll(".cell");

/* ------------------ */
/* DRAG SELECTION */
/* ------------------ */

cells.forEach(cell => {

    cell.addEventListener("mousedown", () => {

        clearSelection();

        isDragging = true;

        selectCell(cell);

    });

    cell.addEventListener("mouseenter", () => {

        if(isDragging){

            selectCell(cell);
        }

    });

});

document.addEventListener("mouseup", () => {

    if(isDragging){

        checkSelection();
    }

    isDragging = false;

});

/* ------------------ */
/* TOUCH SUPPORT */
/* ------------------ */

cells.forEach(cell => {

    cell.addEventListener("touchstart", () => {

        clearSelection();

        isDragging = true;

        selectCell(cell);

    });

});

document.addEventListener("touchend", () => {

    if(isDragging){

        checkSelection();
    }

    isDragging = false;

});

/* ------------------ */
/* SELECT CELL */
/* ------------------ */

function selectCell(cell){

    if(
        selectedCells.includes(cell)
    ) return;

    selectedCells.push(cell);

    cell.classList.add("selected");
}

/* ------------------ */
/* CHECK WORD */
/* ------------------ */

function checkSelection(){

    const letters =
    selectedCells
    .map(c => c.textContent)
    .join("");

    const reversed =
    letters
    .split("")
    .reverse()
    .join("");

    let found = null;

    WORDS.forEach(word => {

        if(
            letters === word ||
            reversed === word
        ){
            found = word;
        }

    });

    if(found){

        selectedCells.forEach(cell => {

            cell.classList.remove(
                "selected"
            );

            cell.classList.add(
                "found"
            );

        });

        markWordFound(found);

    }

    else{

        setTimeout(() => {

            clearSelection();

        },200);

    }
}

/* ------------------ */
/* CLEAR */
/* ------------------ */

function clearSelection(){

    selectedCells.forEach(cell => {

        if(
            !cell.classList.contains(
                "found"
            )
        ){

            cell.classList.remove(
                "selected"
            );
        }

    });

    selectedCells = [];
}

/* ------------------ */
/* MARK FOUND */
/* ------------------ */

function markWordFound(word){

    foundWords.add(word);

    wordListItems.forEach(item => {

        if(
            item.dataset.word === word
        ){

            item.classList.add("found");
        }

    });

    selectedCells = [];

    if(
        foundWords.size ===
        WORDS.length
    ){

        continueBtn.style.display =
        "block";
    }
}

/* ------------------ */
/* CONTINUE */
/* ------------------ */

continueBtn.addEventListener(
    "click",
    () => {

        window.location.href =
        "find-us.html";

    }
);