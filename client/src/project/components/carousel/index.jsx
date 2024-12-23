
import React, { useEffect, useState } from "react";
import Swipe from "react-easy-swipe";
import "./index.css";
import { Imgs } from "./styled";

const data = [
    {
        image: "https://virtuemedical.com.sg/storage/2024/01/mother-discussing-pills-treatment-against-kid-dise-2023-11-27-05-18-28-utc-scaled.jpg"
    },
    {
        image: "https://lifelineurgentcare.org/wp-content/uploads/2024/01/elder-adult-using-video-call-talk-doctor-about-treatment-home-senior-man-talking-specialist-about-health-care-remote-teleconference-telehealth-telemedicine.jpg",
    },
    {
        image: "https://cdn.prod.website-files.com/64f0ca8852facca71ff9276f/67046e38edfb2214c4cde5bb_65fb5605ee7a2bafc8be664c_telemedicine.jpeg",
    },
];



export function MyCarousel({
    time,
    width,
    height,
    radius,
    style,
    dots,
    automatic,
    pauseIconColor,
    pauseIconSize,
    slideBackgroundColor,
    slideImageFit,
    thumbnails,
    thumbnailWidth,
    showNavBtn = true,
}) {
    //Initialize States
    const [slide, setSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [change, setChange] = useState(0);

    //Function to change slide
    const addSlide = (n) => {
        if (slide + n >= data.length) setSlide(0);
        else if (slide + n < 0) setSlide(data.length - 1);
        else setSlide(slide + n);
    };

    //Start the automatic change of slide
    useEffect(() => {
        if (automatic) {
            var index = slide;
            const interval = setInterval(
                () => {
                    if (!isPaused) {
                        setSlide(index);
                        index++;
                        if (index >= data.length) index = 0;
                        if (index < 0) index = data.length - 1;
                    }
                },
                time ? time : 2000
            );
            return () => {
                clearInterval(interval);
            };
        }
    }, [isPaused, change]);

    function scrollTo(el) {
        const elLeft = el.offsetLeft + el.offsetWidth;
        const elParentLeft = el.parentNode.offsetLeft + el.parentNode.offsetWidth;

        // check if element not in view
        if (elLeft >= elParentLeft + el.parentNode.scrollLeft) {
            el.parentNode.scroll({ left: elLeft - elParentLeft, behavior: "smooth" });
        } else if (elLeft <= el.parentNode.offsetLeft + el.parentNode.scrollLeft) {
            el.parentNode.scroll({
                left: el.offsetLeft - el.parentNode.offsetLeft,
                behavior: "smooth",
            });
        }
    }

    //Listens to slide state changes
    useEffect(() => {
        var slides = document.getElementsByClassName("carousel-item");
        var dots = document.getElementsByClassName("dot");

        var slideIndex = slide;
        var i;
        for (i = 0; i < data.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        //If thumbnails are enabled
        if (thumbnails) {
            var thumbnailsArray = document.getElementsByClassName("thumbnail");
            for (i = 0; i < thumbnailsArray.length; i++) {
                thumbnailsArray[i].className = thumbnailsArray[i].className.replace(
                    " active-thumbnail",
                    ""
                );
            }
            if (thumbnailsArray[slideIndex] !== undefined)
                thumbnailsArray[slideIndex].className += " active-thumbnail";
            scrollTo(document.getElementById(`thumbnail-${slideIndex}`));
        }

        if (slides[slideIndex] !== undefined)
            slides[slideIndex].style.display = "block";
        if (dots[slideIndex] !== undefined) dots[slideIndex].className += " active";
    }, [slide, isPaused]);

    return (
        <div style={style} className="box">
            <div
                style={{
                    maxWidth: width ? width : "100%",
                    maxHeight: height ? height : "400px",
                }}
            >
                <Swipe
                    onSwipeRight={() => {
                        addSlide(-1);
                        setChange(!change);
                    }}
                    onSwipeLeft={() => {
                        addSlide(1);
                        setChange(!change);
                    }}
                >
                    <div
                        className="carousel-container"
                        style={{
                            maxWidth: width ? width : "600px",
                            height: height ? height : "400px",
                            backgroundColor: slideBackgroundColor
                                ? slideBackgroundColor
                                : "darkgrey",
                            borderRadius: radius,
                        }}
                    >
                        {data.map((item, index) => {
                            return (
                                <div
                                    className="carousel-item fade"
                                    style={{
                                        maxWidth: width ? width : "600px",
                                        maxHeight: height ? height : "400px",
                                    }}
                                   
                                    onMouseUp={(e) => {
                                        automatic && setIsPaused(false);
                                    }}
                                    onMouseLeave={(e) => {
                                        automatic && setIsPaused(false);
                                    }}
                                    onTouchStart={(e) => {
                                        automatic && setIsPaused(true);
                                    }}
                                    onTouchEnd={(e) => {
                                        automatic && setIsPaused(false);
                                    }}
                                    key={index}
                                >
                          
                                    <Imgs
                                        src={item.image}
                                        className="carousel-image"
                                        style={{
                                            borderRadius: radius,
                                            objectFit: slideImageFit ? slideImageFit : "cover",
                                        }}
                                    />
                                    {isPaused && (
                                        <div
                                            className="pause-icon pause"
                                            style={{
                                                color: pauseIconColor ? pauseIconColor : "white",
                                                fontSize: pauseIconSize ? pauseIconSize : "40px",
                                            }}
                                        >
                                            II
                                        </div>
                                    )}
                                   
                                </div>
                            );
                        })}

                        {showNavBtn && (
                            <a
                                className="prev"
                                onClick={(e) => {
                                    addSlide(-1);
                                    setChange(!change);
                                }}
                            >
                                &#10094;
                            </a>
                        )}
                        {showNavBtn && (
                            <a
                                className="next"
                                onClick={(e) => {
                                    addSlide(1);
                                    setChange(!change);
                                }}
                            >
                                &#10095;
                            </a>
                        )}
                        {dots && (
                            <div className="dots">
                                {data.map((item, index) => {
                                    return (
                                        <span
                                            className="dot"
                                            key={index}
                                            onClick={(e) => {
                                                setSlide(index);
                                                setChange(!change);
                                            }}
                                        ></span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </Swipe>
            </div>
            {thumbnails && (
                <div
                    className="thumbnails"
                    id="thumbnail-div"
                    style={{ maxWidth: width , display:"none"}}
                >
                    {data.map((item, index) => {
                        return (
                            <img
                                width={thumbnailWidth ? thumbnailWidth : "100px"}
                                src={item.image}
                                alt={item.caption}
                                className="thumbnail"
                                id={`thumbnail-${index}`}
                                key={index}
                                onClick={(e) => {
                                    setSlide(index);
                                    setChange(!change);
                                }}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
