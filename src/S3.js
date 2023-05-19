import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import S03A from './S03A.png'
import S03B from './S03B.png'
import S03C from './S03C.png'
import S03D from './S03D.png'
import S03E from './S03E.png'
import S03Achoose from './S03Achoose.png'
import S03Bchoose from './S03Bchoose.png'
import S03Cchoose from './S03Cchoose.png'
import S03Dchoose from './S03Dchoose.png'
import S03Echoose from './S03Echoose.png'
import S03Dwrong from './S03Dwrong.png'
import S03Cwrong from './S03Cwrong.png'
import S03Awrong from './S03Awrong.png'
import S03Ewrong from './S03Ewrong.png'
import S03Btrue from './S03Btrue.png'

function S2() {
  const [text, setText] = useState('AUDIBLE SWALLOWING -->');


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(S03A);
  const [imageSrcB, setImageSrcB] = useState(S03B);
  const [imageSrcC, setImageSrcC] = useState(S03C);
  const [imageSrcD, setImageSrcD] = useState(S03D);
  const [imageSrcE, setImageSrcE] = useState(S03E);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ B');
      setSubmitted(true);
      navigate('/Q4', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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

    if (answer === 'B') {
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
      setImageSrcA(S03Awrong);
      setImageSrcB(S03Btrue);
      setImageSrcC(S03Cwrong);
      setImageSrcD(S03Dwrong);
      setImageSrcE(S03Ewrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(S03Awrong);
        setImageSrcB(S03Btrue);
        setImageSrcC(S03Cwrong);
        setImageSrcD(S03Dwrong);
        setImageSrcE(S03Ewrong);
    }
  }

  function handleClickA() {
    setImageSrcA(S03Achoose);
    setImageSrcB(S03B);
    setImageSrcC(S03C);
    setImageSrcD(S03D);
    setImageSrcE(S03E);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(S03Bchoose);
    setImageSrcA(S03A);
    setImageSrcC(S03C);
    setImageSrcD(S03D);
    setImageSrcE(S03E);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(S03Cchoose);
    setImageSrcA(S03A);
    setImageSrcB(S03B);
    setImageSrcD(S03D);
    setImageSrcE(S03E);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(S03Dchoose);
    setImageSrcA(S03A);
    setImageSrcB(S03B);
    setImageSrcC(S03C);
    setImageSrcE(S03E);
    setAnswer('D');
  }

  function handleClickE() {
    setImageSrcE(S03Echoose);
    setImageSrcA(S03A);
    setImageSrcB(S03B);
    setImageSrcC(S03C);
    setImageSrcD(S03D);
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/Q4', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default S2;