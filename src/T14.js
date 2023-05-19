import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T014A from './T014A.png'
import T014B from './T014B.png'
import T014C from './T014C.png'
import T014D from './T014D.png'
import T014Achoose from './T014Achoose.png'
import T014Bchoose from './T014Bchoose.png'
import T014Cchoose from './T014Cchoose.png'
import T014Dchoose from './T014Dchoose.png'
import T014Dwrong from './T014Dwrong.png'
import T014Cwrong from './T014Cwrong.png'
import T014Awrong from './T014Awrong.png'
import T014Btrue from './T014Btrue.png'
import T014 from './T014.png'

function T14() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T014A);
  const [imageSrcB, setImageSrcB] = useState(T014B);
  const [imageSrcC, setImageSrcC] = useState(T014C);
  const [imageSrcD, setImageSrcD] = useState(T014D);

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
      navigate('/T18', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(T014Awrong);
      setImageSrcB(T014Btrue);
      setImageSrcC(T014Cwrong);
      setImageSrcD(T014Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T014Awrong);
        setImageSrcB(T014Btrue);
        setImageSrcC(T014Cwrong);
        setImageSrcD(T014Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T014Achoose);
    setImageSrcB(T014B);
    setImageSrcC(T014C);
    setImageSrcD(T014D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T014Bchoose);
    setImageSrcA(T014A);
    setImageSrcC(T014C);
    setImageSrcD(T014D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T014Cchoose);
    setImageSrcA(T014A);
    setImageSrcB(T014B);
    setImageSrcD(T014D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T014Dchoose);
    setImageSrcA(T014A);
    setImageSrcB(T014B);
    setImageSrcC(T014C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T014} alt='T014' className='img1'></img>
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
              {submitted && <button className="submit-btn" onClick={() => navigate('/T18', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default T14;