import ServerMessageType from "./modules/ServerMessageType.js";
import GameStatus from "./modules/GameStatus.js";
import Items from "./modules/Items.js";
import TicTacToeField from "./modules/TicTacToeField.js";
import Game from "./modules/Game.js";
import ClientAPI from "./modules/ClientAPI.js";
import MessageBuilder from "./modules/MessageBuilder.js";
import MessageType from "./modules/MessageType.js";

let websocket
let field
let game

window.addEventListener("load", () => {
    init()

    window.addEventListener("click", (e) => {
        if(e.target.classList.contains("grid-item")) {
            game.click(e.target)
        }
    })

    document.getElementById("joinGame").addEventListener("click", () => {
        let msg = new MessageBuilder(MessageType.JOIN).build()
        websocket.send(JSON.stringify(msg))
    })
})

function init() {
    websocket = new WebSocket("ws://ttt.belinkedmc.de:8080")
    field = new TicTacToeField(document.getElementsByClassName("grid-main")[0])
    field.updateGrid()
    window.field = field
    game = new Game(field, websocket)

    websocket.addEventListener("open", () => {
        console.log("Connected to serversocket")
    })

    websocket.addEventListener("message", (e) => {
        let data = JSON.parse(e.data)
        if(data.type === ServerMessageType.STATUS_CHANGE) {
            console.log("Status change to status " + data.content.status)
            if(data.content.status === GameStatus.INGAME) {
                console.log(`You are ingame now as ${Items.DISPLAY_TEXT[data.content.data.me]}`)
                game.me = data.content.data.me
                game.current = data.content.data.current
            }
            if(data.content.status === GameStatus.END) {
                if(data.content.data !== undefined) {
                    game.winner = data.content.data.winner
                }
            }
            game.setStatus(data.content.status)
        }
        if(data.type === ServerMessageType.FIELD_UPDATE) {
            game.field.field = data.content.field
            game.field.updateGrid()
            game.setCurrent(data.content.current)
            game.setNext(data.content.next)

            // TODO lock grids with data.content.locked

            for(let row = 0; row <= 2; row++) {
                for(let col = 0; col <= 2; col++) {
                    if(data.content.locked[row][col].locked) {
                        game.field.lock(row, col)
                        game.field.setLockItem(row, col, data.content.locked[row][col].lockItem)
                    } else {
                        game.field.unlock(row, col)
                    }
                }
            }

            game.updateText()
        }
    })

    websocket.addEventListener("close", () => {
        console.log("The websocket connection was closed")
        ClientAPI.setDisplayText("Lost connection, please reload")
    })

    websocket.addEventListener("error", (e) => {
        console.log("An error occurred")
    })
}