import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Product } from '../../models/products';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';

const InfiniteScroll: React.FunctionComponent = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);

    const limit = 10;
    const url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`

    const getData = async () => {
        try {
            setLoading(true)
            const response = await fetch(url);
            const productsResponse = await response.json();
            setProducts(prevstate => [...prevstate, ...productsResponse]);
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    }

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        setOffset(prevState => prevState + limit)
    }

    useEffect(() => {
        getData()
    }, [offset])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [products])

    const imageLoadError = (e: BaseSyntheticEvent) => {
        e.target.src = `https://placehold.co/600x600`
    }

    return (
        <div className='py-4'>
            <Container>
                <Row>
                    {
                        products?.map((product: Product, index: number) => (
                            <Col className='mb-4' md={6} lg={3} key={index}>
                                <Card>
                                    <Card.Img variant="top" src={product?.images?.[0]} onError={(e) => imageLoadError(e)} />
                                    <Card.Body>
                                        <Card.Title>{product?.title}</Card.Title>
                                        <Card.Text>
                                            {product?.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))

                    }
                    {loading && <Spinner animation="border" variant="primary" />}
                </Row>
            </Container>

        </div>
    )

}

export default InfiniteScroll