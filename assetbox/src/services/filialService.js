import axios from "axios";

export const postFilial = async (filial) => {
    try {
        const response = await axios.post('http://localhost:8000/filiais', filial);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao registrar filial");
            console.error(`Erro ao registrar filial`, error);
        }
    }
}

export const getFilial = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/filiais/${id}`);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar filial");
            console.error(`Erro ao buscar filial`, error);
        }
    }
}

export const getFiliais = async () => {
    try {
        const response = await axios.get('http://localhost:8000/filiais');
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar filiais");
            console.error(`Erro ao buscar filiais`, error);
        }
    }
}