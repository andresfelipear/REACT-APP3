import React, { useState } from 'react'
import Calendar from "react-calendar"
import { Box, Section, Heading } from "react-bulma-components"
import 'react-calendar/dist/Calendar.css'
import './MonthlyCalendar.css'

function MonthlyCalendar({ date, arrayHolidays }) {
    const options = {month:'long'}
    const month = new Intl.DateTimeFormat('en-US', options).format(date)

    const [value, setValue] = useState(date);

    function onChange(nextValue) {
        setValue(nextValue);
    }

    const tileClassName = ({ date, view }) => {
        const dayNumber = date.getDate()
        let findDay = false;
        arrayHolidays.forEach((holiday) => {
            const day = new Date(holiday.date.replace(/-/g,'/'))
            if (dayNumber === (day.getDate())) {
                findDay = true;
            }
        })
        if (findDay) {
            return 'dayHoliday';
        }
    }

    return (
        <Section style={{width:'100%', padding:'0px', marginLeft:'auto', marginRight:'auto'}}>  
            <Heading size={3} textAlign={'center'}>{month}</Heading>
            <Box className='contentCalendar' style={{ width: '90%', height:'288px', display:'flex', alignItems:'center', justifyContent:'center', marginInline:'auto'}}>
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
        </Section>




    );
}

export default MonthlyCalendar