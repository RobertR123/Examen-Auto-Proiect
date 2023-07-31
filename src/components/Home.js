import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


const Home = () =>  (
    <Fragment>
        <Helmet><title>Examen Auto</title></Helmet>
        <div id="home">
        <section>
            <div style={{ textAlign: 'center'}}>
                <span className="mdi mdi-train-car mdi traincar"></span>
            </div>
            <h1>Testare Examen Auto</h1>
            <div className="start-button-container">
                <ul>
                    <li><Link className = "start-button" to="/start/instructions">Start</Link></li>
                </ul>
            </div>
            <div className="auth-container">
                <Link to="/login" className="auth-buttons" id="login-button">Login</Link>
                <Link to="/login" className="auth-buttons" id="register-button">Register</Link>
            </div>
            </section>
        </div>
    </Fragment>      
    );

export default Home;