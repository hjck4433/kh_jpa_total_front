import { Outlet } from "react-router-dom";
import {
  Container,
  StyledSideMenu,
  UserContainer,
  UserImage,
  UserIdAndName,
  StyledMenuList,
  StyledMenuItem,
  MenuIcon,
  StyledLink,
  Dummy,
} from "../component/layout/LayoutStyles";
import { UserContext } from "../context/UserStore";
import { useContext, useState, useEffect } from "react";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { FaHome, FaClipboardList, FaRegNewspaper } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import Common from "../utils/Common";

// 사이드바 메뉴를 구성 합니다.

const Layout = () => {
  const context = useContext(UserContext);
  const { color, name, setName } = context;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [member, setMember] = useState({});

  const onClickLeft = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const onClickRight = () => {
    navigate("/setting");
  };

  useEffect(() => {
    const accessToken = Common.getAccessToken();
    const getMember = async () => {
      try {
        const rsp = await AxiosApi.memberGetOne(accessToken);
        console.log("getMemberRsp : " + rsp.data.name);
        console.log("이름! " + name);
        setMember(rsp.data);
        setName(rsp.data.name);
      } catch (e) {
        if (e.response.status === 401) {
          await Common.handleUnathorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const rsp = await AxiosApi.memberGetOne(newToken);
            if (rsp.status === 200) {
              setMember(rsp.data);
              setName(rsp.data.name);
            }
          }
        }
      }
    };
    getMember();
  }, [name]);

  return (
    <Container color={color}>
      <header className="mainhead">
        <div className="hambeger">
          {isMenuOpen ? (
            <GiCancel size={32} color="white" onClick={onClickLeft} />
          ) : (
            <GiHamburgerMenu size={32} color="white" onClick={onClickLeft} />
          )}
        </div>
        <div className="setting">
          <FiSettings size={32} color="white" onClick={onClickRight} />
        </div>
        <StyledSideMenu
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(false)}
        >
          <StyledMenuList>
            <UserContainer>
              <UserImage
                src={member.image || "http://via.placeholder.com/160"}
                alt="User"
              />
              <UserIdAndName>
                <sapn>{member.name}</sapn>
                <span>{member.email}</span>
              </UserIdAndName>
            </UserContainer>
            <StyledMenuItem>
              <MenuIcon>
                <FaHome />
              </MenuIcon>
              <StyledLink to="/home">Home</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <FaClipboardList />
              </MenuIcon>
              <StyledLink to="/Boards">Boards</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <FaRegNewspaper />
              </MenuIcon>
              <StyledLink to="/News">News</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <CgProfile />
              </MenuIcon>
              <StyledLink to="/Members">Members</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <BiCameraMovie />
              </MenuIcon>
              <StyledLink to="/Movies">Movies</StyledLink>
            </StyledMenuItem>
          </StyledMenuList>
        </StyledSideMenu>
      </header>
      <main onClick={() => setIsMenuOpen(false)}>
        <Dummy />
        <Outlet />
      </main>
      <footer>
        <div className="footer">
          <p>
            저작권 ©<span style={{ fontWeight: "bold" }}>KyungSoo. Jeong</span>{" "}
            에게 모든 권한이 있습니다.
          </p>
        </div>
      </footer>
    </Container>
  );
};

export default Layout;
