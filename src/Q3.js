import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame2.css';
import Q03 from './Q03.png'
import { useLocation } from 'react-router-dom';

function Q3() {
  const [text, setText] = useState('A __ __ __ B __ E\u00a0\u00a0\u00a0S __ __ L __ __ W __ __ G');
  const [text1, setText1] = useState('AUDIBLE SWALLOWING');
  const [answer1, setAnswer1] = useState('');
  const [time, setTime] = useState(60); // add state for time
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0); // set the initial score to 0 or the score from the location state
  const [submitted, setSubmitted] = useState(false); // add state for submission
  const [answered, setAnswered] = useState(false); // add state for answer
  const navigate = useNavigate();

  // start the stopwatch when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      alert('หมดเวลา!!\nเฉลย : AUDIBLE SWALLOWING');
      setSubmitted(true);
      navigate('/S3', { state: { score } }) // show popup when time reaches 0 // show popup when time reaches 0
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

    if (answer1 === 'audible swallowing' || answer1 === 'AUDIBLE SWALLOWING') {
    setAnswered(true);
    } else {
      isCorrect = false;
      setAnswered(true);
      x = true;
    }

    if (isCorrect) {
      setScore(score + 1); // increment score by 1
      alert('เฉลย : AUDIBLE SWALLOWING\nถูกต้อง!!');
      setSubmitted(true); // set submitted state to true after submission
    }
    if (x) {
        alert('ไม่ถูกต้อง.\nเฉลย : AUDIBLE SWALLOWING');
        setSubmitted(true);
    }
  }

  return (
    <><div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>เวลา : {time} วินาที</p>
          <p>คะแนน : {score}</p>

            
      </div><form onSubmit={handleSubmit}>
      <img src={Q03} alt='Q3' className='img1'></img>
      <p>   {!submitted && text}
            {submitted && text1}</p>
              <br></br>
              <label>
                  คำตอบ : {'   '}
                  <input type="text" value={answer1} onChange={event => setAnswer1(event.target.value)} disabled={submitted}/>
              </label>
              <br></br>
              {!submitted && <button className="submit-btn" type="submit">ตกลง</button>} {/* display the submit button only if the form has not been submitted */}
              {submitted && <button className="submit-btn" onClick={() => navigate('/S3', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
              <br></br>
          </form></>
  );
}

export default Q3;