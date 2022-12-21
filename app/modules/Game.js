import Items from "./Items.js";
import ClientAPI from "./ClientAPI.js";

export default class Game {
    constructor(field) {
        this.field = field
        this.current = Items.CROSS
        this.next = undefined




        this.updateText()
    }


    click(target) {
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