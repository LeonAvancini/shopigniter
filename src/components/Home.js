import Navbar from "./Navbar";
import Products from "./Products";
import styled from "styled-components";

const Container = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Home = () => {
  return (
    <Container>
      <Navbar />
      <Products />
    </Container>
  );
};

export default Home;
