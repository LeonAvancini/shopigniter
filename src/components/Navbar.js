import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/cartLogo.png";

const Container = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 25px;
`;
const LeftSideContainer = styled.div`
  width: 80px;
  heigth: 80px;
`;
const ImageStyled = styled.img`
  width: 100%;
  heigth: 100%;
`;

const RightSideContainer = styled.div`
  display: flex;
`;
const LinkStyled = styled(Link)`
  font-size: 12px;
  color: #000;
  font-weight: 600;
  margin: auto 10px;
`;

export const Navbar = () => {
  return (
    <Container>
      <LeftSideContainer>
        <ImageStyled src={logo} alt="logo" />
      </LeftSideContainer>
      <RightSideContainer>
        <LinkStyled to="/signup"> Registrarse</LinkStyled>
        <LinkStyled to="/login"> Loguearse</LinkStyled>
      </RightSideContainer>
    </Container>
  );
};

export default Navbar;
