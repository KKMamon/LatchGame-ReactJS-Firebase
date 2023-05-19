import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T03A from './T03A.png'
import T03B from './T03B.png'
import T03C from './T03C.png'
import T03D from './T03D.png'
import T03Achoose from './T03Achoose.png'
import T03Bchoose from './T03Bchoose.png'
import T03Cchoose from './T03Cchoose.png'
import T03Dchoose from './T03Dchoose.png'
import T03Dwrong from './T03Dwrong.png'
import T03Bwrong from './T03Bwrong.png'
import T03Awrong from './T03Awrong.png'
import T03Ctrue from './T03Ctrue.png'
import T03 from './T03.png'

function T3() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T03A);
  const [imageSrcB, setImageSrcB] = useState(T03B);
  const [imageSrcC, setImageSrcC] = useState(T03C);
  const [imageSrcD, setImageSrcD] = useState(T03D);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ ค.');
      setSubmitted(true);
      navigate('/T7', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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

    if (answer === 'C') {
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
      setImageSrcA(T03Awrong);
      setImageSrcB(T03Bwrong);
      setImageSrcC(T03Ctrue);
      setImageSrcD(T03Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T03Awrong);
        setImageSrcB(T03Bwrong);
        setImageSrcC(T03Ctrue);
        setImageSrcD(T03Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T03Achoose);
    setImageSrcB(T03B);
    setImageSrcC(T03C);
    setImageSrcD(T03D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T03Bchoose);
    setImageSrcA(T03A);
    setImageSrcC(T03C);
    setImageSrcD(T03D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T03Cchoose);
    setImageSrcA(T03A);
    setImageSrcB(T03B);
    setImageSrcD(T03D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T03Dchoose);
    setImageSrcA(T03A);
    setImageSrcB(T03B);
    setImageSrcC(T03C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T03} alt='T03' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T7', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T3;