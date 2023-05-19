import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T019A from './T019A.png'
import T019B from './T019B.png'
import T019C from './T019C.png'
import T019D from './T019D.png'
import T019Achoose from './T019Achoose.png'
import T019Bchoose from './T019Bchoose.png'
import T019Cchoose from './T019Cchoose.png'
import T019Dchoose from './T019Dchoose.png'
import T019Dwrong from './T019Dwrong.png'
import T019Bwrong from './T019Bwrong.png'
import T019Awrong from './T019Awrong.png'
import T019Ctrue from './T019Ctrue.png'
import T019 from './T019.png'

function T19() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T019A);
  const [imageSrcB, setImageSrcB] = useState(T019B);
  const [imageSrcC, setImageSrcC] = useState(T019C);
  const [imageSrcD, setImageSrcD] = useState(T019D);

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
      setImageSrcA(T019Awrong);
      setImageSrcB(T019Bwrong);
      setImageSrcC(T019Ctrue);
      setImageSrcD(T019Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T019Awrong);
        setImageSrcB(T019Bwrong);
        setImageSrcC(T019Ctrue);
        setImageSrcD(T019Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T019Achoose);
    setImageSrcB(T019B);
    setImageSrcC(T019C);
    setImageSrcD(T019D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T019Bchoose);
    setImageSrcA(T019A);
    setImageSrcC(T019C);
    setImageSrcD(T019D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T019Cchoose);
    setImageSrcA(T019A);
    setImageSrcB(T019B);
    setImageSrcD(T019D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T019Dchoose);
    setImageSrcA(T019A);
    setImageSrcB(T019B);
    setImageSrcC(T019C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T019} alt='T019' className='img1'></img>
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

export default T19;