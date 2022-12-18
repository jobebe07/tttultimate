import TicTacToeField from "./modules/TicTacToeField.js";

window.addEventListener("load", () => {
    let field = new TicTacToeField(document.getElementsByClassName("grid-main")[0])
    field.updateGrid()
    window.field = field
})


