import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T020A from './T020A.png'
import T020B from './T020B.png'
import T020C from './T020C.png'
import T020D from './T020D.png'
import T020Achoose from './T020Achoose.png'
import T020Bchoose from './T020Bchoose.png'
import T020Cchoose from './T020Cchoose.png'
import T020Dchoose from './T020Dchoose.png'
import T020Dwrong from './T020Dwrong.png'
import T020Cwrong from './T020Cwrong.png'
import T020Awrong from './T020Awrong.png'
import T020Btrue from './T020Btrue.png'
import T020 from './T020.png'

function T20() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T020A);
  const [imageSrcB, setImageSrcB] = useState(T020B);
  const [imageSrcC, setImageSrcC] = useState(T020C);
  const [imageSrcD, setImageSrcD] = useState(T020D);

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
      navigate('/Summary', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T020Awrong);
      setImageSrcB(T020Btrue);
      setImageSrcC(T020Cwrong);
      setImageSrcD(T020Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T020Awrong);
        setImageSrcB(T020Btrue);
        setImageSrcC(T020Cwrong);
        setImageSrcD(T020Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T020Achoose);
    setImageSrcB(T020B);
    setImageSrcC(T020C);
    setImageSrcD(T020D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T020Bchoose);
    setImageSrcA(T020A);
    setImageSrcC(T020C);
    setImageSrcD(T020D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T020Cchoose);
    setImageSrcA(T020A);
    setImageSrcB(T020B);
    setImageSrcD(T020D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T020Dchoose);
    setImageSrcA(T020A);
    setImageSrcB(T020B);
    setImageSrcC(T020C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T020} alt='T020' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/Summary', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T20;