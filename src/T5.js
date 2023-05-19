import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T05A from './T05A.png'
import T05B from './T05B.png'
import T05C from './T05C.png'
import T05D from './T05D.png'
import T05Achoose from './T05Achoose.png'
import T05Bchoose from './T05Bchoose.png'
import T05Cchoose from './T05Cchoose.png'
import T05Dchoose from './T05Dchoose.png'
import T05Dwrong from './T05Dwrong.png'
import T05Bwrong from './T05Bwrong.png'
import T05Cwrong from './T05Cwrong.png'
import T05Atrue from './T05Atrue.png'
import T05 from './T05.png'

function T5() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T05A);
  const [imageSrcB, setImageSrcB] = useState(T05B);
  const [imageSrcC, setImageSrcC] = useState(T05C);
  const [imageSrcD, setImageSrcD] = useState(T05D);

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
      navigate('/T9', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T05Atrue);
      setImageSrcB(T05Bwrong);
      setImageSrcC(T05Cwrong);
      setImageSrcD(T05Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T05Atrue);
        setImageSrcB(T05Bwrong);
        setImageSrcC(T05Cwrong);
        setImageSrcD(T05Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T05Achoose);
    setImageSrcB(T05B);
    setImageSrcC(T05C);
    setImageSrcD(T05D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T05Bchoose);
    setImageSrcA(T05A);
    setImageSrcC(T05C);
    setImageSrcD(T05D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T05Cchoose);
    setImageSrcA(T05A);
    setImageSrcB(T05B);
    setImageSrcD(T05D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T05Dchoose);
    setImageSrcA(T05A);
    setImageSrcB(T05B);
    setImageSrcC(T05C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T05} alt='T05' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T9', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T5;