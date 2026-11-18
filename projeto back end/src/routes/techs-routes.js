import { createEqp, deleteEqp, getTechs, listAllEqps, listEqpById, patchEqp, putEqp } from "../controller/tech-controller.js"

export async function techsRoutes(app) {

    

    app.get('/:id', listEqpById)

    app.get("/", getTechs);

    app.post('/', createEqp)    

    app.delete('/:id', deleteEqp)

    app.put('/:id', putEqp)

    app.patch('/:id', patchEqp)
}