import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T018A from './T018A.png'
import T018B from './T018B.png'
import T018C from './T018C.png'
import T018D from './T018D.png'
import T018Achoose from './T018Achoose.png'
import T018Bchoose from './T018Bchoose.png'
import T018Cchoose from './T018Cchoose.png'
import T018Dchoose from './T018Dchoose.png'
import T018Dwrong from './T018Dwrong.png'
import T018Cwrong from './T018Cwrong.png'
import T018Awrong from './T018Awrong.png'
import T018Btrue from './T018Btrue.png'
import T018 from './T018.png'

function T18() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T018A);
  const [imageSrcB, setImageSrcB] = useState(T018B);
  const [imageSrcC, setImageSrcC] = useState(T018C);
  const [imageSrcD, setImageSrcD] = useState(T018D);

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
      setImageSrcA(T018Awrong);
      setImageSrcB(T018Btrue);
      setImageSrcC(T018Cwrong);
      setImageSrcD(T018Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T018Awrong);
        setImageSrcB(T018Btrue);
        setImageSrcC(T018Cwrong);
        setImageSrcD(T018Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T018Achoose);
    setImageSrcB(T018B);
    setImageSrcC(T018C);
    setImageSrcD(T018D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T018Bchoose);
    setImageSrcA(T018A);
    setImageSrcC(T018C);
    setImageSrcD(T018D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T018Cchoose);
    setImageSrcA(T018A);
    setImageSrcB(T018B);
    setImageSrcD(T018D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T018Dchoose);
    setImageSrcA(T018A);
    setImageSrcB(T018B);
    setImageSrcC(T018C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T018} alt='T018' className='img1'></img>
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

export default T18;