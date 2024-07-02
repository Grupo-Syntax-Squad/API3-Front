import axios from "axios";
import { useState } from "react";

const CadastroLocalizacao = ({handleLocalizacaoClick, adicionarLocalizacao}) => {
    const [localizacao, setLocalizacao] = useState('');

    const estilo = {
        form: {
            width: "40vw",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#367E90",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            padding: "5px"
        },
        label: {
            color: "white"
        },
        h1: {
            color: "white"
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
            adicionarLocalizacao(localizacao);
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
        <form className="popup_pequeno" style={estilo.form} onSubmit={event => handleSubmit(event)}>
            <h1 style={estilo.h1}>Cadastrar localização</h1>
            
            <label htmlFor="localizacao" style={estilo.label}>Localização:</label>
            
            <input type="text" name="localizacao" onChange={e => setLocalizacao(e.target.value)} className="input is-small" placeholder="Digite o localização" />
            
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