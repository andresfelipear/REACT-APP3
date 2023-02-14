import React, { useState, useCallback, useEffect } from 'react'
import { Section, Notification, Heading, Columns, Form, Icon } from 'react-bulma-components'
import MonthlyCalendar from '../components/monthlyCalendar/MonthlyCalendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function HomePage() {
    const [holidays, setHolidays] = useState([])
    const [countries, setCountries] = useState([])
    const [countryFull, setCountryFull] = useState("Canada")
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

    const YEAR = '2022'

    const monthsYear = [
        new Date(`${YEAR}-01-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-02-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-03-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-04-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-05-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-06-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-07-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-08-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-09-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-10-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-11-01`.replace(/-/g, '/')),
        new Date(`${YEAR}-12-01`.replace(/-/g, '/')),
    ]

    const UrlApi = "https://holidayapi.com/v1"
    

    const fetchHolidays = useCallback(() => {
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
            setLoading(false);
        }).catch(err => { console.log(err); setLoading(false) });
    }, [country, province])

    useEffect(() => {
        if (holidays.length === 0) {
            fetchHolidays();
        }
    }, [holidays, fetchHolidays]);

    useEffect(() => {
        fetchHolidays();
    }, [country, province, fetchHolidays]);


    const fetchCountries = useCallback(() => {
        setLoading(true);
        fetch(`${UrlApi}/countries?pretty&key=${process.env.REACT_APP_API_KEY}`, {
            method: "GET",
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setCountries(data.countries);
            }
            setLoading(false);
        }).catch(err => { console.log(err); setLoading(false) });
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
    }, [countryFull, countries]);

    if (loading) {
        return (
            <Notification>
                <Heading>Loading...</Heading>
            </Notification>
        )
    }
    return (
        <Section className='mainSection' >
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

            <Columns gap={2} mt={6} justifyContent={'center'}>
                {holidays.length !== 0 && (
                    monthsYear.map(month => {
                        const holidaysMonth = holidays.filter(monthHolidays => new Date((monthHolidays.date).replace(/-/g, '/')).getMonth() === month.getMonth())
                        return (
                            <Columns.Column tablet={{size:'half'}} desktop={{size:'half'}} widescreen={{size:'one-third'}}  key={month.toString()}>
                                <MonthlyCalendar date={month} arrayHolidays={holidaysMonth} />
                                {holidaysMonth.length > 0 && (
                                    <ul style={{marginTop:'10px',paddingLeft:'5px', color:"#E80505"}}>
                                        {holidaysMonth.map((holiday) => {
                                            return (

                                                <li key={holiday.name} style={{display:'flex', alignItems:'center', justifyContent:'left'}}>
                                                    <Icon><FontAwesomeIcon icon={faCalendarDay} /></Icon>
                                                    <Heading size={6} subtitle  >{holiday.name}</Heading>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </Columns.Column>

                        )
                    })
                )}
            </Columns>


        </Section>
    )
}

export default HomePage