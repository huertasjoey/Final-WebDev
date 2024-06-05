const conn = new WebSocket('ws://localhost:8080')

conn.addEventListener("message", (message)=>{

})

function send_message(){
    chat = document.getElementById("message_field").value
    const message = JSON.stringify(
        {
            user : user,
            data : chat
        }
    )
    conn.send(message)
    document.getElementById("message_field").value = ""
}