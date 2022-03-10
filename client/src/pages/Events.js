import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container events-container">
        <div>
          <h2 className="workshop-title">Workshop</h2>
          <div className="card workshop-firstCard">
            <img
              src="/images/worshop2.jpg"
              className="card-img-top workshop-img"
              alt="workshop img"
            />
            <div className="card-body">
              <p className="card-text">
                Join to this workshop about how to cut your plants correctly!
              </p>
            </div>
          </div>
        </div>
        <div>
            <h2>Videos with DIY</h2>
            <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/y3e6Ijvs7v0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
        <div>
            <h2>Useful Tips</h2>
        </div>
      </div>
    </>
  );
}
