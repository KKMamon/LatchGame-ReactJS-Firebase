import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T01A from './T01A.png'
import T01B from './T01B.png'
import T01C from './T01C.png'
import T01D from './T01D.png'
import T01Achoose from './T01Achoose.png'
import T01Bchoose from './T01Bchoose.png'
import T01Cchoose from './T01Cchoose.png'
import T01Dchoose from './T01Dchoose.png'
import T01Dwrong from './T01Dwrong.png'
import T01Bwrong from './T01Bwrong.png'
import T01Awrong from './T01Awrong.png'
import T01Ctrue from './T01Ctrue.png'
import T01 from './T01.png'

function T1() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T01A);
  const [imageSrcB, setImageSrcB] = useState(T01B);
  const [imageSrcC, setImageSrcC] = useState(T01C);
  const [imageSrcD, setImageSrcD] = useState(T01D);

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
      navigate('/T5', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T01Awrong);
      setImageSrcB(T01Bwrong);
      setImageSrcC(T01Ctrue);
      setImageSrcD(T01Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T01Awrong);
        setImageSrcB(T01Bwrong);
        setImageSrcC(T01Ctrue);
        setImageSrcD(T01Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T01Achoose);
    setImageSrcB(T01B);
    setImageSrcC(T01C);
    setImageSrcD(T01D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T01Bchoose);
    setImageSrcA(T01A);
    setImageSrcC(T01C);
    setImageSrcD(T01D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T01Cchoose);
    setImageSrcA(T01A);
    setImageSrcB(T01B);
    setImageSrcD(T01D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T01Dchoose);
    setImageSrcA(T01A);
    setImageSrcB(T01B);
    setImageSrcC(T01C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T01} alt='T01' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T5', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T1;