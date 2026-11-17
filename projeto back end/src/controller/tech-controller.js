import { deleteEqpService, getAllEqps, getEqpById, patchEqpService, postEqp, putEqpService } from "../services/techs-services.js";


export async function listAllEqps(request, response) {
    const eqps = await getAllEqps()

    return response.code(200).send(eqps)
}

export async function listEqpById(request, response) {
    const eqp = await getEqpById(request.params.id)

    if (!eqp) {
        response.code(404).send({ message: "Eqp not found!" })
    }

    response.code(200).send(eqp)
}

export async function createEqp(request, response) {
    const newEqp = await postEqp(request.body)

    response.code(201).send(newEqp)
}

export async function deleteEqp(request, response) {
    const message = await deleteEqpService(request.params.id)

    response.code(202).send({ message: message })
}

export async function putEqp(request, response) {
    const message = await putEqpService(request.params.id, request.body)
    
    response.code(200).send({ message: message})
}

export async function patchEqp(request, response) {
    const message = await patchEqpService(request.params.id, request.body)

    response.code(200).send({ message: message})
}