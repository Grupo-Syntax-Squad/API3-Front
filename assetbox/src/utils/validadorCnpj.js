export default class Validador {
    validarCNPJ(cnpj) {
        // Remove caracteres não numéricos do CNPJ
        cnpj = cnpj.replace(/\D/g, '');

        // Verifica se o CNPJ tem 14 dígitos
        if (cnpj.length !== 14) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let soma = 0;
        let peso = 5;
        for (let i = 0; i < 12; i++) {
            soma += parseInt(cnpj.charAt(i)) * peso;
            peso = peso === 2 ? 9 : peso - 1;
        }
        let d1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (parseInt(cnpj.charAt(12)) !== d1) {
            return false;
        }

        // Calcula o segundo dígito verificador
        soma = 0;
        peso = 6;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(cnpj.charAt(i)) * peso;
            peso = peso === 2 ? 9 : peso - 1;
        }
        let d2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (parseInt(cnpj.charAt(13)) !== d2) {
            return false;
        }

        // CNPJ válido
        return true;
    }
}
