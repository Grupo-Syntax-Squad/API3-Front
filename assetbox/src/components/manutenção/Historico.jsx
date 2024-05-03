/* import React, { useState, useEffect } from 'react';
import './historico.css';
import axios from 'axios';



const month_names = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

const Historico = () => {
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [calendarDays, setCalendarDays] = useState([]);
    const [manutencoes, setManutencoes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedManutencoes, setSelectedManutencoes] = useState([]);

    useEffect(() => {
        generateCalendar(currMonth, currYear);
    }, [currMonth, currYear]);

    useEffect(() => {
        axios.get('http://localhost:8000/manutencoes')
            .then(response => {
                setManutencoes(response.data);
            })
            .catch(error => {
                console.error('Houve um erro ao buscar as manutenções!', error);
            });
    }, []);

    useEffect(() => {
        if (selectedDate !== null) {
            const filteredManutencoes = manutencoes.filter(manut => {
                const manutDate = new Date(manut.man_data);
                return (
                    manutDate.getDate() === selectedDate &&
                    manutDate.getMonth() === currMonth &&
                    manutDate.getFullYear() === currYear
                );
            });
            setSelectedManutencoes(filteredManutencoes);
        }
    }, [selectedDate, manutencoes, currMonth, currYear]);

    const generateCalendar = (month, year) => {
        const days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const first_day = new Date(year, month, 1);
        const firstDayIndex = first_day.getDay();
        const days = [];

        for (let i = 0; i < firstDayIndex; i++) {
            days.push(null); // Colocando placeholders para os dias vazios antes do primeiro dia do mês
        }

        for (let i = 1; i <= days_of_month[month]; i++) {
            days.push(i);
        }

        setCalendarDays(days);
    };

    const changeMonth = (amount) => {
        let newMonth = currMonth + amount;
        let newYear = currYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }
        setCurrMonth(newMonth);
        setCurrYear(newYear);
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
    };

    // Função para formatar a data e hora da manutenção
    const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const dateStr = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
        const timeStr = `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
        return { dateStr, timeStr };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return formattedDate;
    };

    // Função para agrupar manutenções por hora
    const groupManutencoesByHour = () => {
        const groupedManutencoes = {};

        // Agrupar manutenções por hora
        selectedManutencoes.forEach(manut => {
            const { dateStr, timeStr } = formatDateTime(manut.man_data);
            if (!groupedManutencoes[timeStr]) {
                groupedManutencoes[timeStr] = [];
            }
            groupedManutencoes[timeStr].push({
                ...manut,
                dateStr, // Adicionando data formatada ao objeto da manutenção
            });
        });

        return groupedManutencoes;
    };

    return (
        
        <div className="tela columns">

            
            <div className="listas column">
                <label className="textarea tela-content">
                    {selectedDate && (
                        <div>
                            <h3 className='has-text-black'>Manutenções em {selectedDate}/{currMonth + 1}/{currYear}:</h3><br/>
                            {Object.entries(groupManutencoesByHour()).map(([hour, manutencoes]) => (
                                <div key={hour}>
                                    <ul>
                                        {manutencoes.map((manut, index) => (
                                            <li key={index}>
                                                <strong>Descrição:</strong> {manut.man_atividade}<br />
                                                <strong>Data da Manutenção:</strong> {formatDate(manut.man_data)}<br/>
                                                <strong>Horário:</strong> {manut.man_horario}<br />
                                                <strong>Status:</strong> {manut.man_status}<br />
                                                <strong>Responsável:</strong> {manut.man_responsavel}<br />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
};

export default Historico;
 */



import React, { useState, useEffect } from 'react';
import './historico.css';
import axios from 'axios';

const Historico = ({setTela}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedManutencoes, setSelectedManutencoes] = useState([]);
    const [manutencoes, setManutencoes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/manutencoes')
            .then(response => {
                setManutencoes(response.data);
            })
            .catch(error => {
                console.error('Houve um erro ao buscar as manutenções!', error);
            });
    }, []);

    useEffect(() => {
        if (selectedDate !== null) {
            const filteredManutencoes = manutencoes.filter(manut => {
                const manutDate = new Date(manut.man_data);
                return (
                    manutDate.getDate() === selectedDate &&
                    manutDate.getMonth() === new Date().getMonth() &&
                    manutDate.getFullYear() === new Date().getFullYear()
                );
            });
            setSelectedManutencoes(filteredManutencoes);
        }
    }, [selectedDate, manutencoes]);

    const handleDayClick = (day) => {
        setSelectedDate(day);
    };

    const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const dateStr = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
        const timeStr = `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
        return { dateStr, timeStr };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return formattedDate;
    };

    const groupManutencoesByHour = () => {
        const groupedManutencoes = {};
        selectedManutencoes.forEach(manut => {
            const { dateStr, timeStr } = formatDateTime(manut.man_data);
            if (!groupedManutencoes[timeStr]) {
                groupedManutencoes[timeStr] = [];
            }
            groupedManutencoes[timeStr].push({
                ...manut,
                dateStr,
            });
        });
        return groupedManutencoes;
    };

    return (
        <div className="tela columns">

            
            <div className="listas column">
                <button className="button is-light" onClick={() => setTela('Ativos')} >Voltar</button>
                <label className="textarea tela-content">
                    {selectedDate && (
                        <div>
                            <h3 className='has-text-black'>Manutenções em:</h3><br/>
                            {Object.entries(groupManutencoesByHour()).map(([hour, manutencoes]) => (
                                <div key={hour}>
                                    <ul>
                                        {manutencoes.map((manut, index) => (
                                            <li key={index}>
                                                <strong>Descrição:</strong> {manut.man_atividade}<br />
                                                <strong>Data da Manutenção:</strong> {formatDate(manut.man_data)}<br/>
                                                <strong>Horário:</strong> {manut.man_horario}<br />
                                                <strong>Status:</strong> {manut.man_status}<br />
                                                <strong>Responsável:</strong> {manut.man_responsavel}<br />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
};

export default Historico;
