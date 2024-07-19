import React, { useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services";

const HomePage = () => {
  const getUserData = async () => {
    try {
      const response = await API.private.getUserData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
};

export default HomePage;
