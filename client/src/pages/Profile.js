import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <h1>Profile Page</h1>
    </Layout>
  );
};

export default Profile;
