export default class ClientAPI {
    constructor() {
    }
    static setDisplayText(text) {
        document.getElementById("status").innerHTML = text
    }
}