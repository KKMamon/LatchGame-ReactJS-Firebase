import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T011A from './T011A.png'
import T011B from './T011B.png'
import T011C from './T011C.png'
import T011D from './T011D.png'
import T011Achoose from './T011Achoose.png'
import T011Bchoose from './T011Bchoose.png'
import T011Cchoose from './T011Cchoose.png'
import T011Dchoose from './T011Dchoose.png'
import T011Cwrong from './T011Cwrong.png'
import T011Bwrong from './T011Bwrong.png'
import T011Awrong from './T011Awrong.png'
import T011Dtrue from './T011Dtrue.png'
import T011 from './T011.png'

function T11() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T011A);
  const [imageSrcB, setImageSrcB] = useState(T011B);
  const [imageSrcC, setImageSrcC] = useState(T011C);
  const [imageSrcD, setImageSrcD] = useState(T011D);

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
      navigate('/T15', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T011Awrong);
      setImageSrcB(T011Bwrong);
      setImageSrcC(T011Cwrong);
      setImageSrcD(T011Dtrue);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T011Awrong);
        setImageSrcB(T011Bwrong);
        setImageSrcC(T011Cwrong);
        setImageSrcD(T011Dtrue);
    }
  }

  function handleClickA() {
    setImageSrcA(T011Achoose);
    setImageSrcB(T011B);
    setImageSrcC(T011C);
    setImageSrcD(T011D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T011Bchoose);
    setImageSrcA(T011A);
    setImageSrcC(T011C);
    setImageSrcD(T011D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T011Cchoose);
    setImageSrcA(T011A);
    setImageSrcB(T011B);
    setImageSrcD(T011D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T011Dchoose);
    setImageSrcA(T011A);
    setImageSrcB(T011B);
    setImageSrcC(T011C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T011} alt='T011' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T15', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T11;