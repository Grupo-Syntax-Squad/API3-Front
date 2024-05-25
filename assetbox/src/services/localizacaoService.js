import axios from "axios";

export const postLocalizacao = async (localizacao) => {
    try {
        const response = await axios.post('http://localhost:8000/localizacoes', localizacao);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao registrar localização");
            console.error(`Erro ao registrar localização`, error);
        }
    }
}

export const getLocalizacao = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/localizacoes/${id}`);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar localização");
            console.error(`Erro ao buscar localização`, error);
        }
    }
}

export const getLocalizacoes = async () => {
    try {
        const response = await axios.get('http://localhost:8000/localizacoes');
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar localizações");
            console.error(`Erro ao buscar localizações`, error);
        }
    }
}

export const putLocalizacao = async (id, localizacao) => {
    try {
        const response = await axios.put(`http://localhost:8000/localizacoes/${id}`, localizacao);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao atualizar localização");
            console.error(`Erro ao atualizar localização`, error);
        }
    }
}