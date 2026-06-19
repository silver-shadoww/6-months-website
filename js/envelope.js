const closedEnvelope =
document.getElementById("closedEnvelope");

const openEnvelope =
document.getElementById("openEnvelope");

const letterContent =
document.getElementById("letterContent");

const typedText =
document.getElementById("typedText");

const nextBtn =
document.getElementById("nextBtn");

const music =
document.getElementById("bgMusic");

const message =
"Happy 6 months\nmy love ♡";

let opened = false;

closedEnvelope.addEventListener("click", () => {

    if(opened) return;

    opened = true;

    music.volume = 0.25;

    localStorage.setItem(
        "musicStarted",
        "true"
    );

    music.currentTime = 0;

    music.play()
    .then(() => {

        console.log("Music started");

    })
    .catch(error => {

        console.log(error);

    });
    closedEnvelope.classList.add("hidden");

    setTimeout(() => {

        openEnvelope.classList.remove("hidden");

        setTimeout(() => {

            letterContent.classList.add("show");

            typeText();

        }, 500);

    }, 400);

});

function typeText(){

    let i = 0;

    const interval = setInterval(() => {

        typedText.textContent +=
        message[i];

        i++;

        if(i >= message.length){

            clearInterval(interval);

            nextBtn.classList.add("show");
        }

    }, 70);
}

nextBtn.addEventListener("click", () => {

    window.location.href =
    "lock.html";

});