import Items from "./Items.js";
import ClientAPI from "./ClientAPI.js";
import MessageBuilder from "./MessageBuilder.js";
import MessageType from "./MessageType.js";
import GameStatus from "./GameStatus.js";
import Game from "./Game.js";
import ServerMessageType from "./ServerMessageType.js";

export default class OnlineGame extends Game{
    constructor(field, ws) {
        super(field)
        this.field = field
        this.ws = ws
        this.current = undefined
        this.me = undefined
        this.next = undefined
        this.winner = undefined
        this.status = GameStatus.WAITING



        this.updateText()
        this.initWebsocket()
    }

    quit() {
        super.quit()
        this.ws.close()
    }

    initWebsocket() {
        this.ws.addEventListener("open", () => {
            console.log("Connected to serversocket")
        })

        this.ws.addEventListener("message", (e) => {
            let data = JSON.parse(e.data)
            if(data.type === ServerMessageType.STATUS_CHANGE) {
                console.log("Status change to status " + data.content.status)
                if(data.content.status === GameStatus.INGAME) {
                    console.log(`You are ingame now as ${Items.DISPLAY_TEXT[data.content.data.me]}`)
                    this.me = data.content.data.me
                    this.current = data.content.data.current
                }
                if(data.content.status === GameStatus.END) {
                    if(data.content.data !== undefined) {
                        this.winner = data.content.data.winner
                    }
                }
                this.setStatus(data.content.status)
            }
            if(data.type === ServerMessageType.FIELD_UPDATE) {
                this.field.field = data.content.field
                this.field.updateGrid()
                this.setCurrent(data.content.current)
                this.setNext(data.content.next)

                // TODO lock grids with data.content.locked

                for(let row = 0; row <= 2; row++) {
                    for(let col = 0; col <= 2; col++) {
                        if(data.content.locked[row][col].locked) {
                            this.field.lock(row, col)
                            this.field.setLockItem(row, col, data.content.locked[row][col].lockItem)
                        } else {
                            this.field.unlock(row, col)
                        }
                    }
                }

                this.updateText()
            }
        })

        this.ws.addEventListener("close", () => {
            console.log("The websocket connection was closed")
            ClientAPI.setDisplayText("Lost connection, please reload")
        })

        this.ws.addEventListener("error", (e) => {
            console.log("An error occurred")
        })
    }

    setCurrent(current) {
        this.current = current
    }

    setMe(me) {
        this.me = me
    }

    setStatus(status) {
        this.status = status

        if(this.status === GameStatus.END) {
            this.field.resetField()
            this.setNext(undefined)
        }

        this.updateText()
    }


    click(target) {
        if(this.status !== GameStatus.INGAME) return false

        if(this.current !== this.me) return false

        if(!target) return false

        let result = this.field.getNumChords(target)

        let gridChords = this.field.numToChords(result.fieldId)
        let itemChords = this.field.numToChords(result.itemId)

        let msg = new MessageBuilder(MessageType.MOVE,
            {row: gridChords.row, col:gridChords.col, fieldRow: itemChords.row, fieldCol: itemChords.col}
        ).build()

        this.ws.send(JSON.stringify(msg))
    }

    updateText() {
        if(this.status === GameStatus.INGAME) {
            if(this.current === this.me) {
                ClientAPI.setDisplayText(`Your turn (You are ${Items.DISPLAY_TEXT[this.me]})`)
            } else {
                ClientAPI.setDisplayText(`Waiting for opponent (${Items.DISPLAY_TEXT[this.current]})`)
            }

            document.getElementById("joinGame").disabled = true
            document.getElementById("back").disabled = true
        } else if(this.status === GameStatus.WAITING) {
            ClientAPI.setDisplayText("Waiting for opponent to join")
            document.getElementById("joinGame").disabled = true
            document.getElementById("back").disabled = false
        } else if(this.status === GameStatus.END) {
            if(this.winner !== undefined) {
                ClientAPI.setDisplayText((this.winner === this.me ? "Victory!" : "Defeat!"))
            } else  {
                ClientAPI.setDisplayText("Game ended")
            }
            document.getElementById("joinGame").disabled = false
            document.getElementById("back").disabled = false
        } else if(this.status === GameStatus.INACTIVE) {
            ClientAPI.setDisplayText("Ready to join")
            document.getElementById("joinGame").disabled = false
            document.getElementById("back").disabled = false
        }


    }
}