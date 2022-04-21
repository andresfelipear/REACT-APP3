import React, { useState } from 'react'
import Calendar from "react-calendar"
import { Box, Section, Card } from "react-bulma-components"
import 'react-calendar/dist/Calendar.css'
import './MonthlyCalendar.css'

function MonthlyCalendar({date, arrayHolidays}) {



    const [value, setValue] = useState(date);

    function onChange(nextValue) {
        setValue(nextValue);
    }

    const tileClassName = ({date, view})=>{
        const dayNumber = date.getDate()
        let findDay = false;
        arrayHolidays.forEach((day)=>{
            if(dayNumber === day){
                findDay = true;
            }
        })
        if(findDay){
            console.log("hola");
            return 'dayHoliday';
        }
    }

    return (
        <Box style={{width:'fit-content'}}>
                <Calendar 
                    onChange={onChange}
                    value={value}
                    nextLabel={null}
                    next2Label={null}
                    prevLabel={null}
                    prev2Label={null}
                    showNavigation={false}
                    view={'month'}
                    showNeighboringMonth={false}
                    tileClassName={tileClassName}
                    activeStartDate={null}
                />
        </Box>


    );
}

export default MonthlyCalendar