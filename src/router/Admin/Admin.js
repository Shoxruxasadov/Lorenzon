import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [darkmode, setDarkmode] = useState(
    localStorage.getItem("theme") == "light" ? true : false
  );

  useEffect(() => {
    if (window.location.pathname === "/admin") navigate("/admin/dashboard");
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        delete list[0].timeStamp;
        dispatch({ type: "GET_USERS", payload: list });
      } catch (err) {
        console.log("ERROR FETCH DATA IN FIRESTORE");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // setDarkmode(!darkmode)
    localStorage.setItem("theme", darkmode ? "light" : "dark");
    document
      .querySelector("body")
      .setAttribute("class", localStorage.getItem("theme"));
  }, [darkmode]);

  return (
    <div id="admin">
      <Sidebar darkmode={darkmode} setDarkmode={setDarkmode} />
      <Outlet />
    </div>
  );
}
