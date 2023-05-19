import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import S01A from './S01A.png'
import S01B from './S01B.png'
import S01C from './S01C.png'
import S01D from './S01D.png'
import S01E from './S01E.png'
import S01Achoose from './S01Achoose.png'
import S01Bchoose from './S01Bchoose.png'
import S01Cchoose from './S01Cchoose.png'
import S01Dchoose from './S01Dchoose.png'
import S01Echoose from './S01Echoose.png'
import S01Bwrong from './S01Bwrong.png'
import S01Cwrong from './S01Cwrong.png'
import S01Dwrong from './S01Dwrong.png'
import S01Ewrong from './S01Ewrong.png'
import S01Atrue from './S01Atrue.png'

function S1() {
  const [text, setText] = useState('L A T C H -->');


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(S01A);
  const [imageSrcB, setImageSrcB] = useState(S01B);
  const [imageSrcC, setImageSrcC] = useState(S01C);
  const [imageSrcD, setImageSrcD] = useState(S01D);
  const [imageSrcE, setImageSrcE] = useState(S01E);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ A');
      setSubmitted(true); 
      navigate('/Q2', { state: { score } })// show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(S01Atrue);
      setImageSrcB(S01Bwrong);
      setImageSrcC(S01Cwrong);
      setImageSrcD(S01Dwrong);
      setImageSrcE(S01Ewrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง\nเฉลย : ข้อ A');
        setSubmitted(true);
        setImageSrcA(S01Atrue);
        setImageSrcB(S01Bwrong);
        setImageSrcC(S01Cwrong);
        setImageSrcD(S01Dwrong);
        setImageSrcE(S01Ewrong);
    }
  }

  function handleClickA() {
    setImageSrcA(S01Achoose);
    setImageSrcB(S01B);
    setImageSrcC(S01C);
    setImageSrcD(S01D);
    setImageSrcE(S01E);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(S01Bchoose);
    setImageSrcA(S01A);
    setImageSrcC(S01C);
    setImageSrcD(S01D);
    setImageSrcE(S01E);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(S01Cchoose);
    setImageSrcA(S01A);
    setImageSrcB(S01B);
    setImageSrcD(S01D);
    setImageSrcE(S01E);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(S01Dchoose);
    setImageSrcA(S01A);
    setImageSrcB(S01B);
    setImageSrcC(S01C);
    setImageSrcE(S01E);
    setAnswer('D');
  }

  function handleClickE() {
    setImageSrcE(S01Echoose);
    setImageSrcA(S01A);
    setImageSrcB(S01B);
    setImageSrcC(S01C);
    setImageSrcD(S01D);
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/Q2', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default S1;