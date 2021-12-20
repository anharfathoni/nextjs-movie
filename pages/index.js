import React, { useEffect, useState, useRef, useCallback } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Card from "components/Card";
import { Spin } from "antd";

function HomePage({ movies = [] }) {
  const { t, i18n } = useTranslation();
  const loader = useRef(null);
  const [storage, setStorage] = useState([]);
  const [listMovie, setListMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleObserver = useCallback((entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((s) => s + 1);
    }
  }, []);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  useEffect(() => {
    setLoading(true);
    if (page <= totalPage && page > 1) {
      setTimeout(() => {
        const newData = movies.slice(0, page * 10);
        setListMovie((prev) => [...newData]);
        setLoading(false);
      }, 2000);
    }
  }, [page, totalPage]);

  useEffect(() => {
    setTotalPage(Math.ceil(movies.length / 10));
    const newData = movies.slice((page - 1) * 10, 10);
    setListMovie((prev) => [...prev, ...newData]);
  }, []);

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
        <title>Movies | Moviepedia</title>
      </Head>
      <p className="text-welcome">{t("Welcome to Moviepedia")}</p>
      <div className="container">
        {listMovie.map((el, i) => (
          <Card movie={el} key={i} storage={storage} setStorage={setStorage} />
        ))}
        <div ref={loader}>
          {page < totalPage && <Spin size="large" spinning={loading} />}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://private-2fff44-bncfetest.apiary-mock.com/movies`
  );
  const response = await res.json();

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movies: response.data },
  };
}

export default HomePage;
