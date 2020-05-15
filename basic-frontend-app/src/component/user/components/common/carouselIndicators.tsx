import * as React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class CarouselIndicators extends React.Component{
    render() {
        return(
            <div className="my-4">
                <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
                    <div>
                        <img src="https://iczc.cz/54h2cecntugj084jm2pslebvi1-1_7/obrazek"  height="360px" alt="" />
                    </div>
                    <div>
                        <img src="https://iczc.cz/8v3gbv6jkago189aj4n7g9qc33-1_7/obrazek"  height="360px" alt="" />
                    </div>
                    <div>
                        <img src="https://iczc.cz/9l7ck2hs7qgmjbebsmg9r7nnj9-1_7/obrazek"  height="360px" alt="" />
                    </div>
                    <div>
                        <img src="https://iczc.cz/5gjp3gsr2ai5fam6ms1a8175kd-1_7/obrazek"  height="360px" alt="" />
                    </div>
                    <div>
                        <img src="https://iczc.cz/n6ju11gtf6u41nr6gpm8f3bc2i-1_m/obrazek"  height="360px" alt="" />
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default CarouselIndicators;
