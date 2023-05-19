import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [score, setScore] = useState(location.state.score || 0);
  const [name, setName] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  useEffect(() => {
    const firebaseConfig = {  
        apiKey: "AIzaSyCMOZqSp4yKzdxoyl9P4tYXbonGlAd4PAw",
        authDomain: "gamelatch-7eb0c.firebaseapp.com",
        projectId: "gamelatch-7eb0c",
        storageBucket: "gamelatch-7eb0c.appspot.com",
        messagingSenderId: "1068757573090",
        appId: "1:1068757573090:web:d84bb683c865c7d251adbb",
        measurementId: "G-JK9T2YZ6RC"
    };
    firebase.initializeApp(firebaseConfig);
  }, []);

  const handleSaveScore = () => {
    const db = firebase.firestore();
    db.collection('scores').add({ name: name, score: score });
    setIsPopupOpen(false);
    alert('ระบบได้ทำการบันทึกคะแนนของคุณเรียบร้อยแล้ว');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontFamily: 'Supermarket, sans-serif', // add font family here
      }}
    >
      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              กรุณากรอกอีเมล์ของคุณ
            </h2>
            <input
              type="text"
              placeholder="ชื่อของคุณ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid lightgray',
                width: '100%',
                marginBottom: '1rem',
              }}
            />
            <button
              style={{
                backgroundColor: 'lightblue',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '1.2rem',
                cursor: 'pointer',
                fontFamily: 'Supermarket, sans-serif', // add font family here
              }}
              onClick={handleSaveScore}
            >
              บันทึก
            </button>
          </div>
        </div>
      )}

      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        คะแนนที่ได้ : {score}
      </h2>
      <button
        style={{
          backgroundColor: 'lightblue',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '1.2rem',
          cursor: 'pointer',
          fontFamily: 'Supermarket, sans-serif', // add font family here
        }}
        onClick={() => window.open('https://latchscore.web.app/', '_blank')}
      >
        กลับสู่เมนูหลัก
      </button>
    </div>
  );
}

export default Summary;
