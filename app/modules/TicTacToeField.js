import Items from "./Items.js";

export default class TicTacToeField {
    constructor(gridMain) {
        gridMain = document.getElementsByClassName("grid-main")[0]
        if(!gridMain.classList.contains("grid-main")) {
            this.valid = false
        }

        this.gridElem = gridMain;

        this.grid = [[
                {container:undefined, field:undefined, winnerItem:undefined,},
                {container:undefined, field:undefined, winnerItem:undefined,},
                {container:undefined, field:undefined, winnerItem:undefined,}
            ],
            [
                {container:undefined, field:undefined, winnerItem:undefined,},
                {container:undefined, field:undefined, winnerItem:undefined,},
                {container:undefined, field:undefined, winnerItem:undefined,}
            ],
            [
                {container:undefined, field:undefined, winnerItem:undefined,},
                {container:undefined, field:undefined, winnerItem:undefined,},
                {container:undefined, field:undefined, winnerItem:undefined,}
            ]
        ]
        this.grids = [[], [], []]
        let current = 0
        for(let elem of gridMain.children) {
            // elem of gridmain --> fielditem[0] = gridsmall
            let currentFieldItem = elem
            let currentGrid = elem.children[0]
            let currentWinnerItem = elem.children[1]

            let row = (current % 3)
            let col = Math.floor(current / 3)
            
            let currentItems = [[], [], []]

            this.grids[row][col] = currentGrid
            let gridCurrent = 0
            for(let gridItem of currentGrid.children) {
                let currentColumn = (gridCurrent % 3)
                let currentRow = Math.floor(gridCurrent / 3)

                if(gridItem.children[0] === undefined) {
                    let image = document.createElement("img")
                    image.classList.add("w-100p", "h-100p")
                    gridItem.appendChild(image)
                }

                currentItems[currentRow][currentColumn] = gridItem.children[0]
                gridCurrent++
            }

            this.grid[row][col].container = currentFieldItem
            this.grid[row][col].field = currentItems
            this.grid[row][col].winnerItem = currentWinnerItem

            current++
        }

        this.field = []

        for(let i = 0; i <= 2; i++) {
            this.field[i] = []
            for(let a = 0; a <= 2; a++) {
                this.field[i][a] = []
                for(let b = 0; b <= 2; b++) {
                    this.field[i][a][b] = []
                    for(let c = 0; c <= 2; c++) {
                        this.field[i][a][b][c] = 0
                    }
                }
            }
        }
    }

    lock(row, col) {
        this.grid[row][col].container.classList.add("field-locked")
    }
    unlock(row, col) {
        this.grid[row][col].container.classList.remove("field-locked")
    }
    isLocked(row, col) {
        return this.grid[row][col].container.classList.contains("field-locked")
    }
    setLockItem(row, col, item) {
        let container = this.grid[row][col].container
        let imageContainer = container.children[1]
        let image = imageContainer.children[0]

        let val = "./assets/game/empty.png"
        if(image === undefined) {
            image = document.createElement("img")
            image.classList.add("w-100p", "h-100p")
            imageContainer.appendChild(image)
        }
        if(item === Items.CIRCLE) {
            val = "./assets/game/circle.png"
        } else if (item === Items.CROSS) {
            val = "./assets/game/cross.png"
        }
        image.src = val
    }
    /** Doesnt work */
    getLockItem(row, col) {
        let container = this.grid[row][col].container
        let imageContainer = container.children[1]
        let image = imageContainer.children[0]
        if(image.src == "./assets/game/circle.png") {
            return Items.CIRCLE
        } else if (image.src == "./assets/game/cross.png") {
            return Items.CROSS
        } else if (image.src == "./assets/game/empty.png") {
            return Items.DEFAULT
        }
        return undefined
    }
    setItem(row, col, fieldrow, fieldcol, item) {
        let image = this.grid[row][col].field[fieldrow][fieldcol]
        this.field[row][col][fieldrow][fieldcol] = item
        if(item === Items.CIRCLE) {
            image.src = "./assets/game/circle.png"
        } else if(item === Items.CROSS) {
            image.src = "./assets/game/cross.png"
        } else if(item === Items.DEFAULT) {
            image.src = "./assets/game/empty.png"
        }
        this.updateGrid()
    }

    getItem(row, col, fieldrow, fieldcol) {
        let image = this.grid[row][col].field[fieldrow][fieldcol]
        let item = this.field[row][col][fieldrow][fieldcol]
        if(item === Items.CIRCLE) {
            return Items.CIRCLE
        } else if(item === Items.CROSS) {
            return Items.CROSS
        } else if(item === Items.DEFAULT) {
            return Items.DEFAULT
        }
        return Items.DEFAULT
    }
    updateGrid() {
        for(let row = 0; row <= 2; row++) {
            for(let col = 0; col <= 2; col++) {
                for(let fieldrow = 0; fieldrow <= 2; fieldrow++) {
                    for(let fieldcol = 0; fieldcol <= 2; fieldcol++) {
                        let val = "./assets/game/empty.png"
                        if(this.field[row][col][fieldrow][fieldcol] === Items.CIRCLE) {
                            val = "./assets/game/circle.png"
                        } else if (this.field[row][col][fieldrow][fieldcol] === Items.CROSS) {
                            val = "./assets/game/cross.png"
                        }
                        this.grid[row][col].field[fieldrow][fieldcol].src = val
                    }
                }
            }
        }
    }
}