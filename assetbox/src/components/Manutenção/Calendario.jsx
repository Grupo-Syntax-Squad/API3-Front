import React, { useState, useEffect } from 'react';
import './calendario.css';
import axios from 'axios';

const month_names = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

const Calendario = ({ setTela }) => {
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
        const dataSelecionada = localStorage.getItem('dataSelecionada');
        console.log(dataSelecionada);
        if (selectedDate !== null) {
            console.log('Filtrando manutenções...');
            const filteredManutencoes = manutencoes.filter(manut => {
                const manutDate = new Date(manut.man_data);
                console.log('Data da manutenção:', manutDate.getDate());
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
        localStorage.setItem('dataSelecionada', `${currYear}/${currMonth + 1}/${day}`);
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

    const hasManutencoes = (day) => {
        if (day === null) return false; // Se o dia for null, não há manutenções
        const manutencoesForDay = manutencoes.filter(manut => {
            const manutDate = new Date(manut.man_data);
            return (
                manutDate.getDate() === day &&
                manutDate.getMonth() === currMonth &&
                manutDate.getFullYear() === currYear
            );
        });
        return manutencoesForDay.length > 0; // Retorna true se houver manutenções para este dia
    };

    console.log(selectedDate);

    return (
        <div className="tela columns">
            <div className="calendar column is-half">
                <div className="calendar-header">
                    <span className="year-picker" id="year-picker">{currYear}</span>
                    <div className="year-picker">
                        <span className="year-change" id="prev-month" onClick={() => changeMonth(-1)}>
                            <pre>{'<'}</pre>
                        </span>
                        <span id="year">{month_names[currMonth]}</span>
                        <span className="year-change" id="next-month" onClick={() => changeMonth(1)}>
                            <pre>{'>'}</pre>
                        </span>
                    </div>
                </div>
                <div className="calendar-body">
                    <div className="calendar-week-day">
                        <div>Dom</div>
                        <div>Seg</div>
                        <div>Ter</div>
                        <div>Qua</div>
                        <div>Qui</div>
                        <div>Sex</div>
                        <div>Sab</div>
                    </div>
                    <div className="calendar-days">
                        {calendarDays.map((day, index) => (
                            <div key={index} className={`calendar-day ${day !== null ? 'active' : ''} ${hasManutencoes(day) ? 'has-manutencoes': ''}`} onClick={() => handleDayClick(day)}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="month-list"></div>
            </div>
            <div className="listas column">
                <label className="textarea tela-content">
                    {selectedDate && (
                        <div>
                            <h3 className='has-text-black'>Manutenções em {selectedDate}/{currMonth + 1}/{currYear}:</h3><br />
                            {Object.entries(groupManutencoesByHour()).map(([hour, manutencoes]) => (
                                <div key={hour}>
                                    <ul>
                                        {manutencoes.map((manut, index) => (
                                            <li key={index}>
                                                <strong>Descrição:</strong> {manut.man_atividade}<br />
                                                <strong>Data da Manutenção:</strong> {formatDate(manut.man_data)}<br />
                                                <strong>Horário:</strong> {manut.man_horario}<br />
                                                <strong>Status:</strong> {manut.man_status}<br />
                                                <strong>Responsável:</strong> {manut.man_responsavel}<br />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <button class="button is-primary m-2 is-rounded is-size-6" style={{ backgroundColor: '#367E90', color: '#fff' }} onClick={() => setTela('CadastroManutenção')}>Cadastrar Manuntenção</button>
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
};

export default Calendario;
