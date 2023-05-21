import React, { useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function MyCarousel() {
    
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

  return (
    <div className='mt-4'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className="carousel-img d-block w-100" src="../img/repair1.jpg" alt="First" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="carousel-img d-block w-100" src="../img/repair2.jpg" alt="Second"/>
            </Carousel.Item>
            <Carousel.Item>
                <img className="carousel-img d-block w-100" src="../img/repair3.jpg" alt="Third" />
            </Carousel.Item>
        </Carousel>
    </div>
  )
}
