import React from "react"
import Swiper from "../../Images/Swiper.png"


export default function Loading() {
    return (
        <div className="main">
            <img src={Swiper} alt="swiper the fox" />
            <h2>Please wait while this page loads.</h2>
        </div>
    )
}