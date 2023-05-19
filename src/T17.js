import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import T017A from './T017A.png'
import T017B from './T017B.png'
import T017C from './T017C.png'
import T017D from './T017D.png'
import T017Achoose from './T017Achoose.png'
import T017Bchoose from './T017Bchoose.png'
import T017Cchoose from './T017Cchoose.png'
import T017Dchoose from './T017Dchoose.png'
import T017Dwrong from './T017Dwrong.png'
import T017Bwrong from './T017Bwrong.png'
import T017Awrong from './T017Awrong.png'
import T017Ctrue from './T017Ctrue.png'
import T017 from './T017.png'

function T17() {


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(T017A);
  const [imageSrcB, setImageSrcB] = useState(T017B);
  const [imageSrcC, setImageSrcC] = useState(T017C);
  const [imageSrcD, setImageSrcD] = useState(T017D);

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
      setImageSrcA(T017Awrong);
      setImageSrcB(T017Bwrong);
      setImageSrcC(T017Ctrue);
      setImageSrcD(T017Dwrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(T017Awrong);
        setImageSrcB(T017Bwrong);
        setImageSrcC(T017Ctrue);
        setImageSrcD(T017Dwrong);
    }
  }

  function handleClickA() {
    setImageSrcA(T017Achoose);
    setImageSrcB(T017B);
    setImageSrcC(T017C);
    setImageSrcD(T017D);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(T017Bchoose);
    setImageSrcA(T017A);
    setImageSrcC(T017C);
    setImageSrcD(T017D);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(T017Cchoose);
    setImageSrcA(T017A);
    setImageSrcB(T017B);
    setImageSrcD(T017D);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(T017Dchoose);
    setImageSrcA(T017A);
    setImageSrcB(T017B);
    setImageSrcC(T017C);
    setAnswer('D');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <img src={T017} alt='T017' className='img1'></img>
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

export default T17;