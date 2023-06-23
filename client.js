const socket = io("http://localhost:8000")

const name = prompt("Enter Your Name to Join the Chat : ")
socket.emit("new-user-join",name)


const message = document.getElementById("message")
const first = document.getElementById("first")
const form = document.getElementById("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const msg = message.value
    appendMessage(`${msg}: You`,"right")

    socket.emit('send',msg)
    message.value=""
})


function appendMessage(msg,position){
    const msgElem = document.createElement("div")
    msgElem.innerText=msg
    msgElem.classList.add("alert")
    msgElem.classList.add("alert-success")
    msgElem.classList.add("message")
    msgElem.classList.add(position)
    first.append(msgElem)
}

socket.on("user-joined",(name)=>{
    appendMessage(`${name} joined the Chat`,"left")
})
socket.on("left",(name)=>{
    appendMessage(`${name} Left the Chat`,"left")
})
socket.on("receive",(data)=>{
    appendMessage(`${data.message} : ${data.name}`,"left")
})


