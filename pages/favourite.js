import React, { useEffect, useState } from "react";
import Head from "next/head";
import Card from "components/Card";

function FavoritePage() {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favoriteMovies = localStorage.favoriteMovies;
      if (favoriteMovies) {
        setStorage(JSON.parse(favoriteMovies));
      }
    }
  }, []);

  return (
    <div className="layout">
      <Head>
        <title>Favourite | Moviepedia</title>
      </Head>
      <div className="container">
        {storage.length === 0 ? (
          <p className="mt-4">
            No Favorite Movie, Please hit like button in the Homepage
          </p>
        ) : (
          <>
            {storage.map((el, i) => (
              <Card
                movie={el}
                key={i}
                storage={storage}
                setStorage={setStorage}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default FavoritePage;
