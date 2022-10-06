import React from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';
import './box.scss';

export default function Rendercard(props) {
    let data = props.data;
    let visible = props.visible;
    
    const renderCard = (card, index) => {
        let statedata = {
            id: card.num,
            name: card.name,
            img: card.img,
            type: card.type,
            weaknesses: card.weaknesses,
            height: card.height,
            weight: card.weight,
            nextevolution: card.next_evolution,
            prevevolution: card.prev_evolution
        }
        return (<Card style={{ width: '15rem' }} key={index} className='box'>
            <Link to='/pokemoninfo' state={statedata}><Card.Img variant="top" src={card.img} /></Link>
            <Card.Body>
                <Card.Text>
                    <p>#{card.num}</p>
                    <h5>{card.name}</h5>
                    <div className='type'>
                        {card.type.map(function (res, index) {
                            return (<div className='abilities'><span id={index}>{res}</span></div>)
                        })}
                    </div>
                    <br />
                    <div className='weakness'>
                        {card.weaknesses.map(function (res, index) {
                            return (<div className='weakness-data'><span id={index}>{res}</span></div>)
                        })}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>)
    }
    return (
        <div className='grid'>
            {data.slice(0, visible).map(renderCard)}
        </div>
    )
}