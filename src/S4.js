import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import { useLocation } from 'react-router-dom';
import S04A from './S04A.png'
import S04B from './S04B.png'
import S04C from './S04C.png'
import S04D from './S04D.png'
import S04E from './S04E.png'
import S04Achoose from './S04Achoose.png'
import S04Bchoose from './S04Bchoose.png'
import S04Cchoose from './S04Cchoose.png'
import S04Dchoose from './S04Dchoose.png'
import S04Echoose from './S04Echoose.png'
import S04Bwrong from './S04Bwrong.png'
import S04Dwrong from './S04Dwrong.png'
import S04Awrong from './S04Awrong.png'
import S04Ewrong from './S04Ewrong.png'
import S04Ctrue from './S04Ctrue.png'

function S4() {
  const [text, setText] = useState('TYPE OF NIPPLE -->');


  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();
  const [imageSrcA, setImageSrcA] = useState(S04A);
  const [imageSrcB, setImageSrcB] = useState(S04B);
  const [imageSrcC, setImageSrcC] = useState(S04C);
  const [imageSrcD, setImageSrcD] = useState(S04D);
  const [imageSrcE, setImageSrcE] = useState(S04E);

  const [answer, setAnswer] = useState('');

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : ข้อ C');
      setSubmitted(true);
      navigate('/Q5', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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
      setImageSrcA(S04Awrong);
      setImageSrcB(S04Bwrong);
      setImageSrcC(S04Ctrue);
      setImageSrcD(S04Dwrong);
      setImageSrcE(S04Ewrong);
    }
    if (x) {
        alert('ไม่ถูกต้อง');
        setSubmitted(true);
        setImageSrcA(S04Awrong);
        setImageSrcB(S04Bwrong);
        setImageSrcC(S04Ctrue);
        setImageSrcD(S04Dwrong);
        setImageSrcE(S04Ewrong);
    }
  }

  function handleClickA() {
    setImageSrcA(S04Achoose);
    setImageSrcB(S04B);
    setImageSrcC(S04C);
    setImageSrcD(S04D);
    setImageSrcE(S04E);
    setAnswer('A');
  }

  function handleClickB() {
    setImageSrcB(S04Bchoose);
    setImageSrcA(S04A);
    setImageSrcC(S04C);
    setImageSrcD(S04D);
    setImageSrcE(S04E);
    setAnswer('B');
  }

  function handleClickC() {
    setImageSrcC(S04Cchoose);
    setImageSrcA(S04A);
    setImageSrcB(S04B);
    setImageSrcD(S04D);
    setImageSrcE(S04E);
    setAnswer('C');

  }

  function handleClickD() {
    setImageSrcD(S04Dchoose);
    setImageSrcA(S04A);
    setImageSrcB(S04B);
    setImageSrcC(S04C);
    setImageSrcE(S04E);
    setAnswer('D');
  }

  function handleClickE() {
    setImageSrcE(S04Echoose);
    setImageSrcA(S04A);
    setImageSrcB(S04B);
    setImageSrcC(S04C);
    setImageSrcD(S04D);
    setAnswer('E');
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>
      </div>
      <form onSubmit={handleSubmit}>
              <h1>{text}</h1>
              <br></br>
              <img src={imageSrcA} alt="Image" onClick={handleClickA}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcB} alt="Image" onClick={handleClickB}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcC} alt="Image" onClick={handleClickC}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcD} alt="Image" onClick={handleClickD}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <img src={imageSrcE} alt="Image" onClick={handleClickE}  onChange={event => setAnswer(event.target.value)} />
              <br></br>
              <br></br>
              {!submitted && <button className="submit-btn" type="submit">ตกลง</button>} {/* display the submit button only if the form has not been submitted */}
              {submitted && <button className="submit-btn" onClick={() => navigate('/Q5', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default S4;