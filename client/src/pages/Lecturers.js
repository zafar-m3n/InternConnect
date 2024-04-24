import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout";

const Lecturers = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Layout>
      <h1>Lecturers Page</h1>
    </Layout>
  );
};

export default Lecturers;
