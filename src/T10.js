import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T010A from './T010A.png'
import T010B from './T010B.png'
import T010C from './T010C.png'
import T010D from './T010D.png'
import T010Achoose from './T010Achoose.png'
import T010Bchoose from './T010Bchoose.png'
import T010Cchoose from './T010Cchoose.png'
import T010Dchoose from './T010Dchoose.png'
import T010Dwrong from './T010Dwrong.png'
import T010Bwrong from './T010Bwrong.png'
import T010Cwrong from './T010Cwrong.png'
import T010Atrue from './T010Atrue.png'
import T010 from './T010.png'

function T10() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T010A);
  const [imageSrcB, setImageSrcB] = useState(T010B);
  const [imageSrcC, setImageSrcC] = useState(T010C);
  const [imageSrcD, setImageSrcD] = useState(T010D);

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
      navigate('/T14', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T010Atrue);
      setImageSrcB(T010Bwrong);
      setImageSrcC(T010Cwrong);
      setImageSrcD(T010Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T010Atrue);
        setImageSrcB(T010Bwrong);
        setImageSrcC(T010Cwrong);
        setImageSrcD(T010Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T010Achoose);
    setImageSrcB(T010B);
    setImageSrcC(T010C);
    setImageSrcD(T010D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T010Bchoose);
    setImageSrcA(T010A);
    setImageSrcC(T010C);
    setImageSrcD(T010D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T010Cchoose);
    setImageSrcA(T010A);
    setImageSrcB(T010B);
    setImageSrcD(T010D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T010Dchoose);
    setImageSrcA(T010A);
    setImageSrcB(T010B);
    setImageSrcC(T010C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T010} alt='T010' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T14', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T10;