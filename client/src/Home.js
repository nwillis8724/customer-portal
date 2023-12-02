import React from "react";
import RaynorLogo from './images/raynorlogo.png'


function Home(){
 return (
    <div>
        <div>
            <  img className="raynor-logo" src={RaynorLogo} alt="Raynor Logo" />
        </div>

        <div class="door-finder">
            <form>
                <h2>Find Your Door</h2>
                <input type="text" placeholder="Enter access code" />
                <button type="submit">Search</button>
            </form>
        </div>
    </div>
 )
}

export default Home