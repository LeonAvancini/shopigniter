import Navbar from "./Navbar";
import Products from "./Products";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { auth, db } from "../config/Config";

const Container = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Home = () => {
  const GetCurrentUser = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };

  const user = GetCurrentUser();

  console.log("USER", user);

  return (
    <Container>
      <Navbar user={user} />
      <Products />
    </Container>
  );
};

export default Home;
