import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home: React.FunctionComponent = () => {
    const components: Array<{ title: string, path: string }> = [
        { 'title': 'Infinite Scroll', 'path': '/infinite-scroll' },
        { 'title': 'Cascading Dropdown', 'path': '/cascading-dropdown' }
    ]

    return (
        <>
            <Container className='my-3'>
                {
                    components?.map((c) => (
                        <Link key={c.title} to={c.path}>
                            <Card className='mb-3'>
                                <Card.Body>{c.title}</Card.Body>
                            </Card>
                        </Link>))
                }

            </Container>
        </>
    )
}

export default Home