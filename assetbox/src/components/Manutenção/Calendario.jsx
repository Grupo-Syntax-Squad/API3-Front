import React, { useState, useEffect } from 'react';
import './calendario.css';

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

    useEffect(() => {
        generateCalendar(currMonth, currYear);
    }, [currMonth, currYear]);

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

    return (
        <div className="calendar">
            <div className="calendar-header">
                <span className="month-picker" id="month-picker">{month_names[currMonth]}</span>
                <div className="year-picker">
                    <span className="year-change" id="prev-month" onClick={() => changeMonth(-1)}>
                        <pre>{'<'}</pre>
                    </span>
                    <span id="year">{currYear}</span>
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
                        <div key={index} className="calendar-day">{day}</div>
                    ))}
                </div>
            </div>
            <div className="month-list"></div>
        </div>
    );
};

export default Calendario;
