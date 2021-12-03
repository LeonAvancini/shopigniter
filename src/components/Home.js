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
  const [userUid, setUserUid] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
      }
    });
  }, []);

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

  return (
    <Container>
      <Navbar user={user} />
      <Products userId={userUid} />
    </Container>
  );
};

export default Home;
