import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout";

const Chats = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Layout>
      <h1>Chats Page</h1>
    </Layout>
  );
};

export default Chats;
