import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import exintrebare from '../../asets/img/exintrebare.png';
import raspunsuri from '../../asets/img/raspuns.jpg';
import testpicat from '../../asets/img/testpicat.png';
import testtrecut from '../../asets/img/testtrecut.png';


const Instruct = () => (
    <Fragment>
        <Helmet>
            <title>
                Instructiuni de utilizare
            </title></Helmet>
            <div className='instructions container'>
                <h1>Instructiuni de parcurgere al testului teoretic</h1>
                <p>Va rugam sa cititi cu atentie instructiunile de mai jos inainte de a incepe testul.</p>
                <ul className="browser-default" id="main-list">
                    <li>Durata testului este de 30 de minute.</li>
                    <li>Testul contine 26 de intrebari, fiecare intrebare avand 3 variante de raspuns.</li>
                    <li>Atentie! Doar un singur raspuns este corect!</li>

                    <img src={exintrebare} alt="Exemplu test"/>

                    <li>Se selecteaza un singur raspuns din fiecare intrebare!</li>

                    <img src={raspunsuri} alt="Raspunsuri intrebari"/>

                    <li>In cazul in care testul s-a raspuns corect la cel putin 22 de intrebari, se va afisa un mesaj corespunzator.</li>

                    <img src={testtrecut} alt="Test Rezolvat"/>

                    <li>In cazul in care nu s-a raspuns corect la cel putin 22 de intrebari sau s-a trecut de limita de timp, se va afisa un mesaj corespunzator.</li>

                    <img src={testpicat} alt="Test Picat"/>

                    <li>Pentru a accesa pagina aferenta testului apasa pe "Incepe Testul". Mult succes!</li>

                </ul>
                <div>
                    <span className="left"><Link to ="/">Inapoi la pagina principala</Link></span>
                    <span className="right"><Link to ="/start/initialize">Incepe testul</Link></span>
                </div>
            </div>
    </Fragment>
);

export default Instruct;