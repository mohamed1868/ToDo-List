let input = document.querySelector(".input")
let add = document.querySelector(".add")
let tasks = document.querySelector(".tasks")
let del = document.querySelector(".dele")
let arrayoftasks = []

if (window.localStorage.tasks) {
    arrayoftasks = JSON.parse(window.localStorage.tasks)
}


getdatafromlocal();

add.onclick = function() {
    if (input.value !== "") {
        addtasktoarray(input.value);
        input.value = ""
    } else {
        if (tasks.children.length === 0) {
            tasks.innerHTML = "Palse Enter Data"
        }

    }
}
tasks.addEventListener("click", (el) => {
    if (el.target.classList.contains("del")) {
        deletetaskwith(el.target.parentElement.getAttribute("data-id"))
        el.target.parentElement.remove();

    }
    if (el.target.classList.contains("task")) {

        el.target.classList.toggle("done")

        addclassdonelocal(el.target.getAttribute("data-id"))
    }

})


del.onclick = function() {
    if (tasks.children.length >= 1) {
        tasks.innerHTML = "delete successful"
        window.localStorage.clear()
        arrayoftasks = []
    }


}


function addtasktoarray(tasktext) {
    const task = {
        id: Date.now(),
        title: tasktext,
        completed: false,
    }
    arrayoftasks.push(task)
        // add body
    addelementstopagefrom(arrayoftasks)
        // add localStorage
    adddatatolocalefrom(arrayoftasks)
}

function addelementstopagefrom(arrayoftasks) {
    tasks.innerHTML = ""
    arrayoftasks.forEach((ele) => {
        let div = document.createElement("div")
        div.className = "task"
        if (ele.completed) {
            div.className = "task done"
        }
        div.setAttribute("data-id", ele.id)
        div.appendChild(document.createTextNode(ele.title))
        let span = document.createElement("span")
        span.appendChild(document.createTextNode("Delete"))
        span.className = "del"
        div.appendChild(span)
        tasks.appendChild(div)
    });
}

function adddatatolocalefrom(arrayoftasks) {

    window.localStorage.tasks = JSON.stringify(arrayoftasks)

}

function getdatafromlocal() {
    let data = window.localStorage.tasks
    if (data) {
        let tasks = JSON.parse(data)
        addelementstopagefrom(tasks)
    }

}

function deletetaskwith(taskid) {
    arrayoftasks = arrayoftasks.filter((el) => el.id != taskid)
    adddatatolocalefrom(arrayoftasks)
}

function addclassdonelocal(el) {
    arrayoftasks.forEach((ele) => {
        if (ele.id == el) {
            ele.completed == false ? (ele.completed = true) : (ele.completed = false)

        }
        adddatatolocalefrom(arrayoftasks)
    })
}