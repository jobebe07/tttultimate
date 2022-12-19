import TicTacToeField from "./modules/TicTacToeField.js";
import hasParent from "./modules/utils.js";

window.addEventListener("load", () => {
    let field = new TicTacToeField(document.getElementsByClassName("grid-main")[0])
    field.updateGrid()
    window.field = field
    window.hasParent = hasParent
})


window.addEventListener("click", (e) => {

})