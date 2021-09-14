import { useState } from 'react';
import './App.css';
import AddReview from './components/addReview/addReview';
import ShowReviews from './components/showReviews/showReviews';
import io from "socket.io-client";

const socket = io.connect('/');

function App() {
  const [showAddReview, setShowAddReview] = useState(false)
  return (
    <>
      {
        showAddReview ?
          <AddReview showAddReview={setShowAddReview}/>
          :
          <ShowReviews socket={socket} showAddReview={setShowAddReview} />
      }
    </>
  );
}

export default App;
