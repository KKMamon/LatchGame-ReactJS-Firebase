import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FillInTheBlankGame.css';
import Q01 from './Q01.png'

function Q1() {
  const [text, setText] = useState('L __ __ C __.');
  const [text1, setText1] = useState('L A T C H.');
  const [answer1, setAnswer1] = useState('');
  const [time, setTime] = useState(60); // add state for time
  const [score, setScore] = useState(0); // add state for score
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
      alert('หมดเวลา!!\nเฉลย : LATCH');
      setSubmitted(true);
      navigate('/S1', { state: { score } }) // show popup when time reaches 0
      //navigate('/Q2', { state: { score } }); // pass score as a prop
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

    if (answer1 === 'latch' || answer1 === 'LATCH' || answer1 === 'Latch' ) {
      setAnswered(true);
    } else {
      isCorrect = false;
      setAnswered(true);
      x = true;
    }

    if (isCorrect) {
      setScore(score => score + 1); // increment score by 1
      alert('เฉลย : LATCH\nถูกต้อง!!');
      setSubmitted(true); // set submitted state to true after submission
      //navigate('/Q2', { state: { score } }); // pass score as a prop
    }
    if (x) {
        alert('ไม่ถูกต้อง.\nเฉลย : LATCH');
        setSubmitted(true);
    }
  }

  return (
    <>
      <div className='question' style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p>เวลา : {time} วินาที</p>
        <p>คะแนน : {score}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <img src={Q01} alt='Q1' className='img1'></img>
        <p> {!submitted && text}
            {submitted && text1}</p>
        <br></br>
        <label>
          คำตอบ : {'   '}
          <input type="text" value={answer1} onChange={event => setAnswer1(event.target.value)} disabled={submitted} />
        </label>
        <br></br>
        {!submitted && <button className="submit-btn" type="submit">ตกลง</button>} {/* display the submit button only if the form has not been submitted */}
        {submitted && <button className="submit-btn" onClick={() => navigate('/S1', { state: { score } })}>ข้อต่อไป</button>} {/* display the next button if the form has been submitted */}
      </form>
    </>
  );
}

export default Q1;
