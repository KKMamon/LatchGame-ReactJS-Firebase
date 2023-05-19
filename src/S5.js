import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import S05A from './S05A.png'
import S05B from './S05B.png'
import S05C from './S05C.png'
import S05D from './S05D.png'
import S05E from './S05E.png'
import S05Achoose from './S05Achoose.png'
import S05Bchoose from './S05Bchoose.png'
import S05Cchoose from './S05Cchoose.png'
import S05Dchoose from './S05Dchoose.png'
import S05Echoose from './S05Echoose.png'
import S05Bwrong from './S05Bwrong.png'
import S05Dwrong from './S05Dwrong.png'
import S05Awrong from './S05Awrong.png'
import S05Cwrong from './S05Cwrong.png'
import S05Etrue from './S05Etrue.png'

function S5() {
  const [text, setText] = useState('HOLD -->');


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(S05A);
  const [imageSrcB, setImageSrcB] = useState(S05B);
  const [imageSrcC, setImageSrcC] = useState(S05C);
  const [imageSrcD, setImageSrcD] = useState(S05D);
  const [imageSrcE, setImageSrcE] = useState(S05E);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ E');
      setSubmitted(true);
      navigate('/checkpoint', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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

    if (answer === 'E') {
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
      setImageSrcA(S05Awrong);
      setImageSrcB(S05Bwrong);
      setImageSrcC(S05Cwrong);
      setImageSrcD(S05Dwrong);
      setImageSrcE(S05Etrue);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(S05Awrong);
        setImageSrcB(S05Bwrong);
        setImageSrcC(S05Cwrong);
        setImageSrcD(S05Dwrong);
        setImageSrcE(S05Etrue);
    }
  }

  function handleClickA() {
    setImageSrcA(S05Achoose);
    setImageSrcB(S05B);
    setImageSrcC(S05C);
    setImageSrcD(S05D);
    setImageSrcE(S05E);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(S05Bchoose);
    setImageSrcA(S05A);
    setImageSrcC(S05C);
    setImageSrcD(S05D);
    setImageSrcE(S05E);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(S05Cchoose);
    setImageSrcA(S05A);
    setImageSrcB(S05B);
    setImageSrcD(S05D);
    setImageSrcE(S05E);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(S05Dchoose);
    setImageSrcA(S05A);
    setImageSrcB(S05B);
    setImageSrcC(S05C);
    setImageSrcE(S05E);
    setAnswer('D');
  }

  function handleClickE() {
    setImageSrcE(S05Echoose);
    setImageSrcA(S05A);
    setImageSrcB(S05B);
    setImageSrcC(S05C);
    setImageSrcD(S05D);
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/checkpoint', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default S5;