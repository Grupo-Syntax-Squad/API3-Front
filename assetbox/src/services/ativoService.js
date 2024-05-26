import axios from "axios";

export const postAtivo = async (ativo) => {
    try {
        const response = await axios.post('http://localhost:8000/ativos', ativo);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao registrar ativo");
            console.error(`Erro ao registrar ativo`, error);
        }
    }
}

export const getAtivo = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/ativos/${id}`);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar ativo");
            console.error(`Erro ao buscar ativo`, error);
        }
    }
}

export const getAtivos = async () => {
    try {
        const response = await axios.get('http://localhost:8000/ativos');
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar ativos");
            console.error(`Erro ao buscar ativos`, error);
        }
    }
}

export const putAtivo = async (id, ativo) => {
    try {
        const response = await axios.put(`http://localhost:8000/ativos/${id}`, ativo);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao atualizar ativo");
            console.error(`Erro ao atualizar ativo`, error);
        }
    }
}