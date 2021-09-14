import { useState } from 'react';
import './App.css';
import AddReview from './components/addReview/addReview';
import ShowReviews from './components/showReviews/showReviews';

function App() {
  const [showAddReview, setShowAddReview] = useState(false)
  return (
    <>
      {
        showAddReview ?
          <AddReview showAddReview={setShowAddReview}/>
          :
          <ShowReviews showAddReview={setShowAddReview} />
      }
    </>
  );
}

export default App;
