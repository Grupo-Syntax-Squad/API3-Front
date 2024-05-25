import axios from "axios";

export const postMatriz = async (matriz) => {
    try {
        const response = await axios.post('http://localhost:8000/matriz', matriz);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao registrar matriz");
            console.error(`Erro ao registrar matriz`, error);
        }
    }
}

export const getMatriz = async () => {
    try {
        const response = await axios.get('http://localhost:8000/matriz');
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar matriz");
            console.error(`Erro ao buscar matriz`, error);
        }
    }
}

export const putMatriz = async (matriz) => {
    try {
        const response = await axios.put(`http://localhost:8000/matriz`, matriz);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao atualizar matriz");
            console.error(`Erro ao atualizar matriz`, error);
        }
    }
}