import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarTwoTone, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

function Card({ movie, storage, setStorage }) {
  const onClickLike = (data) => {
    if (storage.length === 0) {
      const newData = [data];
      setStorage(newData);
      localStorage.setItem("favoriteMovies", JSON.stringify(newData));
    } else {
      const newData = [...storage, data];
      setStorage(newData);
      localStorage.setItem("favoriteMovies", JSON.stringify(newData));
    }
  };

  const onClickUnlike = (data) => {
    if (storage.length > 0) {
      const filtered = storage.filter((el) => el.id !== data.id);
      setStorage(filtered);
      localStorage.setItem("favoriteMovies", JSON.stringify(filtered));
    }
  };

  const getHeart = (data) => {
    let isLiked = false;
    storage.forEach((el) => {
      if (el.id === data.id) {
        isLiked = true;
      }
    });
    if (isLiked) {
      return (
        <Tooltip title="Unlike" placement="bottom">
          <HeartFilled
            style={{ color: "#eb2f96" }}
            className="cursor-pointer"
            onClick={() => onClickUnlike(data)}
          />
        </Tooltip>
      );
    }
    return (
      <Tooltip title="Like" placement="bottom">
        <HeartOutlined
          className="cursor-pointer"
          onClick={() => onClickLike(data)}
        />
      </Tooltip>
    );
  };

  return (
    <div className="card">
      <div className="container-img">
        <Image
          src={movie.imageUrl}
          alt={movie.title}
          layout="fill"
          className="img"
        />
        <Link href={`/${movie.id}`}>
          <p className="see-detail">See Detail</p>
        </Link>
      </div>
      <div className="p-3">
        <p className="title">{movie.title}</p>
        <p className="year">{movie.year}</p>
        <div className="flex justify-between items-center">
          <div className="w-fit flex items-center">
            <StarTwoTone twoToneColor="#f3ea6d" />
            <p className="rating m-0 ml-2">{movie.rating}</p>
          </div>
          {getHeart(movie)}
        </div>
      </div>
    </div>
  );
}

export default Card;
