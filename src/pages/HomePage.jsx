import React, { useState } from 'react'
import Calendar from "react-calendar"
import { Box, Section, Card } from "react-bulma-components"
import 'react-calendar/dist/Calendar.css'
import './HomePage.css'

function HomePage() {



    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
        setValue(nextValue);
    }

    return (
        <Box style={{width:'fit-content'}}>
                <Calendar 
                    onChange={onChange}
                    value={value}
                    
                />
        </Box>


    );
}

export default HomePage