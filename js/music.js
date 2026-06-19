const music =
document.getElementById("bgMusic");

window.addEventListener(
    "load",
    () => {

        if(
            localStorage.getItem(
                "musicStarted"
            ) === "true"
        ){

            const savedTime =
            localStorage.getItem(
                "musicTime"
            );

            if(savedTime){

                music.currentTime =
                parseFloat(savedTime);
            }

            music.volume = 0.25;

            music.play().catch(()=>{});
        }

    }
);

setInterval(() => {

    if(music){

        localStorage.setItem(
            "musicTime",
            music.currentTime
        );
    }

}, 1000);