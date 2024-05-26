import React, { useState, useEffect } from 'react';
import "./visualizar.css";
import axios from 'axios';

function Relatorio({ setTela }) {
    return (
        <body>
            <div class='page-full'>
                <img src={''} className='img' alt="Ativos" />
                <h1 className='has-text-weight-light'>Data:{}</h1>
                <br />
                <h1 className='has-text-weight-light'>`NomeEmpresa - NomeFilial - UFFilail`</h1>
                <div class="columns m-3">
                    <div class="column">
                        <div className='columns'>
                            <div class="field column ">
                                <label class="form-label">Ativos</label>
                            </div>
                            <div class="field column">
                                <label class="form-label">Quantidade</label><br />
                            </div>
                            <div class="field column">
                                <label class="form-label">Valor R$</label><br />
                            </div>
                        </div>
                        
                        <div className="field" >
                            <label className="form-label">Em Operação</label>
                        </div>

                        <div className="field" >
                            <label className="form-label">Em Manutenção</label>
                        </div>

                        <div className="field" >
                            <label className="form-label">Ativos Ociosos</label>
                        </div>

                        <div className="field" >
                            <label className="form-label">Ativos Inativos</label>
                        </div>

                        <div className="field" >
                            <label className="form-label">Com Funcionários</label>
                        </div>

                        <div className="field" >
                            <label className="form-label">Próximos da Manutenção</label>
                        </div>
                    </div>
                </div>
            </div>
        </body>);
  }
                export default Relatorio;
