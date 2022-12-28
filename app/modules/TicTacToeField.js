import Items from "./Items.js";
import hasParent from "./utils.js";

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

            let row = this.numToChords(current+1).row
            let col = this.numToChords(current+1).col
            
            let currentItems = [[], [], []]

            this.grids[row][col] = currentGrid
            let gridCurrent = 1
            for(let gridItem of currentGrid.children) {
                let currentColumn = this.numToChords(gridCurrent).col
                let currentRow = this.numToChords(gridCurrent).row

                currentItems[currentRow][currentColumn] = gridItem
                gridCurrent++
            }

            this.grid[row][col].container = currentFieldItem
            this.grid[row][col].field = currentItems
            this.grid[row][col].winnerItem = currentWinnerItem

            current++
        }

        this.field = []

        this.resetField()
    }

    resetField() {
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

        this.updateGrid()
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
        if(item === Items.CIRCLE) {
            imageContainer.classList.add("circle")
        } else if (item === Items.CROSS) {
            imageContainer.classList.add("cross")
        } else if(item === Items.DEFAULT) {
            imageContainer.classList.add("cross")
        }
    }

    getLockItem(row, col) {
        let container = this.grid[row][col].container
        let imageContainer = container.children[1]
        if(imageContainer.classList.contains("circle")) {
            return Items.CIRCLE
        } else if (imageContainer.classList.contains("cross")) {
            return Items.CROSS
        } else if (imageContainer.classList.contains("default")) {
            return Items.DEFAULT
        }
        return Items.DEFAULT
    }
    setItem(row, col, fieldrow, fieldcol, item) {
        let elem = this.grid[row][col].field[fieldrow][fieldcol]
        this.field[row][col][fieldrow][fieldcol] = item
        if(item === Items.CIRCLE) {
            elem.classList.add("circle")
        } else if(item === Items.CROSS) {
            elem.classList.add("cross")
        } else if(item === Items.DEFAULT) {
            elem.classList.add("default")
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
                        this.grid[row][col].field[fieldrow][fieldcol].classList.remove("circle", "default", "cross")

                        if(this.field[row][col][fieldrow][fieldcol] === Items.CIRCLE) {
                            this.grid[row][col].field[fieldrow][fieldcol].classList.add("circle")
                        } else if (this.field[row][col][fieldrow][fieldcol] === Items.CROSS) {
                            this.grid[row][col].field[fieldrow][fieldcol].classList.add("cross")
                        } else if (this.field[row][col][fieldrow][fieldcol] === Items.DEFAULT) {
                            this.grid[row][col].field[fieldrow][fieldcol].classList.add("default")
                        }
                    }
                }
            }
        }
    }

    numToChords(num) {
        num--
        let col = (num % 3)
        let row = Math.floor(num / 3)
        return {row:row, col:col,}
    }

    chordsToNum(row, col) {
        return ((row+1)*3) - (3-(col+1))
    }

    getNumChords(item) {
        let fieldItem = hasParent(item, ".grid-item")
        if(fieldItem) {
            let field = hasParent(fieldItem, ".field-item")
            if(fieldItem.hasAttribute("data-item-id") && field.hasAttribute("data-field-id")) {
                let itemId = fieldItem.getAttribute("data-item-id")
                let fieldId = field.getAttribute("data-field-id")

                return {fieldId:fieldId, itemId:itemId,}
            }
        }
        return false
    }
}