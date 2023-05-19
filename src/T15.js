import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T015A from './T015A.png'
import T015B from './T015B.png'
import T015C from './T015C.png'
import T015D from './T015D.png'
import T015Achoose from './T015Achoose.png'
import T015Bchoose from './T015Bchoose.png'
import T015Cchoose from './T015Cchoose.png'
import T015Dchoose from './T015Dchoose.png'
import T015Cwrong from './T015Cwrong.png'
import T015Bwrong from './T015Bwrong.png'
import T015Awrong from './T015Awrong.png'
import T015Dtrue from './T015Dtrue.png'
import T015 from './T015.png'

function T15() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T015A);
  const [imageSrcB, setImageSrcB] = useState(T015B);
  const [imageSrcC, setImageSrcC] = useState(T015C);
  const [imageSrcD, setImageSrcD] = useState(T015D);

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
      navigate('/T19', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T015Awrong);
      setImageSrcB(T015Bwrong);
      setImageSrcC(T015Cwrong);
      setImageSrcD(T015Dtrue);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T015Awrong);
        setImageSrcB(T015Bwrong);
        setImageSrcC(T015Cwrong);
        setImageSrcD(T015Dtrue);
    }
  }

  function handleClickA() {
    setImageSrcA(T015Achoose);
    setImageSrcB(T015B);
    setImageSrcC(T015C);
    setImageSrcD(T015D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T015Bchoose);
    setImageSrcA(T015A);
    setImageSrcC(T015C);
    setImageSrcD(T015D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T015Cchoose);
    setImageSrcA(T015A);
    setImageSrcB(T015B);
    setImageSrcD(T015D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T015Dchoose);
    setImageSrcA(T015A);
    setImageSrcB(T015B);
    setImageSrcC(T015C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T015} alt='T015' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T19', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T15;