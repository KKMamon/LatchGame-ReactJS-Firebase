import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T012A from './T012A.png'
import T012B from './T012B.png'
import T012C from './T012C.png'
import T012D from './T012D.png'
import T012Achoose from './T012Achoose.png'
import T012Bchoose from './T012Bchoose.png'
import T012Cchoose from './T012Cchoose.png'
import T012Dchoose from './T012Dchoose.png'
import T012Dwrong from './T012Dwrong.png'
import T012Cwrong from './T012Cwrong.png'
import T012Awrong from './T012Awrong.png'
import T012Btrue from './T012Btrue.png'
import T012 from './T012.png'

function T12() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T012A);
  const [imageSrcB, setImageSrcB] = useState(T012B);
  const [imageSrcC, setImageSrcC] = useState(T012C);
  const [imageSrcD, setImageSrcD] = useState(T012D);

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
      navigate('/T16', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T012Awrong);
      setImageSrcB(T012Btrue);
      setImageSrcC(T012Cwrong);
      setImageSrcD(T012Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T012Awrong);
        setImageSrcB(T012Btrue);
        setImageSrcC(T012Cwrong);
        setImageSrcD(T012Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T012Achoose);
    setImageSrcB(T012B);
    setImageSrcC(T012C);
    setImageSrcD(T012D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T012Bchoose);
    setImageSrcA(T012A);
    setImageSrcC(T012C);
    setImageSrcD(T012D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T012Cchoose);
    setImageSrcA(T012A);
    setImageSrcB(T012B);
    setImageSrcD(T012D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T012Dchoose);
    setImageSrcA(T012A);
    setImageSrcB(T012B);
    setImageSrcC(T012C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T012} alt='T012' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T16', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T12;