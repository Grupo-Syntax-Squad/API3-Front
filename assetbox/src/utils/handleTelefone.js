const handleTelefone = (telefone) => {
    const onlyNums = telefone.replace(/[^\d]/g, '');

    if (onlyNums.length <= 10) {
        return onlyNums.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        return onlyNums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
}

export default handleTelefone;