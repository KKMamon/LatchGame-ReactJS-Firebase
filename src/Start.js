import { useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate();

    function handleNextClick() {
        navigate('/Q1'); // navigate to another component
  }

  return (
    <>
        <div class="controls-container">
      <p id="result"></p>
      <button className="submit-btn" onClick={handleNextClick}>เริ่มเกมส์</button>
    </div>
    </>
  )
}

export default Start;