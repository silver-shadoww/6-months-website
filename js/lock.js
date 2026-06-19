const dials =
document.querySelectorAll(".dial");

const unlockBtn =
document.getElementById("unlockBtn");

const message =
document.getElementById("message");

const lockImage =
document.getElementById("lockImage");

const PASSWORD =
"191225";

dials.forEach(dial => {

    dial.addEventListener("click", () => {

        let current =
        parseInt(dial.textContent);

        current++;

        if(current > 9)
            current = 0;

        dial.textContent =
        current;
    });

});

unlockBtn.addEventListener("click", () => {

    let entered = "";

    dials.forEach(dial => {

        entered += dial.textContent;

    });

    if(entered === PASSWORD){

        message.textContent =
        "Correct ♡";

        unlockBtn.disabled = true;

        lockImage.classList.add("glow");

        setTimeout(() => {

            lockImage.style.opacity = "0";

        }, 400);

        setTimeout(() => {

            lockImage.src =
            "images/ui/heart-unlock.png";

        }, 1200);

        setTimeout(() => {

            lockImage.style.opacity = "1";

        }, 1300);

        setTimeout(() => {

            window.location.href =
            "timeline.html";

        }, 3500);

    }

    else{

        message.textContent =
        "Incorrect password ♡ Try again.";

    }

});