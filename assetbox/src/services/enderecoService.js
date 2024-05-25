import axios from "axios";

export const postEndereco = async (endereco) => {
    try {
        const response = await axios.post('http://localhost:8000/enderecos', endereco);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao registrar endereço");
            console.error(`Erro ao registrar endereço`, error);
        }
    }
}

export const getEndereco = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/enderecos/${id}`);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar endereço");
            console.error(`Erro ao buscar endereço`, error);
        }
    }
}

export const getEnderecos = async () => {
    try {
        const response = await axios.get('http://localhost:8000/enderecos');
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar endereços");
            console.error(`Erro ao buscar endereços`, error);
        }
    }
}

export const putEndereco = async (id, endereco) => {
    try {
        const response = await axios.put(`http://localhost:8000/enderecos/${id}`, endereco);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao atualizar endereço");
            console.error(`Erro ao atualizar endereço`, error);
        }
    }
}