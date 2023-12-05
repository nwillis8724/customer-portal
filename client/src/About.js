import React, { useState } from "react";
import RaynorLogo from './images/raynorlogo.png'


function About(){
    return(
        <div>
            <div>
                <  img className="raynor-logo" src={RaynorLogo} alt="Raynor Logo" />
            </div>
            <div className="about-page">
                <h1 className="about-text">
                    Welcome to the Raynor Portal! If you purchased an install from us you should have an access code to search for your door and find any information regarding you door, or full install.
                </h1>
                <h4>
                    You can contact us at *phone number* or *email*
                </h4>
                <h4>
                    Located at *address*
                </h4>
            </div>
        </div>
    )
}

export default About