
import { useEffect, useState } from "react"
import { FormContainer, MainContainer, TechListContainer } from "./style"
import axios from "axios"

export function Main() {
    const [techs, setTechs] = useState([])
    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const [totalPages, setTotalPages] = useState(1)

    const [selectedId, setSelectedId] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        categoria: '',
        numeroDeSerie: '',
        status: '',
    })

    const fetchTechs = async () => {
        try {
            setLoading(true)

            const response = await axios.get(
                `http://localhost:3000/techs?page=${currentPage}&limit=${itemsPerPage}`
            )

            console.log("Resposta da API:", response.data)

            const equipamentos = Array.isArray(response.data)
                ? response.data
                : response.data?.data

            if (!Array.isArray(equipamentos)) {
                throw new Error("A API não retornou uma lista válida.")
            }

            setTechs(equipamentos)

            setTotalPages(
                response.data?.pagination?.totalPages || 1
            )

        } catch (error) {
            console.log(
                "Erro ao buscar equipamentos:",
                error.response?.data || error.message
            )

            setTechs([])
            setTotalPages(1)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTechs()
    }, [currentPage])

    const clearForm = () => {
        setFormData({
            name: '',
            categoria: '',
            numeroDeSerie: '',
            status: '',
        })

        setSelectedId(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post(
                'http://localhost:3000/techs',
                formData
            )

            clearForm()

            if (currentPage !== 1) {
                setCurrentPage(1)
            } else {
                await fetchTechs()
            }

            alert('Equipamento cadastrado com sucesso!')

        } catch (error) {
            console.log('Erro ao cadastrar:', error)
            alert('Erro ao cadastrar equipamento!')
        }
    }

    const handleSelectTech = (eqp) => {
        setSelectedId(eqp.id)

        setFormData({
            name: eqp.name,
            categoria: eqp.categoria,
            numeroDeSerie: eqp.numeroDeSerie,
            status: eqp.status,
        })
    }

    const handleEdit = async () => {
        if (!selectedId) {
            alert('Selecione um equipamento para editar!')
            return
        }

        try {
            await axios.put(
                `http://localhost:3000/techs/${selectedId}`,
                formData
            )

            clearForm()
            await fetchTechs()

            alert('Equipamento atualizado com sucesso!')

        } catch (error) {
            console.log(error)
            alert('Erro ao atualizar equipamento!')
        }
    }

    const handleDelete = async () => {
        if (!selectedId) {
            alert('Selecione um equipamento para excluir!')
            return
        }

        const confirmar = window.confirm(
            'Deseja realmente excluir este equipamento?'
        )

        if (!confirmar) return

        try {
            await axios.delete(
                `http://localhost:3000/techs/${selectedId}`
            )

            clearForm()

            if (techs.length === 1 && currentPage > 1) {
                setCurrentPage(prev => prev - 1)
            } else {
                await fetchTechs()
            }

            alert('Equipamento excluído com sucesso!')

        } catch (error) {
            console.log(error)
            alert('Erro ao excluir equipamento!')
        }
    }

    const formatDate = (date) => {
        if (!date) return "-"

        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    return (
        <MainContainer>

            <TechListContainer>

                <h1>Painel administrativo</h1>

                <h2>Cadastro de Equipamentos:</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Nome"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Categoria"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleInputChange}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Número de Série"
                        name="numeroDeSerie"
                        value={formData.numeroDeSerie}
                        onChange={handleInputChange}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    />

                    <button type="submit">
                        Cadastrar
                    </button>

                    <button type="button" onClick={handleEdit}>
                        Editar
                    </button>

                    <button type="button" onClick={handleDelete}>
                        Excluir
                    </button>

                    <button type="button" onClick={clearForm}>
                        Limpar formulário
                    </button>

                </form>

            </TechListContainer>

            <FormContainer>

                <h2>Equipamentos cadastrados:</h2>

                <table>

                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Número de Série</th>
                            <th>Status</th>
                            <th>Data de Cadastro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>
                                <td colSpan="6">
                                    Carregando equipamentos...
                                </td>
                            </tr>

                        ) : techs.length === 0 ? (

                            <tr>
                                <td colSpan="6">
                                    Nenhum equipamento cadastrado.
                                </td>
                            </tr>

                        ) : (

                            techs.map((eqp) => (
                                <tr key={eqp.id}>
                                    <td>{eqp.name}</td>
                                    <td>{eqp.categoria}</td>
                                    <td>{eqp.numeroDeSerie}</td>
                                    <td>{eqp.status}</td>
                                    <td>{formatDate(eqp.createdAt)}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleSelectTech(eqp)}
                                        >
                                            Selecionar
                                        </button>
                                    </td>
                                </tr>
                            ))

                        )}

                    </tbody>

                </table>

                

                <div>

                    <button
                        type="button"
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1 || loading}
                    >
                        Anterior
                    </button>

                    <span>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage >= totalPages || loading}
                    >
                        Próximo
                    </button>

                </div>

            </FormContainer>

        </MainContainer>
    )
}
