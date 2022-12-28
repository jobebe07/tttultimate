let websocket = new WebSocket("ws://127.0.0.1:8080")

websocket.addEventListener("open", () => {
    console.log("Connected to serversocket")
})

websocket.addEventListener("message", (e) => {
    console.log(e.data)
})

websocket.addEventListener("close", () => {
    console.log("The websocket connection was closed")
})

websocket.addEventListener("error", (e) => {
    console.log("An error occurred")
})