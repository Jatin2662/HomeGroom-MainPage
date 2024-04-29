import './FirstSection.css'
import {images} from './Data.js'
import {featureImages} from './Data.js'
import { chooseUs } from './Data.js';


function FirstSection(){

    return(
        <>
        <section className="first">
            <div className="intro">
                <h1>Customer's Choice HomeGroom</h1>
                <p>Hire your personal helper and get your work done within hours. Experienced workers are available here. Highly skilled</p>
                <button className="btn">Book Now</button>
            </div>

            <div className="images">
                {images.map((img)=>{

                    const {id, image} = img;
                    return(
                        <div key={id}>
                            <img src={image}></img>
                        </div>
                    );
                })}
            </div>
        </section>

        <section className="second">
        <h1>Featured Sevices Offered</h1>
        <p>We offer best services by providing professional workers</p>
        <div className="serviceImages">
            {featureImages.map((img)=>{
                const {id, image, title} = img;

                return(
                    <div className="card" key={id}>
                        <img src={image}></img>
                        <h2>{title}</h2>
                    </div>
                );
            })}
        </div>
    </section>

    <section className="third">
            <h1>Why to choose us</h1>
            <div className="blue-images">
                {chooseUs.map((img)=>{
                    const {id, image, title, description} = img;

                    return(
                        <div className="blue-card" key={id}>
                            <img src={image}></img>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    );
                })}
            </div>
    </section>
        </>
    );
}

export default FirstSection;