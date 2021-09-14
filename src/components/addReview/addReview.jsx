import { useState } from "react"

const AddReview = ({showAddReview}) => {
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const ratingValue = [1, 2, 3, 4, 5]

    const handleSubmit = async (e) => {
        await setError(null)
        await setMessage(null)
        fetch('http://localhost:3000/add_review', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ rating, comment })
        })
            .then( async (res) => {
                res.json()
                await setMessage("review submitted")
                await showAddReview(false)
            })
            .catch(error => {
                setError('could not add review')
            })
    }
    return (
        <div class="container">
           {error ? <p className="error">{error} </p> : null } 
            {message ? <p className="success">{message}</p> : null }
            <h2 class="header">What’s your rating?</h2>
            <h4 class="sub-header">Rating</h4>
            <p class="container-rating_star">
                <span id="star_rating">
                    {
                        ratingValue.map((value) => {
                            return (
                                (value <= rating) ?
                                    <i key={value} onClick={() => setRating(value)} class="fas fa-star star_yellow"></i>
                                    :
                                    <i key={value} onClick={() => setRating(value)} class="fas fa-star star_ash"></i>
                            )
                        })
                    }
                </span>
            </p>
            <h4 class="sub-header">Review</h4>

            <input onChange={(e) => setComment(e.target.value)} value={comment} class="container-input" type="text" placeholder="Start typing...." />

            <button id="submit" onClick={handleSubmit} class="rating-button container-button">Submit review</button>
        </div>
    )
}

export default AddReview
