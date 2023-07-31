import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';

import intrebari from '../../intrebari.json';
import isEmpty from '../../utils/is-empty';

class Start extends Component {
    constructor (props) {
        super(props);
        this.state = {
            intrebari,
        currentQuestion: {},
        nextQuestion: {},
        previousQuestion: {},
        answer: '',
        numberOfQuestions: 0,
        numberOfAnsweredQuestion: 0,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        time: {}
        };
        this.interval = null;
    }
    
    componentDidMount () {
        const { intrebari, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(intrebari, currentQuestion, nextQuestion, previousQuestion );
        this.startTimer();
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

        
        displayQuestions = (intrebari = this.state.intrebari, currentQuestion, nextQuestion, previousQuestion) => {

            let { currentQuestionIndex } = this.state;
            if(!isEmpty(this.state.intrebari)) {
                intrebari = this.state.intrebari;
                currentQuestion = intrebari[currentQuestionIndex];
                nextQuestion = intrebari[currentQuestionIndex + 1];
                previousQuestion = intrebari[currentQuestionIndex - 1];
                const answer = currentQuestion.answer;
                this.setState({
                    currentQuestion,
                    nextQuestion,
                    previousQuestion,
                    numberOfAnsweredQuestion: intrebari.length,
                    answer
                })
            }

        }
    
        handleOptionClick = (e) => {
           if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            this.correctAnswer();
           } else {
            this.wrongAnswer();
           }
        }

        correctAnswer = () => {
            M.toast({
                html : 'Corect!',
                classes : 'toast-valid',
                displayLength: 1500

            })
            
            this.setState(prevState => ({
                score: prevState.score + 1,
                correctAnswers: prevState.correctAnswers + 1,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1
            }), () => {
                if(this.state.nextQuestion === undefined) {
                    this.endGame();
                } else {
                    this.displayQuestions(this.state.intrebari, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                }
                
            })

        }

        wrongAnswer = () => {
            navigator.vibrate(1000);
            M.toast({
                html : 'Gresit!',
                classes : 'toast-invalid',
                displayLength: 1500

            })
            
            this.setState(prevState => ({
                wrongAnswers: prevState.wrongAnswers + 1,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1
            }), () => { 
                if(this.state.nextQuestion === undefined) {
                    this.endGame();
                } else {
                    this.displayQuestions(this.state.intrebari, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                }
                
            })

        }

        startTimer = () => {
            const countDownTimer = Date.now() + 1800000;
            this.interval = setInterval(() => {
                const now = new Date();
                const distance = countDownTimer - now;

                const minutes = Math.floor((distance %(1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance %(1000 * 60)) / 1000);

                if(distance < 0) {
                    clearInterval(this.interval);
                    this.setState({
                        time: {
                            minutes: 0,
                            seconds: 0
                        }
                    }, () => {
                       this.endGame();
                    })
                }else {
                    this.setState({
                        time: {
                            minutes,
                            seconds
                        }
                    })
                }
            }, 1000);
        }

        endGame = () => {
            const { state } = this;
            const playerStats = {
                score: state.score,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestion: state.numberOfAnsweredQuestion,
                correctAnswer: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,

            }
            if( playerStats.score <= 21){
                alert("Ai picat testul! Ai raspuns corect la " + playerStats.score + " intrebari!")
            }else {
                alert("Ai trecut testul! Ai raspuns corect la " + playerStats.score + " intrebari!")
            }
            console.log(playerStats);
            setTimeout(() => {
                this.props.history.push('/start/rezultat' , playerStats);
            }, 1000)
        }

    render () {

       const { currentQuestion, time } = this.state;

        return (
           <Fragment>
                <Helmet>
                    <title>
                        Examen Auto Teoretic
                    </title>
                </Helmet>
                <div className="intrebari">
                    <div>
                        <p>
                         <span className="right">{time.minutes}:{time.seconds}<span className='mdi mdi-clock-outline mdi-24px'></span></span>
                        </p>
                    </div>
                    <h5>
                       {currentQuestion.question}
                    </h5>
                    <div className='options-container'>
                    <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionA}</p>
                    <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionB}</p>
                    </div>
                    <div className='options-container'>
                    <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionC}</p>
                    </div>
                </div>
           </Fragment>
        )
    }
}


export default Start;