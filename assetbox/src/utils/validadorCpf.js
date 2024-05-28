export default class Validador {
    validarCPF(cpf) {
        // Remove caracteres não numéricos do CPF
        cpf = cpf.replace(/\D/g, '');
    
        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }
    
        // Calcula o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let d1 = 11 - (soma % 11);
        if (d1 > 9) {
            d1 = 0;
        }
    
        // Verifica o primeiro dígito verificador
        if (parseInt(cpf.charAt(9)) !== d1) {
            return false;
        }
    
        // Calcula o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let d2 = 11 - (soma % 11);
        if (d2 > 9) {
            d2 = 0;
        }
    
        // Verifica o segundo dígito verificador
        if (parseInt(cpf.charAt(10)) !== d2) {
            return false;
        }
    
        // CPF válido
        return true;
    }
}