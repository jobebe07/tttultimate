import Items from "./Items.js";
import ClientAPI from "./ClientAPI.js";
import Game from "./Game.js";

export default class LocalGame extends Game {
    constructor(field) {
        super(field)
        this.current = Items.CROSS


        this.updateText()
    }


    click(target) {
        if(!this.running) return false

        if(!target) return false

        let result = this.field.getNumChords(target)

        let gridChords = this.field.numToChords(result.fieldId)
        let itemChords = this.field.numToChords(result.itemId)

        if(this.field.getItem(gridChords.row, gridChords.col, itemChords.row, itemChords.col) === Items.DEFAULT) {
            if(this.field.isLocked(gridChords.row, gridChords.col)) return false

            let nextFieldChords = this.field.numToChords(this.next)
            if(this.field.chordsToNum(gridChords.row, gridChords.col) != this.next && this.next != undefined && !this.field.isLocked(nextFieldChords.row, nextFieldChords.col)) {
                return false
            }
            this.field.setItem(gridChords.row, gridChords.col, itemChords.row, itemChords.col, this.current)
            this.next = this.field.chordsToNum(itemChords.row, itemChords.col)

            let checkWinnerReturn = this.checkWinner(gridChords.row, gridChords.col)
            if(checkWinnerReturn != false) {
                this.field.setLockItem(gridChords.row, gridChords.col, checkWinnerReturn)
                this.field.lock(gridChords.row, gridChords.col)
            }


            nextFieldChords = this.field.numToChords(this.next)

            for(let elem of document.getElementsByClassName("current-grid")) {
                elem.classList.remove("current-grid")
            }

            if(this.checkWinnerGlobal() !== false) {
                this.running = false
                ClientAPI.setDisplayText(Items.DISPLAY_TEXT[this.checkWinnerGlobal()] + " has won!")
                return false
            }


            if(!this.field.isLocked(nextFieldChords.row, nextFieldChords.col)) {
                this.field.gridElem.children.item(this.next-1).classList.add("current-grid")
            } else {
                this.field.gridElem.classList.add("current-grid")
            }

            this.swap()
            this.updateText()
        }
    }

    updateText() {
        ClientAPI.setDisplayText("Your turn, " + Items.DISPLAY_TEXT[this.current])

    }

    swap() {
        if(this.current === Items.CROSS) this.current = Items.CIRCLE
        else if(this.current === Items.CIRCLE) this.current = Items.CROSS
    }

    checkWinner(row, col) {
        return this.checkField(this.field.field[row][col], Items.DEFAULT)
    }

    checkWinnerGlobal() {
        let array = []
        for(let row = 0; row <= 2; row++) {
            array[row] = []
            for(let col = 0; col <= 2; col++) {
                array[row][col] = this.field.getLockItem(row, col)
            }
        }
        return this.checkField(array, Items.DEFAULT)
    }

    checkField(array, ex) {
        try {
            if(array[0][0] == array[0][1] && array[0][0] == array[0][2] && array[0][0] != ex) {
                return array[0][0]
            }
            if(array[1][0] == array[1][1] && array[1][0] == array[1][2] && array[1][0] != ex) {
                return array[1][0]
            }
            if(array[2][0] == array[2][1] && array[2][0] == array[2][2] && array[2][0] != ex) {
                return array[2][0]
            }

            if(array[0][0] == array[1][0] && array[0][0] == array[2][0] && array[0][0] != ex) {
                return array[0][0]
            }
            if(array[0][1] == array[1][1] && array[0][1] == array[2][1] && array[0][1] != ex) {
                return array[0][1]
            }
            if(array[0][2] == array[1][2] && array[0][2] == array[2][2] && array[0][2] != ex) {
                return array[0][2]
            }

            if(array[0][0] == array[1][1] && array[0][0] == array[2][2] && array[0][0] != ex) {
                return array[0][0]
            }
            if(array[0][2] == array[1][1] && array[0][2] == array[2][0] && array[0][2] != ex) {
                return array[0][2]
            }
        } catch (ex) {

        }
        return false
    }
}