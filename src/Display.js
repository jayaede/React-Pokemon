import { Button, Row, Col, Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './box.scss';
import dropdownimage from './dropdown image upside.jfif'
import Rendercard from './Rendercard';
import SearchOutlined from '@material-ui/icons/Search';

export default function Display() {
    const [searchinput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [advSearchResult, setAdvSearchResult] = useState([]);
    const [visible, setVisible] = useState(12);
    const [resultCardVisible, setResultCardVisible] = useState(false);
    const [advResultCardVisible, setAdvResultCardVisible] = useState(false);
    const [cardVisible, setCardVisible] = useState(true);
    const [advSearchToggleButton, setAdvSearchToggleButton] = useState(false);
    const [type, setType] = useState([]);
    const [weakness, setWeakness] = useState([]);
    useEffect(() => {
        axios.get('./data.json')
            .then(res => {
                const resp = res.data.pokemon;
                console.log(resp);
                setData(resp);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    const loadMore = () => {
        setVisible(visible + 12);
    }
    const handleSearchToggle = () => {
        setAdvSearchToggleButton(true)
    }
    const handleHideSearchToggle = () => {
        setAdvSearchToggleButton(false);
    }
    const getData = (e, params) => {
        let arr = [];
        data.map((d, index) => {
            if (d.name === params || d.num === params || d.type.includes(params)) {
                arr.push(d);
            }
            //return arr;
        })
        setResult(arr);
        setResultCardVisible(true);
        setCardVisible(false);
        setAdvResultCardVisible(false);
    }
    const getAdvSearchData = (e, type, weakness) => {
        e.preventDefault();
        let arr = [];
        data.map((d, index) => {
            for (var i = 0; i < (type.length || weakness.length); i++) {
                for (var j = 0; j < (d.type.length || d.weaknesses.length); j++) {
                    if (type[i] === d.type[j] && weakness[i] === d.weaknesses[j]) {
                        arr.push(d);
                    }
                }
            }
            //return resultArr;
        })
        let resultArr = [...new Set(arr)]
        setAdvSearchResult(resultArr);
        setAdvResultCardVisible(true);
        setResultCardVisible(false);
        setCardVisible(false);
    }
    const handleType = (e, params) => {
        if (type.includes(params)) {
            let index = type.indexOf(params);
            setType(type.splice(index, 1));
        }
        else {
            setType(prevItems => [...prevItems, params]);
            // filter.backgroundColor="blue";
        }
    }
    const handleWeakness = (e, params) => {
        if (weakness.includes(params)) {
            let index = weakness.indexOf(params);
            setWeakness(type.splice(index, 1));
        }
        else {
            setWeakness(prevItems => [...prevItems, params]);
        }
    }
    return (
        <div className="App">
            <div className='title'>
                <h3>Pokedex</h3>
            </div>
            <div className='header'>
                <div className='section1'>
                    <h4>Name or Number</h4>
                    <input type="text" id="name" onChange={(e) => setSearchInput(e.target.value)} />&nbsp;
                    <Button type='submit' variant='danger' onClick={(e) => getData(e, searchinput)}>
                        <SearchOutlined />
                    </Button>
                    <p>Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more!</p>
                </div>
                <div className='section2'>
                    <h4>Serach for a Pokemon  by name or using its National Pokedex Number</h4>
                </div>
            </div>
            <div className='adv-showtoogle'>
                <span><b>Show Advanced Search&nbsp;</b></span>
                <img style={{ 'width': '15px', 'height': '15px' }} src='https://tse1.mm.bing.net/th/id/OIP.hh62lwarRlHILH1gLovszQHaHa?w=172&h=180&c=7&r=0&o=5&pid=1.7' alt='' onClick={handleSearchToggle} />
            </div>
            {advSearchToggleButton ?
                <Form>
                    <div className='advsearch'>
                        <div className='adv-card'>
                            <h3><pre>Type & Weakness   T= Type W=weakness</pre></h3>
                            <Row>
                                <Col>
                                    <ul style={{ 'listStyleType': 'none' }}>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': 'green', 'width': '100px' }}>Bug</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Bug" onClick={(e) => { handleType(e, "Bug") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Bug" onClick={(e) => { handleWeakness(e, "Bug") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{
                                                'background': `linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)`,
                                                'backgroundColor': '#53a4cf', 'color': '#fff', 'width': '100px'
                                            }}>Dragon</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Dragon" onClick={(e) => { handleType(e, "Dragon") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Dragon" onClick={(e) => { handleWeakness(e, "Dragon") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#fdb9e9', 'color': 'black', 'width': '100px' }}>Fairy</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Fairy" onClick={(e) => { handleType(e, "Fairy") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Fairy" onClick={(e) => { handleWeakness(e, "Fairy") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#fd7d24', 'width': '100px' }}>Fire</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Fire" onClick={(e) => { handleType(e, "Fire") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Fire" onClick={(e) => { handleWeakness(e, "Fire") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#7b62a3', 'width': '100px' }}>Ghost</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Ghost" onClick={(e) => { handleType(e, "Ghost") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Ghost" onClick={(e) => { handleWeakness(e, "Ghost") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{
                                                'background': `linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)`,
                                                'backgroundColor': '#f7de3f', 'color': '#212121', 'width': '100px'
                                            }}>Ground</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Ground" onClick={(e) => { handleType(e, "Ground") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Ground" onClick={(e) => { handleWeakness(e, "Ground") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#a4acaf', 'color': 'black', 'width': '100px' }}>Normal</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Normal" onClick={(e) => { handleType(e, "Normal") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Normal" onClick={(e) => { handleWeakness(e, "Normal") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#f366b9', 'width': '100px' }}>Psychic</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Psychic" onClick={(e) => { handleType(e, "Psychic") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Psychic" onClick={(e) => { handleWeakness(e, "Psychic") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#a4acaf', 'color': 'black', 'width': '100px' }}>Steel</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Steel" onClick={(e) => { handleType(e, "Steel") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Steel" onClick={(e) => { handleWeakness(e, "Steel") }}>W</span>
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col>
                                    <ul style={{ 'listSstyleType': 'none' }}>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#70707', 'width': '100px' }}>Dark</span>

                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Dark" onClick={(e) => { handleType(e, "Dark") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Dark" onClick={(e) => { handleWeakness(e, "Dark") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#eed535', 'color': 'black', 'width': '100px' }}>Electric</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Electric" onClick={(e) => { handleType(e, "Electric") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Electric" onClick={(e) => { handleWeakness(e, "Electric") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#d56723', 'width': '100px' }}>Fighting</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Fighting" onClick={(e) => { handleType(e, "Fighting") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Fighting" onClick={(e) => { handleWeakness(e, "Fighting") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{
                                                'background': `linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)`,
                                                'backgroundColor': '#3dc7ef', 'color': 'black', 'width': '100px'
                                            }}>Flying</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Flying" onClick={(e) => { handleType(e, "Flying") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Flying" onClick={(e) => { handleWeakness(e, "Flying") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#9bcc50', 'color': 'black', 'width': '100px' }}>Grass</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Grass" onClick={(e) => { handleType(e, "Grass") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Grass" onClick={(e) => { handleWeakness(e, "Grass") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#51c4e7', 'color': 'black', 'width': '100px' }}>Ice</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Ice" onClick={(e) => { handleType(e, "Ice") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Ice" onClick={(e) => { handleWeakness(e, "Ice") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#b97fc9', 'width': '100px' }}>Poison</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Poison" onClick={(e) => { handleType(e, "Poison") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Poison" onClick={(e) => { handleWeakness(e, "Poison") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#a38c21', 'width': '100px' }}>Rock</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Rock" onClick={(e) => { handleType(e, "Rock") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Rock" onClick={(e) => { handleWeakness(e, "Rock") }}>W</span>
                                            </div>
                                        </li>
                                        <li style={{ 'display': 'flex' }}>
                                            <span className='adv-list' style={{ 'backgroundColor': '#4592c4', 'width': '100px' }}>Water</span>
                                            <div style={{ 'marginTop': '10px', 'marginLeft': '10px' }}>
                                                <span className='filter' data-type="type" data-value="Water" onClick={(e) => { handleType(e, "Water") }}>T</span>
                                                <span className='filter' data-type="weakness" data-value="Water" onClick={(e) => { handleWeakness(e, "Water") }}>W</span>
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                            <div className='adv-buttons'>
                                <Button type='reset' variant='secondary' style={{ marginRight: 20, 'width': '100px' }}>Reset</Button>
                                <Button type='submit' variant='danger' style={{ marginLeft: 20, 'width': '100px' }} onClick={(e) => { getAdvSearchData(e, type, weakness) }}>Search</Button>
                            </div><br />
                            <div className='adv-hidetoogle'>
                                <span><b>Hide Advanced Search&nbsp;</b></span>
                                <img style={{ 'width': '15px', 'height': '15px' }} src={dropdownimage} alt='' onClick={handleHideSearchToggle} />
                            </div>
                        </div>
                    </div>
                </Form>
                : null}
            {resultCardVisible ? <div>
                {
                    result.length !== 0 ? <div className='grid'>
                        <Rendercard data={result} />
                    </div> : <div className='noresults'>
                        <h3 style={{ color: "red" }}>No Pokémon Matched Your Search!</h3>
                        <p style={{ color: "gray" }}><strong>Try these suggestions to find a Pokémon:</strong></p>
                        <ul className="noresults-list">
                            <li>Reduce the number of search parameters</li>
                            <li>Search for only one Pokémon type at a time</li>
                            <li>Try multiple body sizes and shapes</li>
                        </ul>
                    </div>
                }</div> : null}

            {advResultCardVisible ? <div>
                {
                    advSearchResult.length !== 0 ? <div>
                        <Rendercard data={advSearchResult} visible={visible} />
                        {visible < data.length && (
                            <div className='loadmore-button'>
                                <Button variant='primary' onClick={loadMore}>Load more Pokémon</Button>
                            </div>)}</div> : <div className='noresults'>
                        <h3 style={{ color: "red" }}>No Pokémon Matched Your Search!</h3>
                        <p style={{ color: "gray" }}><strong>Try these suggestions to find a Pokémon:</strong></p>
                        <ul className="noresults-list">
                            <li>Reduce the number of search parameters</li>
                            <li>Search for only one Pokémon type at a time</li>
                            <li>Try multiple body sizes and shapes</li>
                        </ul>
                    </div>}
            </div> : null}
            {
                cardVisible ?
                    <div>
                        <Rendercard data={data} visible={visible} />
                        {visible < data.length && (
                            <div className='loadmore-button'>
                                <Button variant='primary' onClick={loadMore}>Load more Pokémon</Button>
                            </div>)}
                    </div>
                    : null
            }
        </div >
    )
}