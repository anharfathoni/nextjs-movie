import React from "react";
import Image from "next/image";

function Home() {
  return (
    <div className="container">
      <div className="card">
        <div
          style={{
            width: "200px",
            height: "300px",
            position: "relative",
          }}
        >
          <Image
            src="https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
            alt="naruto"
            layout="fill"
            className="img"
          />
        </div>
        <p className="title">
          Guilty Crown: Lost Christmas – An Episode of Port Town
        </p>
        <p className="year">year</p>
        <div className="flex justify-between items-center">
          <p className="rating m0">rating</p>
          <button className="btn-like">like</button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Home;
