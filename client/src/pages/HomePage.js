import React, { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
 const getUserdata = async () => {
   try {
     const res = await axios.get(
       "http://localhost:8080/api/v1/user/getUserData",
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       }
     );
     console.log(res.data);
   } catch (error) {
     console.log("Error in HomePage: ", error);
   }
 };


  useEffect(() => {
    getUserdata();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
};

export default HomePage;
