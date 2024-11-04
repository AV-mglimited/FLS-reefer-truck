import React, {useState, useEffect, useRef} from 'react';
import originalTruck from '../../images/original-truck.png';
import originalTruckTranslated from '../../images/original-truck-translated.png';
import slicedTruck from '../../images/sliced-truck.png';
import slicedTruckTranslated from '../../images/sliced-truck-translated.png';
import './Banner.scss';
import Sidebar from "./components/Sidebar";
import {useI18next} from "gatsby-plugin-react-i18next";
import useMatchMedia from "../../utils/hooks/useMatchMedia";
import Modal from "./components/Modal";
import {BANNER_IMGS} from "../../utils/data";

const Banner = () => {
    const [showSlicedTruck, setShowSlicedTruck] = useState(false);
    const [truckMoved, setTruckMoved] = useState(false);
    const [activeImages, setActiveImages] = useState(BANNER_IMGS.area1);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [originalTruckSrc, setOriginalTruckSrc] = useState(originalTruck);
    const [slicedTruckSrc, setSlicedTruckSrc] = useState(originalTruck);
    const { language} = useI18next();

    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseEnterTruck = (e) => {
        setOpacity(0)
    }

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1)
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const isMobileResolution = useMatchMedia('(max-width: 768px)', true)

    useEffect(() => {
        setOriginalTruckSrc(language === "eng" ? originalTruck : originalTruckTranslated)
        setSlicedTruckSrc(language === "eng" ? slicedTruck : slicedTruckTranslated)
    }, [language])

    const handleAreaClick = (e) => {
        e.preventDefault();
        const areaId = e.currentTarget.id;
        setTruckMoved(true);
        setActiveImages(BANNER_IMGS[areaId]);
        setTimeout(() => {
            setOpacity(1);
            setShowSlicedTruck(true);
            setSidebarVisible(true);
            handleMouseMove(e)
        }, 100);
    };

    const handleMouseLeave = (e) => {
        e.preventDefault();
        setOpacity(0);
        setShowSlicedTruck(false);
        setSidebarVisible(false);
        setTimeout(() => {
            setTruckMoved(false);
        }, 100);

        console.log('mouse leave')
    };

    const handleHoverArea = (areaId) => {
        setActiveImages(BANNER_IMGS[areaId]);
    };

    return (
        <div className="main-banner flex justify-center items-center relative" id="top-banner">
            {
                isMobileResolution ? (
                    <>
                        <Modal/>
                    </>
                ) : (
                    <>
                        <div className="main-banner-ground absolute"></div>
                        <div className={`main-banner-overlay h-full w-full absolute ${showSlicedTruck ? 'visible' : 'invisible'}`}></div>
                        <div className={`truck-container relative ${truckMoved ? 'move-left' : 'move-right'}`}>
                            <div className={!showSlicedTruck ? "opacity-100 w-100" : "opacity-0 w-0"}>
                                <img
                                    className="z-10 object-contain"
                                    src={originalTruckSrc}
                                    alt="original-truck"
                                    id="originalTruck"
                                />
                                <div className="truck-overlay">
                                    <div className="truck-area area-1">
                                        <div id="area1" className="truck-click-area" onMouseEnter={handleAreaClick}></div>
                                    </div>
                                    <div className="truck-area area-2">
                                        <div id="area2" className="truck-click-area" onMouseEnter={handleAreaClick}></div>
                                    </div>
                                    <div className="truck-area area-3">
                                        <div id="area3" className="truck-click-area" onMouseEnter={handleAreaClick}></div>
                                    </div>
                                    <div className="truck-area area-4">
                                        <div id="area4" className="truck-click-area" onMouseEnter={handleAreaClick}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={showSlicedTruck ? "opacity-100 w-100" : "opacity-0 w-0"}>
                                <img
                                    className="z-10 object-contain slicedTruck"
                                    src={slicedTruckSrc}
                                    alt="sliced-truck"
                                    id="slicedTruck"
                                />
                                <div className="truck-overlay"
                                     ref={divRef}
                                     onMouseMove={handleMouseMove}
                                     onFocus={handleFocus}
                                     onBlur={handleBlur}
                                     onMouseEnter={handleMouseEnterTruck}
                                     onMouseLeave={handleMouseLeave}>
                                    <div className="truck-area hover-area area-1"
                                         onMouseEnter={() => handleHoverArea('area1')}></div>
                                    <div className="truck-area hover-area area-2"
                                         onMouseEnter={() => handleHoverArea('area2')}></div>
                                    <div className="truck-area hover-area area-3"
                                         onMouseEnter={() => handleHoverArea('area3')}></div>
                                    <div className="truck-area hover-area area-4"
                                         onMouseEnter={() => handleHoverArea('area4')}></div>
                                    <div
                                        className="mouse-over pointer-events-none absolute opacity-0"
                                        style={{
                                            opacity,
                                            left: `${position.x}px`,
                                            top: `${position.y}px`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Sidebar images={activeImages} isVisible={sidebarVisible}/>
                    </>
                )
            }

        </div>

    );
};

export default Banner;
