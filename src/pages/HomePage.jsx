import React, { useState, useCallback, useEffect } from 'react'
import { Section, Notification, Heading } from 'react-bulma-components'
import MonthlyCalendar from '../components/monthlyCalendar/MonthlyCalendar'

function HomePage() {

    const date = new Date('2022-08-13')
    const holidays2 = [1, 6, 15, 29]
    const [holidays, setHolidays] = useState([])
    const [loading, setLoading] = useState(false)
    const UrlApi = "https://holidayapi.com/v1/holidays"
    const COUNTRY = 'CA'
    const YEAR = '2021'

    console.log(process.env.HOLIDAYS_API_KEY)

    // const fetchHolidays = useCallback(() => {
    //     setLoading(true);
    //     fetch(`${UrlApi}?pretty&key=${process.env.HOLIDAYS_API_KEY}&country=${COUNTRY}&year=${YEAR}`, {
    //         method: "GET",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     }).then(async (response) => {
    //         if (response.ok) {
    //             const data = await response.json();
    //             setHolidays(data.holidays);
    //         }
    //         else {
    //             // openModal("Error Post", "Error fetching data")
    //             console.log('hola')
    //         }
    //         setLoading(false);
    //     }).catch(err => { setLoading(false) });
    // }, [holidays])

    // useEffect(() => {
    //     if (holidays.length === 0) {
    //         fetchHolidays();
    //     }
    // }, [holidays, fetchHolidays]);

    if (loading) {
        return (
            <Notification>
                <Heading>Loading...</Heading>
            </Notification>
        )
    }
    return (
        <Section>
            {holidays.length!==0 && (
                console.log(holidays)
            )}
            <MonthlyCalendar date={date} arrayHolidays={holidays} />
        </Section>
    )
}

export default HomePage