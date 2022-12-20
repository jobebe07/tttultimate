import Items from "./modules/Items.js";
import TicTacToeField from "./modules/TicTacToeField.js";
import hasParent from "./modules/utils.js";
let field
let current = Items.CROSS
window.addEventListener("load", () => {
    field = new TicTacToeField(document.getElementsByClassName("grid-main")[0])
    field.updateGrid()
    window.field = field
    window.hasParent = hasParent
})


window.addEventListener("click", (e) => {
    let result = field.getNumChords(e.target)
    if(result) {
        let gridChords = field.numToChords(result.fieldId)
        let itemChords = field.numToChords(result.itemId)

        if(field.getItem(gridChords.row, gridChords.col, itemChords.row, itemChords.col) != Items.DEFAULT) {
            field.setItem(gridChords.row, gridChords.col, itemChords.row, itemChords.col, current)
            if(current == Items.CROSS) current = Items.CIRCLE
            else if(current == Items.CIRCLE) current = Items.CROSS

        }

    }
})