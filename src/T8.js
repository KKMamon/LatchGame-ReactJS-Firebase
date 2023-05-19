import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T08A from './T08A.png'
import T08B from './T08B.png'
import T08C from './T08C.png'
import T08D from './T08D.png'
import T08Achoose from './T08Achoose.png'
import T08Bchoose from './T08Bchoose.png'
import T08Cchoose from './T08Cchoose.png'
import T08Dchoose from './T08Dchoose.png'
import T08Dwrong from './T08Dwrong.png'
import T08Bwrong from './T08Bwrong.png'
import T08Cwrong from './T08Cwrong.png'
import T08Atrue from './T08Atrue.png'
import T08 from './T08.png'

function T8() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T08A);
  const [imageSrcB, setImageSrcB] = useState(T08B);
  const [imageSrcC, setImageSrcC] = useState(T08C);
  const [imageSrcD, setImageSrcD] = useState(T08D);

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
      navigate('/T12', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T08Atrue);
      setImageSrcB(T08Bwrong);
      setImageSrcC(T08Cwrong);
      setImageSrcD(T08Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T08Atrue);
        setImageSrcB(T08Bwrong);
        setImageSrcC(T08Cwrong);
        setImageSrcD(T08Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T08Achoose);
    setImageSrcB(T08B);
    setImageSrcC(T08C);
    setImageSrcD(T08D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T08Bchoose);
    setImageSrcA(T08A);
    setImageSrcC(T08C);
    setImageSrcD(T08D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T08Cchoose);
    setImageSrcA(T08A);
    setImageSrcB(T08B);
    setImageSrcD(T08D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T08Dchoose);
    setImageSrcA(T08A);
    setImageSrcB(T08B);
    setImageSrcC(T08C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T08} alt='T08' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T12', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T8;