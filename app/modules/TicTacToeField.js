export default class TicTacToeField {
    constructor(gridMain) {
        let gridMain = document.getElementsByClassName("grid-main")[0]
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
    }
}