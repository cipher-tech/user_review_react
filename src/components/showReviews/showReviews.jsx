import React, { useEffect, useState } from 'react'

const ShowReviews = ({ showAddReview, socket }) => {
    const [reviews, setReviews] = useState([])
    const [avgRating, setAvgRating] = useState(1)
    const [showSpinner, setShowSpinner] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        fetch('https://user-review-server.herokuapp.com/get_reviews', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async (res) => {
                const data = await res.json()
                await setReviews(data)

                const totalRating = data.reduce((counter, value) => {
                    return counter + value.rating
                }, 0)
                const averageRating = totalRating / data.length
                setAvgRating(averageRating.toFixed(1))
                setShowSpinner(false)
            })
            .catch(error => {
                setError('could not get reviews')
            })

        socket.on("New_review", async (data) => {
            await setReviews(data.reviews || [])
        })

    }, [socket])

    const displayStars = (number) => {
        let stars = []
        for (let i = 1; i < 6; i++) {
            if ((i) <= number) {
                stars[i] = <i key={i} className={`fas ${i - Number(number) === 0.5 ? "fa-star-half-alt" : "fa-star"} star_yellow`}></i>
            } else {
                stars[i] = <i key={i} className={`fas ${i - Number(number) === 0.5 ? "fa-star-half-alt star_yellow" : "fa-star star_ash"}`}></i>
            }
        }
        return stars
    }

    return (
        showSpinner ?
            <i className="fas fa-spinner spinner"></i>
            :
            <div className="container">
                <p> {error} </p>
                <h2 className="header">The Minimalist Entrepreneur</h2>
                <div className="rating">
                    <div className="rating-overview">
                        <p id="averageRating" className="rating-overview_rating_number">{avgRating}</p>
                        <p className="rating-overview_rating_star">
                            <span id="avgStarRating">
                                {displayStars(avgRating)}
                            </span>

                        </p>
                    </div>
                    <button onClick={() => showAddReview(true)} className="rating-button">Add review</button>
                </div>

                <div id="allReviews" className="reviews">
                    <h2 className="reviews-header">Reviews</h2>

                    {
                        reviews.map((review, index) => (
                            <div key={review._id} className="review-single">
                                <p className="rating-overview_rating_star">
                                    <span>
                                        {displayStars(Math.floor(review.rating))}
                                    </span>
                                </p>

                                <p className="review-single__info">
                                    <span> {Math.floor(review.rating)}, </span> {review.comment}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
    )
}

export default ShowReviews
