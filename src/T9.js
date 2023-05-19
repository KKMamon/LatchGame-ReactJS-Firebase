import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T09A from './T09A.png'
import T09B from './T09B.png'
import T09C from './T09C.png'
import T09D from './T09D.png'
import T09Achoose from './T09Achoose.png'
import T09Bchoose from './T09Bchoose.png'
import T09Cchoose from './T09Cchoose.png'
import T09Dchoose from './T09Dchoose.png'
import T09Dwrong from './T09Dwrong.png'
import T09Cwrong from './T09Cwrong.png'
import T09Awrong from './T09Awrong.png'
import T09Btrue from './T09Btrue.png'
import T09 from './T09.png'

function T9() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T09A);
  const [imageSrcB, setImageSrcB] = useState(T09B);
  const [imageSrcC, setImageSrcC] = useState(T09C);
  const [imageSrcD, setImageSrcD] = useState(T09D);

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
      navigate('/T13', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T09Awrong);
      setImageSrcB(T09Btrue);
      setImageSrcC(T09Cwrong);
      setImageSrcD(T09Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T09Awrong);
        setImageSrcB(T09Btrue);
        setImageSrcC(T09Cwrong);
        setImageSrcD(T09Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T09Achoose);
    setImageSrcB(T09B);
    setImageSrcC(T09C);
    setImageSrcD(T09D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T09Bchoose);
    setImageSrcA(T09A);
    setImageSrcC(T09C);
    setImageSrcD(T09D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T09Cchoose);
    setImageSrcA(T09A);
    setImageSrcB(T09B);
    setImageSrcD(T09D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T09Dchoose);
    setImageSrcA(T09A);
    setImageSrcB(T09B);
    setImageSrcC(T09C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T09} alt='T09' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T13', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T9;