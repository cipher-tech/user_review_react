import { useState } from 'react';
import './App.css';
import AddReview from './components/addReview/addReview';
import ShowReviews from './components/showReviews/showReviews';
import io from "socket.io-client";
 
const socket = io('https://user-review-server.herokuapp.com');

function App() {

  const [showAddReview, setShowAddReview] = useState(false)
  return (
    <> 
      {
        showAddReview ?
          <AddReview socket={socket} showAddReview={setShowAddReview}/>
          :
          <ShowReviews socket={socket} showAddReview={setShowAddReview} />
      }
    </>
  );
}

export default App;
