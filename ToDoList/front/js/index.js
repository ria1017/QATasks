window.addEventListener('load', () => {
    const api = '/api/todos'
    const createButton = document.querySelector('#create-todo')
    const newTodo = document.querySelector('#new-todo')
    const todoList = document.querySelector('#todo-list')

    let request = new XMLHttpRequest()
    request.open('GET', api, true)
    request.onload = () => {
        if (request.status == 200) {
            let todoResponse = JSON.parse(request.response).data
            for (let i = 0; i < todoResponse.length; i = i + 1) {  //i++ 
                let li = document.createElement('li')
                li.innerText = todoResponse[i].todo
                todoList.appendChild(li)
            }

        } else {
            alert('ERROR')
        }
    }
    request.send()

    createButton.addEventListener('click', () => {

        console.log(newTodo.value)
        let request = new XMLHttpRequest()
        request.open('POST', api, true)
        request.onload = () => {
            if (request.status == 201) {
                let todoResponse = JSON.parse(request.response).data.todo
                let li = document.createElement('li')
                li.innerText = todoResponse
                todoList.appendChild(li)
                newTodo.value = ''

            } else {
                alert('ERROR')
            }
        }
        const todo = {
            todo: newTodo.value
        }
        request.send(JSON.stringify(todo))
    })
})
