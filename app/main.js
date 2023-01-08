import ServerMessageType from "./modules/ServerMessageType.js";
import GameStatus from "./modules/GameStatus.js";
import Items from "./modules/Items.js";
import TicTacToeField from "./modules/TicTacToeField.js";
import OnlineGame from "./modules/OnlineGame.js";
import ClientAPI from "./modules/ClientAPI.js";
import MessageBuilder from "./modules/MessageBuilder.js";
import MessageType from "./modules/MessageType.js";
import LocalGame from "./modules/LocalGame.js";
import hasParent from "./modules/utils.js";

let websocket
let field
let game
let joinBtn
let backBtn

window.addEventListener("load", () => {
    joinBtn = document.getElementById("joinGame")
    backBtn = document.getElementById("back")
    hideOnlineElems()
    setPregame()
    init()
    window.setLocalGame = setLocalGame
    window.setOnlineGame = setOnlineGame
})

function setLocalGame() {
    try {
        game.quit()
    } catch (e) {

    }
    field = new TicTacToeField(document.getElementsByClassName("grid-main")[0])
    field.resetField()
    window.field = field
    game = new LocalGame(field)
    hideOnlineElems()
    setIngame()
}

function setOnlineGame() {
    try {
        game.quit()
    } catch (e) {

    }
    websocket = new WebSocket("ws://ttt.belinked.chat:8443")
    field = new TicTacToeField(document.getElementsByClassName("grid-main")[0])
    field.resetField()
    window.field = field
    game = new OnlineGame(field, websocket)
    showOnlineElems()
    setIngame()
}

function init() {
    window.addEventListener("click", (e) => {
        if(e.target.classList.contains("grid-item") && game !== undefined) {
            game.click(e.target)
        } else if(hasParent(e.target, ".startLocalGame")) {
            setLocalGame()
        } else if(hasParent(e.target, ".startOnlineGame")) {
            setOnlineGame()
        }
    })

    joinBtn.addEventListener("click", () => {
        let msg = new MessageBuilder(MessageType.JOIN).build()
        websocket.send(JSON.stringify(msg))
    })

    backBtn.addEventListener("click", () => {
        setPregame()
    })
}

function hideOnlineElems() {
    for(let elem of document.getElementsByClassName("online")) {
        elem.style.display = "none"
    }
}

function showOnlineElems() {
    for(let elem of document.getElementsByClassName("online")) {
        elem.style.display = "block"
    }
}

function setIngame() {
    for(let elem of document.getElementsByClassName("ingame")) {
        elem.style.display = "block"
    }
    for(let elem of document.getElementsByClassName("pregame")) {
        elem.style.display = "none"
    }
}

function setPregame() {
    try {
        game.quit()
    } catch (e) {

    }
    for(let elem of document.getElementsByClassName("ingame")) {
        elem.style.display = "none"
    }
    for(let elem of document.getElementsByClassName("pregame")) {
        elem.style.display = "block"
    }
}