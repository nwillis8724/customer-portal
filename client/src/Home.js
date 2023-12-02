import React from "react";

function Home(){
 return (
    <div>
        <div>
            <h1>Welcome to The Raynor Portal</h1>
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