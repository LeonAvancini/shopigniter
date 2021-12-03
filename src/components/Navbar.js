import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/cartLogo.png";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth, db } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

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
  align-items: center;
`;
const LinkStyled = styled(Link)`
  font-size: 12px;
  color: #000;
  font-weight: 600;
  margin: auto 10px;
`;
const IconContainer = styled.div`
  position: relative;
  padding: 0px 10px;
`;
const TotalProductsNumber = styled.div`
  position: absolute;
  bottom: 17px;
  border-radius: 10px;
  padding: 1px 2px;
  right: 3px;
  color: #ffffff;
  background-color: red;
`;

const ButtonStyled = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

export const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(`${"Cart" + user.uid}`).onSnapshot((snapshot) => {
          const quantity = snapshot.docs.length;
          setTotalProducts(quantity);
        });
      }
    });
  }, []);

  return (
    <Container>
      <LeftSideContainer>
        <ImageStyled src={logo} alt="logo" />
      </LeftSideContainer>

      {!user ? (
        <RightSideContainer>
          <LinkStyled to="signup"> Registrarse</LinkStyled>
          <LinkStyled to="login"> Loguearse</LinkStyled>
        </RightSideContainer>
      ) : (
        <RightSideContainer>
          <h5>{user}</h5>
          <LinkStyled to="cart">
            <IconContainer>
              <TotalProductsNumber>{totalProducts}</TotalProductsNumber>
              <Icon icon={shoppingCart} size={20} />
            </IconContainer>
          </LinkStyled>
          <ButtonStyled onClick={handleLogout}>Salir</ButtonStyled>
        </RightSideContainer>
      )}
    </Container>
  );
};

export default Navbar;
