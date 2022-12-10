import Items from "./Items.js";

export default class TicTacToeField {
    constructor(gridMain) {
        gridMain = document.getElementsByClassName("grid-main")[0]
        if(!gridMain.classList.contains("grid-main")) {
            this.valid = false
        }

        this.gridElem = gridMain;

        this.grid = new Array()
        this.grids = new Array()
        let current = 0
        for(let elem of gridMain.children) {
            // elem of gridmain --> fielditem[0] = gridsmall
            let currentFieldItem = elem
            let currentGrid = elem.children[0]
            let currentWinnerItem = elem.children[1]

            let row = (current % 3)
            let col = Math.floor(current / 3)
            
            let currentItems = new Array()

            this.grids[row][col] = currentGrid
            let gridCurrent = 0
            for(let gridItem of currentGrid) {
                let currentColumn = (gridCurrent % 3)
                let currentRow = Math.floor(gridCurrent / 3)
                currentItems[currentRow][currentColumn] = gridItem.children[0]
                gridCurrent++
            }

            this.grid[row][col].container = currentFieldItem
            this.grid[row][col].field = currentItems
            this.grid[row][col].winnerItem = currentWinnerItem

            currrent++
        }

        console.log(this.grid)

        for(let i = 0; i < 2; i++) {
            for(let a = 0; a < 2; a++) {
                for(let b = 0; b < 2; b++) {
                    for(let c = 0; c < 2; c++) {
                        this.field[i][a][b][c] = 0
                    }
                }
            }
        }
    }

    lock(row, col) {
        this.grid[row][col].container.classList.add("locked")
    }
    unlock() {
        this.grid[row][col].container.classList.add("locked")
    }
    setItem(row, col, fieldrow, fieldcol, item) {
        let image = this.grid[row][col].field[fieldrow][fieldcol]
        this.field[row][col][fieldrow][fieldcol] = item
        if(item == Items.CIRCLE) {
            image.src = "./assets/game/circle.png"
        } else if(item == Items.CROSS) {
            image.src = "./assets/game/cross.png"
        } else if(item == Items.DEFAULT) {
            image.src = "./assets/game/empty.png"
        }
    }
    updateGrid() {
        for(let row = 0; row < 2; row++) {
            for(let col = 0; col < 2; col++) {
                for(let fieldrow = 0; fieldrow < 2; fieldrow++) {
                    for(let fieldcol = 0; fieldcol < 2; fieldcol++) {
                        let val = "./assets/game/empty.png"
                        if(this.field[row][col][fieldrow][fieldcol] == Items.CIRCLE) {
                            val = "./assets/game/circle.png"
                        } else if (this.field[row][col][fieldrow][fieldcol] == Items.CROSS) {
                            val = "./assets/game/cross.png"
                        }
                        this.grid[row][col].field[fieldrow][fieldcol].src = val
                    }
                }
            }
        }
    }
}