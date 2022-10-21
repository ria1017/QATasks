const http = require('http')
const fs = require('fs')

const todos = []
const responseBody = {success: true, error: null, data: null}

const readFile = function (filename, response) {
    fs.readFile(filename, function (err, html) {
        if (err) {
            console.log(err)
            response.writeHead(500)
            responseBody.success = false
            responseBody.error = filename + " file not found"
            responseBody.data = null
            response.write(JSON.stringify(responseBody))
            response.end()
        } else {
            if (filename.endsWith('.html')) {
                response.writeHeader(200, {"Content-Type": "text/html"})
            } else if (filename.endsWith('.css')) {
                response.writeHeader(200, {"Content-Type": "text/css"})
            } else if (filename.endsWith('.js')) {
                response.writeHeader(200, {"Content-Type": "application/javascript"})
            }
            response.write(html)
            response.end()
        }
    })
}

const requestListener = function (req, res) {
    console.log(req.method)
    console.log(req.url)
    if (req.url == '/api/todos') {
        if (req.method == 'GET') {
            console.log(todos)
            res.writeHead(200)
            responseBody.success = true
            responseBody.error = null
            responseBody.data = todos
            res.end(JSON.stringify(responseBody))
        } else if (req.method == 'POST') {
            let data = ''
            req.on('data', chunk => {
                data = data + chunk // data += chunk
            })
            req.on('end', () => {
                let todo
                try {
                    todo = JSON.parse(data)
                } catch (error) {
                    res.writeHead(400)
                    responseBody.success = false
                    responseBody.error = error.message
                    responseBody.data = null
                    res.end(JSON.stringify(responseBody))
                    return
                }
                res.writeHead(201)
                todos.push(todo)
                responseBody.success = true
                responseBody.error = null
                responseBody.data = todo
                res.write(JSON.stringify(responseBody))
                res.end()
            })
        } else {
            res.writeHead(405)
            responseBody.success = false
            responseBody.error = "Method not allowed"
            responseBody.data = null
            res.write(JSON.stringify(responseBody))
            res.end()
        }
    } else if (req.url == '/') {
        if (req.method == 'GET') {
            readFile('./front/index.html', res)
        } else {
            res.writeHead(405)
            responseBody.success = false
            responseBody.error = "Method not allowed"
            responseBody.data = null
            res.write(JSON.stringify(responseBody))
            res.end()
        }
    } else if (req.url == '/css/style.css') {
        if (req.method == 'GET') {
            fs.readFile('./front/css/style.css', function (err, html) {
                if (err) {
                    console.log(err)
                    res.writeHead(500)
                    responseBody.success = false
                    responseBody.error = "style.css file not found"
                    responseBody.data = null
                    res.write(JSON.stringify(responseBody))
                    res.end()
                } else {
                    res.writeHeader(200, {"Content-Type": "text/css"})
                    res.write(html)
                    res.end()
                }
            })
        } else {
            res.writeHead(405)
            responseBody.success = false
            responseBody.error = "Method not allowed"
            responseBody.data = null
            res.write(JSON.stringify(responseBody))
            res.end()
        }
    } else if (req.url == '/js/index.js') {
        readFile('./front/js/index.js', res)
    } else {
        res.writeHead(404)
        res.end()
    }
    // res.writeHead(201)
    // res.end('Hello, Vasya!')
}

const server = http.createServer(requestListener)
server.listen(8080)
