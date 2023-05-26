let history = [];
let allScreens = document.body.querySelector("main").children;

function initialize() {
    setVisible("start-page");
}

function setVisible(screen_id) {
    if(allScreens[screen_id]) {
        for (var i = 0; i < allScreens.length; i++) {
            element = allScreens[i];
            element.classList.remove("visible");
            element.classList.add("hidden");
        }
        document.getElementById(screen_id).classList.remove('hidden');
        document.getElementById(screen_id).classList.add('visible');
        history.push(screen_id);
        console.log("set to " + screen_id);
    }
    else {
        console.error("id de pantalla " + screen_id +" no valido");
    }
}

function goBack() {
    if (history.length > 1) {
        history.pop();
        setVisible(history.pop());
    }
    else {
        console.error("No se puede ir mas atras");
    }
}

initialize();
