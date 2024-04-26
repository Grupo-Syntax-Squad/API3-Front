import React, { useState, useEffect } from 'react';
import './calendario.css';
import axios from 'axios';

const month_names = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

const Calendario = () => {
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [calendarDays, setCalendarDays] = useState([]);
    const [manutencoes, setManutencoes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

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

    const filteredManutencoes = manutencoes.filter(manut => {
        const manutDate = new Date(manut.date); // Assuming your API returns the manutencao date
        return manutDate.getDate() === selectedDate && manutDate.getMonth() === currMonth && manutDate.getFullYear() === currYear;
    });

    return (
        <div class="tela columns">
            <div class="calendar column is-half">
                <div class="calendar-header">
                    <span class="month-picker" id="month-picker">{month_names[currMonth]}</span>
                    <div class="year-picker">
                        <span class="year-change" id="prev-month" onClick={() => changeMonth(-1)}>
                            <pre>{'<'}</pre>
                        </span>
                        <span id="year">{currYear}</span>
                        <span class="year-change" id="next-month" onClick={() => changeMonth(1)}>
                            <pre>{'>'}</pre>
                        </span>
                    </div>
                </div>
                <div class="calendar-body">
                    <div class="calendar-week-day">
                        <div>Dom</div>
                        <div>Seg</div>
                        <div>Ter</div>
                        <div>Qua</div>
                        <div>Qui</div>
                        <div>Sex</div>
                        <div>Sab</div>
                    </div>
                    <div class="calendar-days">
                        {calendarDays.map((day, index) => (
                            <div key={index} className={`calendar-day ${day !== null ? 'active' : ''}`} onClick={() => handleDayClick(day)}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
                <div class="month-list"></div>
            </div>
            <div class="listas column">
                <label class="textarea"> </label>
                {selectedDate && (
                    <div>
                        <h3>Manutenções em {selectedDate}/{currMonth + 1}/{currYear}:</h3>
                        <ul>
                            {filteredManutencoes.map((manut, index) => (
                                <li key={index}>{manut.descricao} - {manut.horario}</li> // Assuming your manutencao object has descricao and horario properties
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendario;