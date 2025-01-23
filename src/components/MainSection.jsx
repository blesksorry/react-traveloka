import React from 'react';
import layer1 from './img/layer-1.jpg';
import layer2 from './img/layer-2.png';
import layer3 from './img/layer-3.png';
import './css/MainSection.scss';

const MainSection = () => {
    return (
        <div className="layers">
            <div className="layer__txt">
                <h3 className="layers__text">ПУТЕШЕСТВУЙ С НАМИ </h3>
                <h1 className="layers__title">TRAVELOKA</h1>
            </div>
            <div class="layer layers__one" style={{ backgroundImage: `url(${layer1})` }}></div>
            <div class="layer layers__two" style={{ backgroundImage: `url(${layer2})` }}></div>
            <div class="layer layers__three" style={{ backgroundImage: `url(${layer3})` }}></div>
        </div>
    )
}

export default MainSection;


