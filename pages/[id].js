import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { StarTwoTone } from "@ant-design/icons";
import Breadcrumb from "components/Breadcrumb";
import Modal from "components/Modal";

function DetailPage({ movie }) {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div className="layout">
      <Head>
        <title>{movie.title} | Moviepedia</title>
      </Head>
      <p className="text-welcome">{t("Welcome to Moviepedia")}</p>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img
          src={movie.imageLargeUrl}
          alt={movie.title}
          style={{ maxHeight: "90vh", maxWidth: "90vw" }}
        />
      </Modal>
      <div className="container-detail">
        <Breadcrumb
          items={[{ title: "Movies", url: "/" }, { title: movie.title }]}
        />
        <div className="flex mt-4">
          <div
            className="container-img-detail cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={movie.imageUrl}
              alt={movie.title}
              layout="fill"
              className="img"
            />
          </div>
          <div className="p-3 ml-4">
            <h1 className="profile">{movie.title}</h1>
            <p className="title">Year: {movie.year}</p>
            <p className="title">Release Date: {movie.releaseDate}</p>
            <p className="title">Duration: {movie.duration}</p>
            <p className="title">Genre: {movie.genre}</p>
            <div className="flex items-center">
              <p className="title m-0">Rating: </p>
              <StarTwoTone twoToneColor="#f3ea6d" className="ml-2" />
              <p className="rating m-0 ml-2">{movie.rating}</p>
            </div>
          </div>
        </div>
        <h1 className="profile mt-4">Synopsis</h1>
        <p className="title">{movie.desc}</p>
        <h1 className="profile mt-4">Cast</h1>
        <ol>
          {movie.starring.map((el, i) => (
            <li key={i} className="title">
              {el}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, ...context }) {
  const res = await fetch(
    `https://private-2fff44-bncfetest.apiary-mock.com/movies/${params.id}`
  );
  const response = await res.json();

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movie: response.data },
  };
}

export default DetailPage;
