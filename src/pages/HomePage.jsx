import React from 'react'
import { Section } from 'react-bulma-components'
import MonthlyCalendar from '../components/monthlyCalendar/MonthlyCalendar'

function HomePage() {

    const date = new Date('2022-08-12')
    const holidays = [1,6,15,29]
  return (
    <Section>
        <MonthlyCalendar date={date} arrayHolidays={holidays}  />
    </Section>
  )
}

export default HomePage