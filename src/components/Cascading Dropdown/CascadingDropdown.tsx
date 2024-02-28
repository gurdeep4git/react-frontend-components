import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { countriesData } from '../../Data/countriesData';

const CascadingDropdown: React.FunctionComponent = () => {
    const [cities, setCities] = useState<Array<string | []>>([]);

    const onCountryChange = (value: string): void => {
        const selectedCountry = value;
        getCities(selectedCountry)
    }

    const getCities = (selectedCountry: string): void => {
        const cities: Array<string> = countriesData.find((i) => i.value === selectedCountry)?.cities as Array<string>;
        setCities(cities);
    }

    return (
        <>
            <div className='py-4'>
                <Container>
                    <Row>
                        <Col>
                            <Form.Label>Country</Form.Label>
                            <Form.Select onChange={(e) => onCountryChange(e.target.value)} aria-label="Default select example">
                                <option>Select Country</option>
                                {
                                    countriesData?.map((i) => (
                                        <option key={i.value} value={i.value}>{i.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>City</Form.Label>
                            <Form.Select aria-label="Default select example">
                                {
                                    !cities?.length ? (<option>Select a country first</option>) : (
                                        <>
                                            <option>Select city</option>
                                            {
                                                cities?.map((i, index) => (
                                                    <option key={index} value={i}>{i}</option>
                                                ))
                                            }
                                        </>
                                    )
                                }


                            </Form.Select>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default CascadingDropdown


