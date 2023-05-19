import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T06A from './T06A.png'
import T06B from './T06B.png'
import T06C from './T06C.png'
import T06D from './T06D.png'
import T06Achoose from './T06Achoose.png'
import T06Bchoose from './T06Bchoose.png'
import T06Cchoose from './T06Cchoose.png'
import T06Dchoose from './T06Dchoose.png'
import T06Cwrong from './T06Cwrong.png'
import T06Bwrong from './T06Bwrong.png'
import T06Awrong from './T06Awrong.png'
import T06Dtrue from './T06Dtrue.png'
import T06 from './T06.png'

function T6() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T06A);
  const [imageSrcB, setImageSrcB] = useState(T06B);
  const [imageSrcC, setImageSrcC] = useState(T06C);
  const [imageSrcD, setImageSrcD] = useState(T06D);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ ง.');
      setSubmitted(true);
      navigate('/T10', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T06Awrong);
      setImageSrcB(T06Bwrong);
      setImageSrcC(T06Cwrong);
      setImageSrcD(T06Dtrue);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T06Awrong);
        setImageSrcB(T06Bwrong);
        setImageSrcC(T06Cwrong);
        setImageSrcD(T06Dtrue);
    }
  }

  function handleClickA() {
    setImageSrcA(T06Achoose);
    setImageSrcB(T06B);
    setImageSrcC(T06C);
    setImageSrcD(T06D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T06Bchoose);
    setImageSrcA(T06A);
    setImageSrcC(T06C);
    setImageSrcD(T06D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T06Cchoose);
    setImageSrcA(T06A);
    setImageSrcB(T06B);
    setImageSrcD(T06D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T06Dchoose);
    setImageSrcA(T06A);
    setImageSrcB(T06B);
    setImageSrcC(T06C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T06} alt='T06' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T10', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T6;