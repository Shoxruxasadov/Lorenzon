import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Admin() {
  const sort = useSelector((state) => state.userReducer.sort);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/admin" ||
      window.location.pathname === "/admin/"
    ) {
      navigate("/admin/dashboard");
    }

    dispatch({ type: "GET_ARTISTS" });
    dispatch({ type: "GET_PLAYLISTS" });
    dispatch({ type: "GET_ALBUMS" });
    dispatch({ type: "GET_MUSICS" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        onSnapshot(
          query(collection(db, "users"), orderBy("timeStamp", sort)),
          (snapshot) => {
            let list = [];
            snapshot.docs.map(
              (doc) =>
                doc.data().email != "admin@dev.uz" &&
                list.push({ ...doc.data() })
            );
            dispatch({ type: "GET_USERS", payload: list });
          }
        );
      } catch (err) {
        console.log("ERROR FETCH DATA IN FIRESTORE");
      }
    };
    fetchData();
  }, [sort]);

  return (
    <div id="admin">
      <Sidebar />
      <Outlet />
    </div>
  );
}
