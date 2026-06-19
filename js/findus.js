const hiddenItems =
document.querySelectorAll(".hidden-item");

const heartsContainer =
document.getElementById("hearts-container");

const completion =
document.getElementById("completion");

const continueBtn =
document.getElementById("continueBtn");

let foundCount = 0;

const totalItems = 6;

/* ------------------ */
/* FIND OBJECTS */
/* ------------------ */

hiddenItems.forEach(item => {

    item.addEventListener("click", () => {

        if(
            item.classList.contains("found")
        ) return;

        item.classList.add("found");

        foundCount++;

        spawnHearts(item);

        if(foundCount === totalItems){

            setTimeout(() => {

                completion.style.display =
                "block";

            }, 1000);
        }

    });

});

/* ------------------ */
/* HEARTS */
/* ------------------ */

function spawnHearts(item){

    const scene =
    document.querySelector(
        ".scene-wrapper"
    );

    const itemRect =
    item.getBoundingClientRect();

    const sceneRect =
    scene.getBoundingClientRect();

    for(let i = 0; i < 8; i++){

        const heart =
        document.createElement("div");

        heart.classList.add(
            "floating-heart"
        );

        heart.textContent = "♡";

        const offsetX =
        (Math.random() * 60) - 30;

        const offsetY =
        (Math.random() * 40) - 20;

        heart.style.left =
        (
            itemRect.left
            - sceneRect.left
            + itemRect.width / 2
            + offsetX
        ) + "px";

        heart.style.top =
        (
            itemRect.top
            - sceneRect.top
            + itemRect.height / 2
            + offsetY
        ) + "px";

        heartsContainer.appendChild(
            heart
        );

        setTimeout(() => {

            heart.remove();

        }, 2000);
    }
}

/* ------------------ */
/* CONTINUE */
/* ------------------ */

continueBtn.addEventListener(
    "click",
    () => {

        window.location.href =
        "letter.html";

    }
);