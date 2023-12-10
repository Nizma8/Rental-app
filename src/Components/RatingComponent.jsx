import React, { useState } from 'react'

function RatingComponent({rating,setRating}) {
  return (
    <>
     <div className="star-rating">
     {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button 
            type="button"
            key={index}
            className={index <= rating ? 'text-yellow-600 ' : "text-gray-300 cursor-pointer" }
            
            onClick={()=>{
                const newRating = index ===rating ?index-1:index
                setRating(newRating)
                console.log(rating);
                console.log(index);
            }}
            
           
          >
            <span className="star text-5xl me-3">&#9733;</span>
          </button>
        );
      })}
    </div>
    </>
        )
}

export default RatingComponent