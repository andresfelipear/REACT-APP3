import React, { useState, useCallback, useEffect } from 'react'
import { Section, Notification, Heading, Columns, Form, Icon } from 'react-bulma-components'
import MonthlyCalendar from '../components/monthlyCalendar/MonthlyCalendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function HomePage() {
    const [holidays, setHolidays] = useState([])
    const [countries, setCountries] = useState([])
    const [countryFull, setCountryFull] = useState("")
    const [loading, setLoading] = useState(false)
    const [country, setCountry] = useState("CA")
    const [province, setProvince] = useState("CA-BC")
    const [provinces, setProvinces] = useState(
        [{ code: 'CA-AB', name: 'Alberta' },
        { code: 'CA-BC', name: 'British Columbia' },
        { code: 'CA-MB', name: 'Manitoba' },
        { code: 'CA-NB', name: 'New Brunswick' },
        { code: 'CA-NL', name: 'Newfoundland and Labrador' },
        { code: 'CA-NS', name: 'Nova Scotia' },
        { code: 'CA-NT', name: 'Northwest Territories' },
        { code: 'CA-NU', name: 'Nunavut' },
        { code: 'CA-ON', name: 'Ontario' },
        { code: 'CA-PE', name: 'Prince Edward Island' },
        { code: 'CA-QC', name: 'Quebec' },
        { code: 'CA-SK', name: 'Saskatchewan' },
        { code: 'CA-YT', name: 'Yukon' }
        ])

    const monthsYear = [
        new Date('2021-01-01'.replace(/-/g, '/')),
        new Date('2021-02-01'.replace(/-/g, '/')),
        new Date('2021-03-01'.replace(/-/g, '/')),
        new Date('2021-04-01'.replace(/-/g, '/')),
        new Date('2021-05-01'.replace(/-/g, '/')),
        new Date('2021-06-01'.replace(/-/g, '/')),
        new Date('2021-07-01'.replace(/-/g, '/')),
        new Date('2021-08-01'.replace(/-/g, '/')),
        new Date('2021-09-01'.replace(/-/g, '/')),
        new Date('2021-10-01'.replace(/-/g, '/')),
        new Date('2021-11-01'.replace(/-/g, '/')),
        new Date('2021-12-01'.replace(/-/g, '/')),
    ]

    const UrlApi = "https://holidayapi.com/v1"
    const YEAR = '2021'

    const fetchHolidays = useCallback(() => {
        console.log(province)
        setLoading(true);
        fetch(`${UrlApi}/holidays?pretty&key=${process.env.REACT_APP_API_KEY}&country=${country}&year=${YEAR}&subdivisions=true`, {
            method: "GET",
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                const holidaysLegal = data.holidays.filter(holiday => holiday.public)
                const canadaHolidays = holidaysLegal.filter(holiday => (holiday.subdivisions.length === 0))
                const provinceHolidays = holidaysLegal.filter(holiday => {
                    const holidayReal = holiday.subdivisions.filter(subdivision => subdivision === province)
                    if (holidayReal.length >= 1) {
                        return true;
                    }
                })
                const totalHolidays = canadaHolidays.concat(provinceHolidays)
                setHolidays(totalHolidays);
            }
            else {
                // openModal("Error Post", "Error fetching data")
                console.log('hola')
            }
            setLoading(false);
        }).catch(err => { setLoading(false) });
    }, [country, province])

    useEffect(() => {
        if (holidays.length === 0) {
            fetchHolidays();
        }
    }, [holidays, fetchHolidays]);

    useEffect(() => {
        fetchHolidays();
    }, [country, province]);


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
                setCountry(countryCode.code)
                setProvinces(countryCode.subdivisions)

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
            <Form.Field>
                <Form.Control>
                    <Form.Select value={province} onChange={async (e) => {
                        setProvince(e.target.value)
                    }}>
                        {provinces && (
                            provinces.map(province => {
                                const provinceName = province.name;
                                return (
                                    <option value={province.code} key={province.code}>{provinceName}</option>
                                )
                            })
                        )}
                    </Form.Select>
                </Form.Control>
            </Form.Field>
            <Columns gap={2} mt={6}>
                {holidays.length !== 0 && (
                    monthsYear.map(month => {
                        const holidaysMonth = holidays.filter(monthHolidays => new Date((monthHolidays.date).replace(/-/g, '/')).getMonth() === month.getMonth())
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