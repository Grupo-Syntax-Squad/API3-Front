import axios from "axios";
import { useState } from "react";

const CadastroLocalizacao = ({handleLocalizacaoClick, setLocalizacoes}) => {
    const [localizacao, setLocalizacao] = useState('');

    const estilo = {
        form: {
            width: "30vw",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            padding: "5px"
        },
        label: {
            color: "black"
        },
        h1: {
            color: "black"
        },
        buttons: {
            display: "flex",
            justifyContent: "center",
            marginTop: "5px"
        },
        buttonCadastrar: {
            marginRight: "2.5px"
        },
        buttonCancelar: {
            marginLeft: "2.5px"
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const dataLocalizacao = {
                loc_titulo: localizacao
            }
            let response = await axios.post("http://localhost:8000/localizacoes", dataLocalizacao)
            response = await axios.get("http://localhost:8000/localizacoes")
            setLocalizacoes(response.data)
            setLocalizacao('');
            handleLocalizacaoClick();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelar = (event) => {
        event.preventDefault();
        setLocalizacao('');
        handleLocalizacaoClick();
    }

    return (
        <form style={estilo.form} onSubmit={event => handleSubmit(event)}>
            <h1 style={estilo.h1}>Cadastrar tipo</h1>
            
            <label htmlFor="tipo" style={estilo.label}>Tipo:</label>
            
            <input type="text" name="tipo" onChange={e => setLocalizacao(e.target.value)} className="input is-small" placeholder="Digite o tipo" />
            
            <div style={estilo.buttons}>
                {/* Botão de cadastrar */}
                <button style={estilo.buttonCadastrar} className="button is-primary">Cadastrar</button>
                
                {/* Botão de cancelar cadastro */}
                <button onClick={event => handleCancelar(event)} style={estilo.buttonCancelar} className="button is-light">Cancelar</button>
            </div>
        </form>
    )
}

export default CadastroLocalizacao;