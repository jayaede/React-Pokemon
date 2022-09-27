import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Row, Col } from 'react-bootstrap';
import './App.css';
import './pokemoninfo.css';

export default function PokemonInfo() {
    const location = useLocation();

    return (
        <div className="card-info">
            <div className='title'>
                {location.state.name}&nbsp;&nbsp;#{location.state.id}
            </div>
            <Card className="card-one">
                <Card.Body>
                    <Row>
                        <Col className="data">
                            <Card style={{ width: '20rem', height: '50vh' }}>
                                <Card.Body>
                                    <Card.Img variant="top" src={location.state.img} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '20rem', height: '50vh', backgroundColor: 'skyblue' }}>
                                <Card.Body>
                                    <h3>Type</h3>
                                    <div className='type'>
                                        {location.state.type.map(function (res, index) {
                                            return (<div className='abilities'><span id={index}>{res}</span></div>)
                                        })}
                                    </div>
                                    <h3>Weakness</h3>
                                    <div className='weakness'>
                                        {location.state.weaknesses.map(function (res, index) {
                                            return (<div className='weakness-data'><span id={index}>{res}</span></div>)
                                        })}
                                    </div>
                                    <h3>Height</h3>
                                    <p>{location.state.height}</p>
                                    <h3>weight</h3>
                                    <p>{location.state.weight}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row><br/>
                    <Row style={{margin: '10%'}}>
                        <Card style={{ width: '20rem', height: '50vh', backgroundColor: 'skyblue' }}>
                            <Card.Body>
                                <h3>Weakness</h3>
                                <div className='weakness'>
                                    {location.state.nextevolution.map(function (res, index) {
                                        return (<div className='weakness-data'><span id={index}>{res.num}</span></div>)
                                    })}
                                </div>
                            </Card.Body>
                        </Card>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}