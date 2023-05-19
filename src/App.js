import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './Start';
import Checkpoint from './Checkpoint1';
import Summary from './Summary';
import Q1 from './Q1';
import S1 from './S1';
import Q2 from './Q2';
import S2 from './S2';
import Q3 from './Q3';
import S3 from './S3';
import Q4 from './Q4';
import S4 from './S4';
import Q5 from './Q5';
import S5 from './S5';
import T1 from './T1';
import T2 from './T2';
import T3 from './T3';
import T4 from './T4';
import T5 from './T5';
import T6 from './T6';
import T7 from './T7';
import T8 from './T8';
import T9 from './T9';
import T10 from './T10';
import T11 from './T11';
import T12 from './T12';
import T13 from './T13';
import T14 from './T14';
import T15 from './T15';
import T16 from './T16';
import T17 from './T17';
import T18 from './T18';
import T19 from './T19';
import T20 from './T20';

function App() {
  return (
    <div className="App">
    <div className='header'>
    <h1 className='header'>LATCH SCORE</h1>
    </div>
    <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/Q1" element={<Q1 />} />
          <Route path="/Checkpoint" element={<Checkpoint />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/S1" element={<S1 />} />
          <Route path="/Q2" element={<Q2 />} />
          <Route path="/S2" element={<S2 />} />
          <Route path="/Q3" element={<Q3 />} />
          <Route path="/S3" element={<S3 />} />
          <Route path="/Q4" element={<Q4 />} />
          <Route path="/S4" element={<S4 />} />
          <Route path="/Q5" element={<Q5 />} />
          <Route path="/S5" element={<S5 />} />
          <Route path="/T1" element={<T1 />} />
          <Route path="/T2" element={<T2 />} />
          <Route path="/T3" element={<T3 />} />
          <Route path="/T4" element={<T4 />} />
          <Route path="/T5" element={<T5 />} />
          <Route path="/T6" element={<T6 />} />
          <Route path="/T7" element={<T7 />} />
          <Route path="/T8" element={<T8 />} />
          <Route path="/T9" element={<T9 />} />
          <Route path="/T10" element={<T10 />} />
          <Route path="/T11" element={<T11 />} />
          <Route path="/T12" element={<T12 />} />
          <Route path="/T13" element={<T13 />} />
          <Route path="/T14" element={<T14 />} />
          <Route path="/T15" element={<T15 />} />
          <Route path="/T16" element={<T16 />} />
          <Route path="/T17" element={<T17 />} />
          <Route path="/T18" element={<T18 />} />
          <Route path="/T19" element={<T19 />} />
          <Route path="/T20" element={<T20 />} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
