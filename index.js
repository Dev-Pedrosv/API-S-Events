const express = require('express')
const cors = require('cors')
const uuid = require('uuid')


const port = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use(cors())

const events = [
    {
        "id": uuid.v4(),
        "company": "Santander Events",
        "dateNumber": 17,
        "image": "https://www.santander.com.br/sites/WPC_CMS/imagem/21-09-08_194400_santander-banner.png?blobnocache=true",
        "dateString": "Dec",
        "priceMin": 20,
        "priceMax": 40,
        "hour": "19:00 PM",
        "adress": "Campinas",
        "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"

    },
    {
        "id": uuid.v4(),
        "company": "NuBank",
        "image": "https://www.datocms-assets.com/39397/1614171395-open-graph-logo-large-br.png",
        "dateNumber": 18,
        "dateString": "Dec",
        "priceMin": 15,
        "priceMax": 30,
        "hour": "15:00 PM",
        "adress": "Campinas",
        "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"

    },
    {
        "id": uuid.v4(),
        "company": "Thiago Nigro",
        "image": "https://cdn.domtotal.com/img/noticias/2021-04/1508874_482614.jpg",
        "dateNumber": 20,
        "dateString": "Dec",
        "priceMin": 25,
        "priceMax": 50,
        "hour": "20:00 PM",
        "adress": "Campinas",
        "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"

    },
    {
        "id": uuid.v4(),
        "company": "MBLabs",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnN9fMG4pBScU0rtjZ1p_de-ZJSmXFAx6AkcwzjEziS9PtCyBxqqwLvuMfd5YTqudYVMY&usqp=CAU",
        "dateNumber": 21,
        "dateString": "Dec",
        "priceMin": 20,
        "priceMax": 40,
        "hour": "17:00 PM",
        "adress": "Campinas",
        "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"

    },
    {
        "id": uuid.v4(),
        "company": "Tiago Fonseca",
        "image": "https://acessocultural.com.br/wp-content/uploads/2021/01/tiago-fonseca.jpg",
        "dateNumber": 22,
        "dateString": "Dec",
        "priceMin": 15,
        "priceMax": 30,
        "hour": "18:00 PM",
        "adress": "Campinas",
        "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"

    },
    {
        "id": uuid.v4(),
        "company": "Microsoft",
        "image": "https://marcasmais.com.br/wp-content/uploads/2020/11/logo-microsoft.png",
        "dateNumber": 23,
        "dateString": "Dec",
        "priceMin": 20,
        "priceMax": 40,
        "hour": "16:00 PM",
        "adress": "Campinas",
        "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"

    },
    {
        "id": uuid.v4(),
        "company": "Apple",
        "image": "https://wallery.app/dufovot/apple-logo-wallpaper-500x667.jpg",
        "dateNumber": 23,
        "dateString": "Dec",
        "priceMin": 20,
        "priceMax": 40,
        "hour": "19:00 PM",
        "adress": "Campinas",
        "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"

    },

]
const tickets = []


const checkId = (request, response, next) => {
    const { id } = request.params

    const index = events.findIndex(event => event.id == id)

    if (index < 0) {
        return response.status(404).json({ message: "Event not found" })
    }

    request.eventIndex = index
    request.eventId = id

    next()

}

app.get('/events', (request, response) => {

    return response.status(201).json(events)

})


app.get('/tickets', (request, response) => {

    return response.status(201).json(tickets)
})

app.post('/events', (request, response) => {

    const {
        company, image, dateNumber, dateString, priceMin, priceMax,
        hour, adress, about

    } = request.body

    const newEvent = {
        id: uuid.v4(), company, image,
        dateNumber, dateString, priceMin,
        priceMax, hour, adress, about
    }

    events.push(newEvent)

    return response.status(201).json(newEvent)

})

app.post('/tickets/:id', checkId, (request, response) => {
    const index = request.eventIndex
    tickets.push(events[index])

    return response.status(201).json(index)
})

app.delete('/tickets/:id', (request, response) => {

    const { id } = request.params

    const index = tickets.findIndex(event => event.id == id)

    if (index < 0) {
        return response.status(404).json({ message: "Event not found" })
    }

    tickets.splice(index, 1)

    return response.status(204).json(), console.log(tickets, index)
})

app.listen(port, () => {
    console.log(`Serve started ${port}`)
})
