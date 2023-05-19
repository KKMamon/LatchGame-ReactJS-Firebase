import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T02A from './T02A.png'
import T02B from './T02B.png'
import T02C from './T02C.png'
import T02D from './T02D.png'
import T02Achoose from './T02Achoose.png'
import T02Bchoose from './T02Bchoose.png'
import T02Cchoose from './T02Cchoose.png'
import T02Dchoose from './T02Dchoose.png'
import T02Dwrong from './T02Dwrong.png'
import T02Cwrong from './T02Cwrong.png'
import T02Awrong from './T02Awrong.png'
import T02Btrue from './T02Btrue.png'
import T02 from './T02.png'

function T2() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T02A);
  const [imageSrcB, setImageSrcB] = useState(T02B);
  const [imageSrcC, setImageSrcC] = useState(T02C);
  const [imageSrcD, setImageSrcD] = useState(T02D);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ ข.');
      setSubmitted(true);
      navigate('/T6', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T02Awrong);
      setImageSrcB(T02Btrue);
      setImageSrcC(T02Cwrong);
      setImageSrcD(T02Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T02Awrong);
        setImageSrcB(T02Btrue);
        setImageSrcC(T02Cwrong);
        setImageSrcD(T02Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T02Achoose);
    setImageSrcB(T02B);
    setImageSrcC(T02C);
    setImageSrcD(T02D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T02Bchoose);
    setImageSrcA(T02A);
    setImageSrcC(T02C);
    setImageSrcD(T02D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T02Cchoose);
    setImageSrcA(T02A);
    setImageSrcB(T02B);
    setImageSrcD(T02D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T02Dchoose);
    setImageSrcA(T02A);
    setImageSrcB(T02B);
    setImageSrcC(T02C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T02} alt='T02' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T6', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T2;