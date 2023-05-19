import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T07A from './T07A.png'
import T07B from './T07B.png'
import T07C from './T07C.png'
import T07D from './T07D.png'
import T07Achoose from './T07Achoose.png'
import T07Bchoose from './T07Bchoose.png'
import T07Cchoose from './T07Cchoose.png'
import T07Dchoose from './T07Dchoose.png'
import T07Cwrong from './T07Cwrong.png'
import T07Bwrong from './T07Bwrong.png'
import T07Awrong from './T07Awrong.png'
import T07Dtrue from './T07Dtrue.png'
import T07 from './T07.png'

function T7() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T07A);
  const [imageSrcB, setImageSrcB] = useState(T07B);
  const [imageSrcC, setImageSrcC] = useState(T07C);
  const [imageSrcD, setImageSrcD] = useState(T07D);

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
      navigate('/T11', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T07Awrong);
      setImageSrcB(T07Bwrong);
      setImageSrcC(T07Cwrong);
      setImageSrcD(T07Dtrue);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T07Awrong);
        setImageSrcB(T07Bwrong);
        setImageSrcC(T07Cwrong);
        setImageSrcD(T07Dtrue);
    }
  }

  function handleClickA() {
    setImageSrcA(T07Achoose);
    setImageSrcB(T07B);
    setImageSrcC(T07C);
    setImageSrcD(T07D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T07Bchoose);
    setImageSrcA(T07A);
    setImageSrcC(T07C);
    setImageSrcD(T07D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T07Cchoose);
    setImageSrcA(T07A);
    setImageSrcB(T07B);
    setImageSrcD(T07D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T07Dchoose);
    setImageSrcA(T07A);
    setImageSrcB(T07B);
    setImageSrcC(T07C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T07} alt='T07' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T11', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T7;