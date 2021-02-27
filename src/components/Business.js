import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Business = ({ busi }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/businessdetails/${busi.uid}`}>
                <Card.Img src={busi.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/businessdetails/${busi.uid}`}>
                    <Card.Title as='div'>
                        <strong>
                            {busi.name}
                        </strong>
                    </Card.Title>
                </Link>
            </Card.Body>

        </Card>
    )
}

export default Business
