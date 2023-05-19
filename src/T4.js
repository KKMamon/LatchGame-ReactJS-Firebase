import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T04A from './T04A.png'
import T04B from './T04B.png'
import T04C from './T04C.png'
import T04D from './T04D.png'
import T04Achoose from './T04Achoose.png'
import T04Bchoose from './T04Bchoose.png'
import T04Cchoose from './T04Cchoose.png'
import T04Dchoose from './T04Dchoose.png'
import T04Dwrong from './T04Dwrong.png'
import T04Bwrong from './T04Bwrong.png'
import T04Awrong from './T04Awrong.png'
import T04Ctrue from './T04Ctrue.png'
import T04 from './T04.png'

function T4() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T04A);
  const [imageSrcB, setImageSrcB] = useState(T04B);
  const [imageSrcC, setImageSrcC] = useState(T04C);
  const [imageSrcD, setImageSrcD] = useState(T04D);

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
      navigate('/T8', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T04Awrong);
      setImageSrcB(T04Bwrong);
      setImageSrcC(T04Ctrue);
      setImageSrcD(T04Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T04Awrong);
        setImageSrcB(T04Bwrong);
        setImageSrcC(T04Ctrue);
        setImageSrcD(T04Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T04Achoose);
    setImageSrcB(T04B);
    setImageSrcC(T04C);
    setImageSrcD(T04D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T04Bchoose);
    setImageSrcA(T04A);
    setImageSrcC(T04C);
    setImageSrcD(T04D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T04Cchoose);
    setImageSrcA(T04A);
    setImageSrcB(T04B);
    setImageSrcD(T04D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T04Dchoose);
    setImageSrcA(T04A);
    setImageSrcB(T04B);
    setImageSrcC(T04C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T04} alt='T04' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T8', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T4;