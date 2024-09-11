import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AddEditHackathonForm from './components/AddEditHackathonForm';
import ChallengeList from './components/ChallengeList';
import InfoSection from './components/InfoSection';
import Stats from './components/HeaderStats';
import CreateChallenge from './components/CreateChallenge';
import ChallengePage from './components/ChallengePage'; 
import EditChallenge from './components/EditChallenge';
import dataScienceImage from './Assets/DataScience.png';
import Butterfly from './Assets/Butterfly.png';
import Snow from './Assets/Snow.png';
import Airplane from './Assets/Airplane.png';
import Graduates from './Assets/Graduates.png';
import Bridge from './Assets/Bridge.png';
import './App.css';

function App() {

  const [hackathons, setHackathons] = useState([
    {
      id: 1,
      name: 'Data Science Bootcamp - Graded Datathon',
      level: 'medium',
      status: 'upcoming',
      startDate: '2024-09-20',
      endDate: '2024-09-25',
      image: dataScienceImage,
    },
    {
      id: 2,
      name: 'Data Sprint 72 - Butterfly Identification',
      level: 'easy',
      status: 'upcoming',
      startDate: '2024-09-15',
      endDate: '2024-09-27',
      image: Butterfly,
    },
    {
      id: 3,
      name: 'Data Sprint 71 - Weather Recognition',
      level: 'medium',
      status: 'active',
      startDate: '2024-09-08',
      endDate: '2024-09-18',
      image: Snow,
    },
    {
      id: 4,
      name: 'Data Sprint 70 - Airline Passenger Satisfaction',
      level: 'easy',
      status: 'active',
      startDate: '2024-09-10',
      endDate: '2024-09-15',
      image: Airplane,
    },
    {
      id: 5,
      name: 'Engineering Graduates Employment Outcomes',
      level: 'hard',
      status: 'past',
      startDate: '2024-05-12',
      endDate: '2024-05-16',
      image: Graduates,
    },
    {
      id: 6,
      name: 'Travel Insurance Claim\nPrediction',
      level: 'medium',
      status: 'past',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      image: Bridge,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentHackathon, setCurrentHackathon] = useState(null);

  const addHackathon = (hackathon) => {
    setHackathons([...hackathons, hackathon]);
    setIsDialogOpen(false);
  };

  const editHackathon = (updatedChallenge) => {
    setHackathons(hackathons.map(challenge => 
      challenge.id === updatedChallenge.id ? updatedChallenge : challenge
    ));
  };

  const deleteHackathon = (id) => {
    setHackathons(hackathons.filter((hackathon) => hackathon.id !== id));
  };
  
  const openEditForm = (hackathon) => {
    setCurrentHackathon(hackathon);
    setIsDialogOpen(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Stats />
              <InfoSection />
              <ChallengeList
                challenges={hackathons}
                deleteHackathon={deleteHackathon}
                editHackathon={openEditForm}
              />
            </>
          } />
          <Route path="/create-challenge" element={
            <CreateChallenge addHackathon={addHackathon} />
          } />
          <Route path="/challenge/:id" element={
            <ChallengePage challenges={hackathons}
            editHackathon={editHackathon}
            deleteHackathon={deleteHackathon} />
          } />
          <Route path="/edit-challenge/:id" element={
          <EditChallenge
          challenges={hackathons}
         editHackathon={editHackathon}
         deleteHackathon={deleteHackathon} 
           />
        } />
        </Routes>
        <AddEditHackathonForm
          addHackathon={addHackathon}
          editHackathon={editHackathon}
          onClose={() => setIsDialogOpen(false)}
          open={isDialogOpen}
          currentHackathon={currentHackathon}
        />
      </div>
    </Router>
  );
}

export default App;