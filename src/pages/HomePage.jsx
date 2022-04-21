import React, { useState, useCallback, useEffect } from 'react'
import { Section, Notification, Heading, Columns, Form, Icon } from 'react-bulma-components'
import MonthlyCalendar from '../components/monthlyCalendar/MonthlyCalendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function HomePage() {

    const date = new Date('2022-08-13')
    const holidays2 = [1, 6, 15, 29]
    const [holidays, setHolidays] = useState([])
    const [countries, setCountries] = useState([])
    const [countryFull, setCountryFull] = useState("")
    const [loading, setLoading] = useState(false)
    const [country, setCountry] = useState("CA")
    const monthsYear = [
        new Date('2021-01-02'),
        new Date('2021-02-02'),
        new Date('2021-03-02'),
        new Date('2021-04-02'),
        new Date('2021-05-02'),
        new Date('2021-06-02'),
        new Date('2021-07-02'),
        new Date('2021-08-02'),
        new Date('2021-09-02'),
        new Date('2021-10-02'),
        new Date('2021-11-02'),
        new Date('2021-12-02'),
    ]

    const UrlApi = "https://holidayapi.com/v1"
    const YEAR = '2021'

    const fetchHolidays = useCallback(() => {
        setLoading(true);
        fetch(`${UrlApi}/holidays?pretty&key=${process.env.REACT_APP_API_KEY}&country=${country}&year=${YEAR}`, {
            method: "GET",
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setHolidays(data.holidays.filter(holiday => holiday.public));
            }
            else {
                // openModal("Error Post", "Error fetching data")
                console.log('hola')
            }
            setLoading(false);
        }).catch(err => { setLoading(false) });
    }, [country])

    useEffect(() => {
        if (holidays.length === 0) {
            fetchHolidays();
        }
    }, [holidays, fetchHolidays]);

    useEffect(() => {
        fetchHolidays();
    }, [country]);

    const fetchCountries = useCallback(() => {
        setLoading(true);
        fetch(`${UrlApi}/countries?pretty&key=${process.env.REACT_APP_API_KEY}`, {
            method: "GET",
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setCountries(data.countries);
            }
            else {
                // openModal("Error Post", "Error fetching data")
                console.log('hola')
            }
            setLoading(false);
        }).catch(err => { setLoading(false) });
    }, [])

    useEffect(() => {
        if (countries.length === 0) {
            fetchCountries();
        }
    }, [countries, fetchCountries]);

    useEffect(() => {
        if (countries.length !== 0) {
            const countryCode = countries.find(ctry => (ctry.name).toLowerCase() === countryFull.toLowerCase())
            if (countryCode) {
                console.log(countryCode.code)
                setCountry(countryCode.code)
            }
        }
    }, [countryFull]);

    if (loading) {
        return (
            <Notification>
                <Heading>Loading...</Heading>
            </Notification>
        )
    }
    return (
        <Section >
            <Form.Field>
                <Form.Control>
                    <Icon align='left'>
                        <FontAwesomeIcon icon={faGlobe} />
                    </Icon>
                    <Icon align='right'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Icon>
                    <Form.Input value={countryFull} type="text" name="country" placeholder='Search for your country' onChange={(e) => { setCountryFull(e.target.value) }} />
                </Form.Control>
            </Form.Field>
            <Columns gap={2} mt={6}>
                {holidays.length !== 0 && (
                    monthsYear.map(month => {
                        const holidaysMonth = holidays.filter(monthHolidays => new Date(monthHolidays.date).getMonth() === month.getMonth())
                        return (
                            <Columns.Column display='flex' size={'one-third'} justifyContent='center' key={month.toString()}>
                                <MonthlyCalendar date={month} arrayHolidays={holidaysMonth} />
                            </Columns.Column>

                        )
                    })
                )}
            </Columns>


        </Section>
    )
}

export default HomePage