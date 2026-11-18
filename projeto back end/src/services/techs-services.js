import { v4 } from "uuid"
import { db } from "../database/connection.js"

export async function getAllEqps() {
    const [eqps] = await db.query("SELECT * FROM equipamentos")

    return eqps
}

export async function getEqpById(id) {
    const [eqp] = await db.query("SELECT * FROM equipamentos WHERE id = ?", [id])

    return eqp
}

export async function getEqpPaginated(page = 1) {
    const limit = 5
    const offset = (page - 1) * limit

    const [eqps] = await db.query(
        "SELECT * FROM equipamentos LIMIT 5 OFFSET ?",
        [offset]
    )

    const [result] = await db.query(
        "SELECT COUNT(*) AS total FROM equipamentos"
    )

    const totalItems = result[0].total
    const totalPages = Math.ceil(totalItems / limit)

    return {
        data: eqps,
        pagination: {
            currentPage: page,
            limit,
            totalItems,
            totalPages
        }
    }
}

export async function postEqp(body) {
    const { name, categoria, numeroDeSerie, status } = body

    const eqp = await db.query("INSERT INTO equipamentos (id, name, categoria, numeroDeSerie, status,createdAt) VALUES (?, ?, ?, ?, ?, ?)", [v4(), name, categoria, numeroDeSerie, status, new Date()])

    return eqp
}

export async function deleteEqpService(id) {
    const [result] = await db.query("DELETE FROM equipamentos WHERE id = ?", [id])

    return "Equipament deleted!"
}

export async function putEqpService(id, body) {
    const { name, categoria, numeroDeSerie, status } = body

    const [eqps] = await db.query(
        `UPDATE equipamentos
         SET name = ?, categoria = ?, numeroDeSerie = ?, status = ?
         WHERE id = ?`,
        [name, categoria, numeroDeSerie, status, id]
    )

    if (eqps.affectedRows === 0) {
        return null
    }

    return "Equipment updated!"
}

export async function patchEqpService(id, body) {


    const index = eqps.findIndex(eqp => eqp.id === id)

    if (index === -1) {
        response.code(404).send({ message: "Equipament not found!" })
    }

    eqps[index] = { ...eqps[index], ...body }

    return "Equipament updated!"
}