import Items from "./modules/Items.js";
import TicTacToeField from "./modules/TicTacToeField.js";
import hasParent from "./modules/utils.js";
import Game from "./modules/Game.js";

let field
let game

window.addEventListener("load", () => {
    field = new TicTacToeField(document.getElementsByClassName("grid-main")[0])
    field.updateGrid()
    window.field = field
    window.hasParent = hasParent
    game = new Game(field)
    window.game = game
})


window.addEventListener("click", (e) => {
    if(e.target.classList.contains("grid-item")) {
        game.click(e.target)
    }
})