let history = [];
let allScreens = document.body.querySelector("main").children;

function inialize() {
    setVisible("start-page");
}

function setVisible(screen_id) {
    if(allScreens[screen_id]) {
        allScreens.forEach(element => {
            element.style.visibility = 'hidden';
        });
        document.getElementById(screen_id).style.visibility = 'visible';
        history.pushState(screen_id);
    }
    else {
        console.error("id de pantalla no valido");
    }
}

function goBack() {
    setVisible(histoy.pop());
}

inialize();
