export default class Game {
    constructor(field) {
        this.next = undefined
        this.field = field
        this.running = true
    }

    setNext(next) {
        this.next = next

        if(this.next !== undefined) {
            let nextFieldChords = this.field.numToChords(this.next)

            for(let elem of document.getElementsByClassName("current-grid")) {
                elem.classList.remove("current-grid")
            }

            if(!this.field.isLocked(nextFieldChords.row, nextFieldChords.col)) {
                this.field.gridElem.children.item(this.next-1).classList.add("current-grid")
            } else {
                this.field.gridElem.classList.add("current-grid")
            }
        } else {
            for(let elem of document.getElementsByClassName("current-grid")) {
                elem.classList.remove("current-grid")
            }
            this.field.gridElem.classList.add("current-grid")
        }

    }

    quit() {
        this.field.resetField()
        this.running = false
    }
}