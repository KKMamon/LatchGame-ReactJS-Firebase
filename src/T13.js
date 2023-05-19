import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T013A from './T013A.png'
import T013B from './T013B.png'
import T013C from './T013C.png'
import T013D from './T013D.png'
import T013Achoose from './T013Achoose.png'
import T013Bchoose from './T013Bchoose.png'
import T013Cchoose from './T013Cchoose.png'
import T013Dchoose from './T013Dchoose.png'
import T013Dwrong from './T013Dwrong.png'
import T013Bwrong from './T013Bwrong.png'
import T013Cwrong from './T013Cwrong.png'
import T013Atrue from './T013Atrue.png'
import T013 from './T013.png'

function T13() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T013A);
  const [imageSrcB, setImageSrcB] = useState(T013B);
  const [imageSrcC, setImageSrcC] = useState(T013C);
  const [imageSrcD, setImageSrcD] = useState(T013D);

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
      navigate('/T17', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T013Atrue);
      setImageSrcB(T013Bwrong);
      setImageSrcC(T013Cwrong);
      setImageSrcD(T013Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T013Atrue);
        setImageSrcB(T013Bwrong);
        setImageSrcC(T013Cwrong);
        setImageSrcD(T013Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T013Achoose);
    setImageSrcB(T013B);
    setImageSrcC(T013C);
    setImageSrcD(T013D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T013Bchoose);
    setImageSrcA(T013A);
    setImageSrcC(T013C);
    setImageSrcD(T013D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T013Cchoose);
    setImageSrcA(T013A);
    setImageSrcB(T013B);
    setImageSrcD(T013D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T013Dchoose);
    setImageSrcA(T013A);
    setImageSrcB(T013B);
    setImageSrcC(T013C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T013} alt='T013' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T17', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T13;