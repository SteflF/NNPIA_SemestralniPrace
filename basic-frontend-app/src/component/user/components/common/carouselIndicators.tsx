import * as React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class CarouselIndicators extends React.Component{
    render() {
        return(
            <div className="my-4">
                <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
                    <div>
                        <img src="https://picsum.photos/900/350" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/900/350" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/900/350" />
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default CarouselIndicators;
