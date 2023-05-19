import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import S02A from './S02A.png'
import S02B from './S02B.png'
import S02C from './S02C.png'
import S02D from './S02D.png'
import S02E from './S02E.png'
import S02Achoose from './S02Achoose.png'
import S02Bchoose from './S02Bchoose.png'
import S02Cchoose from './S02Cchoose.png'
import S02Dchoose from './S02Dchoose.png'
import S02Echoose from './S02Echoose.png'
import S02Bwrong from './S02Bwrong.png'
import S02Cwrong from './S02Cwrong.png'
import S02Awrong from './S02Awrong.png'
import S02Ewrong from './S02Ewrong.png'
import S02Dtrue from './S02Dtrue.png'

function S2() {
  const [text, setText] = useState('COMFORT BREAST AND NIPPLE -->');


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(S02A);
  const [imageSrcB, setImageSrcB] = useState(S02B);
  const [imageSrcC, setImageSrcC] = useState(S02C);
  const [imageSrcD, setImageSrcD] = useState(S02D);
  const [imageSrcE, setImageSrcE] = useState(S02E);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ D');
      setSubmitted(true);
      navigate('/Q3', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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

    if (answer === 'D') {
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
      setImageSrcA(S02Awrong);
      setImageSrcB(S02Bwrong);
      setImageSrcC(S02Cwrong);
      setImageSrcD(S02Dtrue);
      setImageSrcE(S02Ewrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(S02Awrong);
        setImageSrcB(S02Bwrong);
        setImageSrcC(S02Cwrong);
        setImageSrcD(S02Dtrue);
        setImageSrcE(S02Ewrong);
    }
  }

  function handleClickA() {
    setImageSrcA(S02Achoose);
    setImageSrcB(S02B);
    setImageSrcC(S02C);
    setImageSrcD(S02D);
    setImageSrcE(S02E);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(S02Bchoose);
    setImageSrcA(S02A);
    setImageSrcC(S02C);
    setImageSrcD(S02D);
    setImageSrcE(S02E);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(S02Cchoose);
    setImageSrcA(S02A);
    setImageSrcB(S02B);
    setImageSrcD(S02D);
    setImageSrcE(S02E);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(S02Dchoose);
    setImageSrcA(S02A);
    setImageSrcB(S02B);
    setImageSrcC(S02C);
    setImageSrcE(S02E);
    setAnswer('D');
  }

  function handleClickE() {
    setImageSrcE(S02Echoose);
    setImageSrcA(S02A);
    setImageSrcB(S02B);
    setImageSrcC(S02C);
    setImageSrcD(S02D);
    setAnswer('E');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <h1>{text}</h1>
              <br></br>
              <img src={imageSrcA} alt="Image" onClick={handleClickA}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcB} alt="Image" onClick={handleClickB}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcC} alt="Image" onClick={handleClickC}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcD} alt="Image" onClick={handleClickD}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcE} alt="Image" onClick={handleClickE}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <br></br>
              {!submitted && <button className="submit-btn" type="submit">ตกลง</button>} {/* display the submit button only if the form has not been submitted */}
              {submitted && <button className="submit-btn" onClick={() => navigate('/Q3', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default S2;