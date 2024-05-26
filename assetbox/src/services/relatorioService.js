import axios from "axios";

export const getRelatorio = async (filial_id) => {
    try {
        const response = await axios.get(`http://localhost:8000/relatorios/filial/${filial_id}`);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            alert(error.response.data);
        } else {
            alert("Erro ao buscar relatório");
            console.error(`Erro ao buscar relatório`, error);
        }
    }
}