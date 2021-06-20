import React from "react";
import Particles from 'react-particles-js';
import "./home.css";
export default function Home() {
  return (
    <div className="home">
       
        
        <div className="heading-container"> 
            <div className="heading-1"><h1>Convert Your art Into NFT </h1>
            <h2>in real time and Sell  </h2>
            <h3>Make it on Canvas Instead of a paper</h3>

             </div>
             <Particles />
        </div>
        <div className="card-container"> 
        <div className="card">
            <p><h3>Your Own NFT Collectible</h3></p>
            <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 20
	        },
	        "size": {
	            "value": 2
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": false,
	                "mode": "repulse"
	            }
	        }
	    }
	}} />

        </div>
        
        </div>
        
        

      </div>
  );
}
