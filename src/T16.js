import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T016A from './T016A.png'
import T016B from './T016B.png'
import T016C from './T016C.png'
import T016D from './T016D.png'
import T016Achoose from './T016Achoose.png'
import T016Bchoose from './T016Bchoose.png'
import T016Cchoose from './T016Cchoose.png'
import T016Dchoose from './T016Dchoose.png'
import T016Dwrong from './T016Dwrong.png'
import T016Bwrong from './T016Bwrong.png'
import T016Cwrong from './T016Cwrong.png'
import T016Atrue from './T016Atrue.png'
import T016 from './T016.png'

function T16() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T016A);
  const [imageSrcB, setImageSrcB] = useState(T016B);
  const [imageSrcC, setImageSrcC] = useState(T016C);
  const [imageSrcD, setImageSrcD] = useState(T016D);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ ก.');
      setSubmitted(true);
      navigate('/T20', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
      //navigate('/Q2'); // navigate to another component
    }
    if (answered) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [navigate, score, time, answered]);

  function handleSubmit(event) {
    event.preventDefault();
    let isCorrect = true;
    let x = false;
    console.log(answer)

    if (answer === 'A') {
    setAnswered(true);
    } else {
      isCorrect = false;
      setAnswered(true);
      x = true;
    }

    if (isCorrect) {
      setScore(score + 1); // increment score by 1
      alert('ถูกต้อง!!');
      setSubmitted(true); // set submitted state to true after submission
      setImageSrcA(T016Atrue);
      setImageSrcB(T016Bwrong);
      setImageSrcC(T016Cwrong);
      setImageSrcD(T016Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T016Atrue);
        setImageSrcB(T016Bwrong);
        setImageSrcC(T016Cwrong);
        setImageSrcD(T016Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T016Achoose);
    setImageSrcB(T016B);
    setImageSrcC(T016C);
    setImageSrcD(T016D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T016Bchoose);
    setImageSrcA(T016A);
    setImageSrcC(T016C);
    setImageSrcD(T016D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T016Cchoose);
    setImageSrcA(T016A);
    setImageSrcB(T016B);
    setImageSrcD(T016D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T016Dchoose);
    setImageSrcA(T016A);
    setImageSrcB(T016B);
    setImageSrcC(T016C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T016} alt='T016' className='img1'></img>
              <br></br>
              <img src={imageSrcA} alt="Image" onClick={handleClickA}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcB} alt="Image" onClick={handleClickB}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcC} alt="Image" onClick={handleClickC}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcD} alt="Image" onClick={handleClickD}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <br></br>
              {!submitted && <button className="submit-btn" type="submit">ตกลง</button>} {/* display the submit button only if the form has not been submitted */}
              {submitted && <button className="submit-btn" onClick={() => navigate('/T20', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T16;