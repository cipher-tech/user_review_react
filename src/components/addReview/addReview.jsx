import { useState } from "react"

const AddReview = ({ showAddReview, socket }) => {
    const [rating, setRating] = useState(1.2)
    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const ratingValue = [1, 2, 3, 4, 5]

    const handleSubmit = async (e) => {
        await setError(null)
        await setMessage(null)
        fetch('https://user-review-server.herokuapp.com/add_review', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating, comment })
        })
            .then(async (res) => {
                res.json()
                await setMessage("review submitted")
                await socket.emit("review_added")
                await showAddReview(false)
            })
            .catch(error => {
                setError('could not add review')
            })
    }
    return (
        <div className="container">
            {error ? <p className="error">{error} </p> : null}
            {message ? <p className="success">{message}</p> : null}
            <h2 className="header">What’s your rating?</h2>
            <h4 className="sub-header">Rating 
                <small>(double click to add half star)</small>
            </h4>
            <p className="container-rating_star">
                <span id="star_rating">
                    {
                        ratingValue.map((value) => {
                            return (
                                (value <= Number(rating)) ?
                                    <i key={value}
                                        onDoubleClick={() => setRating(`${value - Number(0.5)}`)}
                                        onClick={() => setRating(value)}
                                        className={`fas ${value - Number(rating) === 0.5 ? "fa-star-half-alt" : "fa-star"} star_yellow`}>
                                    </i>
                                    :
                                    <i key={value}
                                        onDoubleClick={() => (
                                            setRating(`${value - Number(0.5)}`)
                                        )} onClick={() => setRating(value)}
                                        className={`fas ${value - Number(rating) === 0.5 ? "fa-star-half-alt star_yellow" : "fa-star star_ash"}`}>

                                    </i>
                            )
                        })
                    }
                </span>
            </p>
            <h4 className="sub-header">Review</h4>

            <input onChange={(e) => setComment(e.target.value)} value={comment} className="container-input" type="text" placeholder="Start typing...." />

            <button id="submit" onClick={handleSubmit} className="rating-button container-button">Submit review</button>
        </div>
    )
}

export default AddReview
