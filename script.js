const addtask = document.querySelector("#addtask")
const addtodo = document.querySelector("#addtodo")
const cross_addtodo = document.querySelector("#cross-addtodo")
const add_task_btn = document.querySelector("#add-task-btn")
const todo_form = document.querySelector("#todo-form")
const todolist = document.querySelector("#list")
const overlay = document.querySelector("#overlay")
const headeraddtask = document.querySelector("#headeraddtask")
const headerToday = document.querySelector("#headerToday")
const headerupcoming = document.querySelector("#headerupcoming")
const headersearch = document.querySelector("#header-search")
const search = document.querySelector(".search")
const searchcross = document.querySelector("#search-cross")
const searchtodo = document.querySelector("#searchtodo")
const searchinput = document.querySelector("#search-input")
const headerInbox = document.querySelector("#inbox")
const inboxSection = document.querySelector("#inboxSection")
const todayList = document.querySelector(".todayList")
const upcoming = document.querySelector("#upcoming")
const todaysection = document.querySelector("#todaySection")
const upcominglist = document.querySelector(".upcomingList")




let list = [];
let crossbtn = []
try {
    if (JSON.parse(localStorage.getItem('todo'))) {
        list = JSON.parse(localStorage.getItem('todo'))
    }

} catch (error) {

}
loadtodo()
let complete = document.querySelectorAll(".complete")
// console.log(complete)


function opentodo() {

    addtask.getBoundingClientRect();
    let rect = addtask.getBoundingClientRect()
    const screenX = rect.left + 200;
    const screenY = rect.top + 85;
    // console.log(screenX)
    // console.log(screenY)
    // console.log(window.screenY)

    // addtodo.style=`transform:translateY(${-rect.top}px)`
    addtodo.style.display = "block"
    overlay.style.display = "block"
    headersearch.style = "pointer-events:none"
    // addtodo.style.top=screenY+"px"

}
addtask.addEventListener("click", opentodo)
headeraddtask.addEventListener("click", opentodo)
headersearch.addEventListener("click", () => {
    search.style.display = "block"
    overlay.style.display = "block"
    headeraddtask.style = "pointer-events:none"


})
function clossaddtask() {
    headersearch.style = "pointer-events:all"

    addtodo.style.display = "none"
    overlay.style.display = "none"
}
cross_addtodo.addEventListener("click", (() => {

    clossaddtask()

}))
searchcross.addEventListener("click", () => {
    overlay.style.display = "none"
    search.style.display = "none"
    headeraddtask.style = "pointer-events:all"

})

todo_form.addEventListener("submit", ((e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const des = document.querySelector("#description").value;
    const date = document.querySelector("#dateinput").value;
    let id = "f" + Date.now().toString()
    const todayDate = getTodayDate()
    if (date<todayDate){
        alert("Sorry we dont have time machine.....")
        return
    }
    playsound("add.mp3")

    list.push({
        id: id,
        title: title,
        des: des,
        date: date
    })
    localStorage.setItem('todo', JSON.stringify(list))
    // console.log(list)
    todo_form.reset()
    todolist.appendChild(createTodo(title, des, date, id))
    todayTodo(title, des, date, id)
    upcomingTodo(title, des, date, id)
    opentodo()
    // console.log(localStorage.getItem('todo'))
    // location.reload()
    // console.log(complete)
    edittodo()
    clossaddtask()

    complete = document.querySelectorAll(".complete")
    deletetodo()
    activeinbox()

}))

function loadtodo() {
    try {
        data = list
        const todayDate = getTodayDate()
        if (data) {
            data.forEach(Element => {
                todolist.appendChild(createTodo(Element.title, Element.des, Element.date, Element.id))
                if (todayDate == Element.date) {
                    todayList.appendChild(createTodo(Element.title, Element.des, Element.date, Element.id))
                }
                if (todayDate < Element.date) {
                    upcominglist.appendChild(createTodo(Element.title, Element.des, Element.date, Element.id))
                }
            });
        }

    } catch (error) {

    }
    //    for(let i=0;i<data.length;i++){
    //     console.log(data[i])
    //    }
}



function createTodo(title, des, tododate, id) {

   
    
    const todo = document.createElement('div')
    todo.setAttribute("class", "todo")
    todo.setAttribute("id", `${id}`)
    const save = document.createElement('div')
    save.setAttribute("class", "save")
    const savebtn = document.createElement('i')
    savebtn.setAttribute("class", "fa-regular fa-floppy-disk")
    save.appendChild(savebtn)
    todo.appendChild(save)
    const leftside = document.createElement('div')
    leftside.setAttribute("class", "leftside")
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("class", "complete");
    // checkbox.id="complete"
    leftside.appendChild(checkbox)
    todo.appendChild(leftside)
    const rightside = document.createElement("div")
    rightside.setAttribute("class", "rightside")
    const headline = document.createElement("input")
    headline.setAttribute("class", "titlefield")
    headline.setAttribute("type", "text")
    headline.setAttribute("disabled", "true")
    headline.setAttribute("required", "true")
    headline.setAttribute("value", `${title}`)
    // headline.innerHTML=title
    const description = document.createElement("input")
    description.setAttribute("class", "titlefield")
    description.setAttribute("type", "text")
    description.setAttribute("disabled", "true")
    description.setAttribute("required", "true")
    description.setAttribute("value", `${des}`)
    // description.innerHTML=des
    rightside.appendChild(headline)
    rightside.appendChild(description)
    const date = document.createElement("div")
    date.setAttribute("class", "date")
    const dateicon = document.createElement("input")
    dateicon.setAttribute("type", "date")
    dateicon.setAttribute("value", `${tododate}`)
    dateicon.setAttribute("disabled", "true")
    // dateicon.setAttribute("class","fa-calendar")
    // const datelabel=document.createElement("label")
    // datelabel.innerHTML=tododate
    date.appendChild(dateicon)
    // date.appendChild(datelabel)
    rightside.appendChild(date)
    const cross = document.createElement("i")
    cross.setAttribute("class", "fa-regular fa-pen-to-square")
    crossbtn.push(cross)
    // console.log(crossbtn)
    // cross.setAttribute("class","fa-pen-to-square")
    todo.appendChild(rightside)
    todo.appendChild(cross)


    // todolist.appendChild(todo)
    return todo



}

deletetodo()
// console.log(complete)
function deletetodo() {
    if (complete) {
        console.log("complete")

        complete.forEach((e) => {
            // console.log(e)
            e.addEventListener("click", ((e) => {
                playsound("complete.mp3")

                let todo = e.target.parentElement.parentElement.id
                // console.log(list)
                list.forEach((Element) => {
                    if (Element.id == todo) {
                        // console.log("got it")
                        let index = list.indexOf(Element)
                        // console.log(index)

                        if (index != -1) {
                            // console.log("got ittt")

                            list.splice(index, 1)
                            // console.log(list)
                            localStorage.setItem('todo', JSON.stringify(list))
                            removefromtoday(todo)
                            removefromupcoming(todo)
                            removefrominbox(todo)
                            // todolist.removeChild(e.target.parentElement.parentElement)
                            console.log(e.target.parentElement.parentElement)
                            // todayList.removeChild(e.target.parentElement.parentElement)
                            // // location.reload()
                            // console.log(list)
                        }
                    }
                })
                // console.log(list)
                // console.log("deleted")



            }))
        })
    }
}



// complete.addEventListener("click",(()=>{
//     console.log("sam");
// }))
function edittodo() {
    crossbtn.forEach((e) => {
        // console.log(e.parentElement)
        e.addEventListener("click", (() => {
            e.parentElement.childNodes[2].childNodes[0].disabled = false
            e.parentElement.childNodes[2].childNodes[0].focus()
            e.parentElement.childNodes[2].childNodes[1].disabled = false
            e.parentElement.childNodes[2].childNodes[2].firstChild.disabled = false
            e.style.display = "none"
            const savebtn = e.parentElement.childNodes[0]
            savebtn.style.display = "block"

            savebtn.addEventListener("click", (() => {
                const title = e.parentElement.childNodes[2].childNodes[0].value
                const description = e.parentElement.childNodes[2].childNodes[1].value
                const date = e.parentElement.childNodes[2].childNodes[2].firstChild.value
                const id = e.parentElement.id
                if (title && description && date) {
                    playsound("save.mp3")
                    list.forEach((Element) => {
                        if (id == Element.id) {
                            Element.title = title
                            Element.des = description
                            Element.date = date
                            localStorage.setItem("todo", JSON.stringify(list))
                        }
                    })
                    savebtn.style.display = "none"
                    e.style.display = "block"
                    e.parentElement.childNodes[2].childNodes[0].disabled = true

                    e.parentElement.childNodes[2].childNodes[1].disabled = true
                    e.parentElement.childNodes[2].childNodes[2].firstChild.disabled = true
                    edittodayTodo(title, description, date, id)
                    editupcomingTodo(title, description, date, id)
                    editinboxTodo(title, description, date, id)
                }
                else {
                    alert("empty field not allowed")
                }

            }))


        }))
    })
    // todayTodo()
}
edittodo()


function playsound(track) {
    const sound = new Audio(track)
    // sound.currentTime = 0;
    sound.play()

}

function searchvalue(list, todo) {
    let output = []
    list.forEach((ele) => {
        if (ele.title == todo) {
            output.push(ele)
        }
    })
    return output;
}

searchtodo.addEventListener("click", () => {
    const searchedTodo = searchvalue(list, searchinput.value)
    // console.log(searchedTodo)
    todolist.innerHTML = ""

    searchedTodo.forEach((Element) => {
        // console.log("check")
        todolist.appendChild(createTodo(Element.title, Element.des, Element.date, Element.id))
    })
    activeinbox()
    overlay.style.display = "none"
    headeraddtask.style = "pointer-events:all"
    search.style.display = "none"
})



function activeinbox(){
    todaysection.style = "transform:translateY(0)"
    inboxSection.style = "transform:translateY(0)"
    upcoming.style = "transform:translateY(150%)"
    todaysection.childNodes[1].setAttribute("class","")
    inboxSection.childNodes[1].setAttribute("class","toptitle activetoptitle")
    upcoming.childNodes[1].setAttribute("class","")
    headerInbox.setAttribute("class","option active")
    headerToday.setAttribute("class","option")
    headerupcoming.setAttribute("class","option")
}


headerInbox.addEventListener("click", () => {
    
    activeinbox()
})


headerToday.addEventListener("click", () => {

    todaysection.style = "transform:translateY(-100%)"
    inboxSection.style = "transform:translateY(-150%)"
    upcoming.style = "transform:translateY(150%)"
    todaysection.childNodes[1].setAttribute("class","toptitle activetoptitle")
    upcoming.childNodes[1].setAttribute("class","")
    inboxSection.childNodes[1].setAttribute("class","")

    headerInbox.setAttribute("class","option")
    headerToday.setAttribute("class","option active")
    headerupcoming.setAttribute("class","option")
  



})

headerupcoming.addEventListener("click", () => {
    todaysection.style = "transform:translateY(-200%)"
    inboxSection.style = "transform:translateY(-150%)"
    upcoming.style = "transform:translateY(-200%)"
    upcoming.childNodes[1].setAttribute("class","toptitle activetoptitle")
    inboxSection.childNodes[1].setAttribute("class","")
    todaysection.childNodes[1].setAttribute("class","")

    headerInbox.setAttribute("class","option")
    headerToday.setAttribute("class","option")
    headerupcoming.setAttribute("class","option active")

})








function getTodayDate() {
    let date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const todayDate = `${year}-${month}-${day}`
    return todayDate
}


function todayTodo(title, des, date, id) {

    const todayDate = getTodayDate()
    // console.log(todayDate)

    if (date == todayDate) {
        todayList.appendChild(createTodo(title, des, date, id))

    }

}
function upcomingTodo(title, des, date, id) {

    const todayDate = getTodayDate()
    // console.log(todayDate)

    if (date > todayDate) {

        upcominglist.appendChild(createTodo(title, des, date, id))

    }

}
function removefromtoday(id) {
    todayList.childNodes.forEach((Element) => {
        if (Element.id == id) {
            todayList.removeChild(Element)
        }
        else {
            console.log("error todaylisst")
        }
    })
}
function removefromupcoming(id) {
    upcominglist.childNodes.forEach((Element) => {
        if (Element.id == id) {
            upcominglist.removeChild(Element)
        }
        else {
            console.log("error todaylisst")
        }
    })
}
function removefrominbox(id) {
    todolist.childNodes.forEach((Element) => {
        if (Element.id == id) {
            todolist.removeChild(Element)
        }
        else {
            console.log("error todaylisst")
        }
    })
}


function edittodayTodo(title, des, date, id) {
    otheredittask(todayList.childNodes, title, des, date, id)


}
function editupcomingTodo(title, des, date, id) {
    otheredittask(upcominglist.childNodes, title, des, date, id)


}
function editinboxTodo(title, des, date, id) {
    otheredittask(todolist.childNodes, title, des, date, id)


}

function otheredittask(child, title, des, date, id) {
    child.forEach((Element) => {
        if (Element.id == id) {
            Element.childNodes[2].childNodes[0].value = title
            Element.childNodes[2].childNodes[1].value = des
            Element.childNodes[2].childNodes[2].value = date
        }
    })
}