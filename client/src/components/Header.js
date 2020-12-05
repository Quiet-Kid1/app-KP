import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../images/LOGO-KOTA-MANADO.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);

  // 3 value ini dari login reducer
  const { loading, error, userInfo } = userLogin;

  console.log(userInfo);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const styleLogo = {
    float: 'left',
    marginRight: '10px',
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="Logo Kota Manado"
                src={Logo}
                width="60"
                height="60"
                style={styleLogo}
              />
              Kelurahan Malalayang I <br />
              Kota Manado
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown title="Profil" id="basic-nav-dropdown">
                <LinkContainer to="/profil/data/1">
                  <NavDropdown.Item>Sejarah Kelurahan</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profil/data/2">
                  <NavDropdown.Item>Profil Wilayah Kelurahan</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profil/data/3">
                  <NavDropdown.Item>Arti Lambang Kelurahan</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title="Pemerintahan" id="basic-nav-dropdown">
                <LinkContainer to="/profil/pemerintahan/1">
                  <NavDropdown.Item>Visi Misi Kelurahan</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profil/pemerintahan/2">
                  <NavDropdown.Item>Pemerintah Kelurahan</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title="Data Masyarakat" id="basic-nav-dropdown">
                <LinkContainer to="/data/datapendidikan">
                  <NavDropdown.Item>Data Pendidikan dalam KK</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/data/datapekerjaan">
                  <NavDropdown.Item>Data Pekerjaan</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/data/datajenisk">
                  <NavDropdown.Item>Data Jenis Kelamin</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/data/datakelompokumur">
                  <NavDropdown.Item>Data Kelompok Umur</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/data/dataperkawinan">
                  <NavDropdown.Item>Data Perkawinan</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {userInfo ? (
                <>
                  <NavDropdown title="Fungsi Admin" id="basic-nav-dropdown">
                    {userInfo.role === 'Lurah' ? (
                      <>
                        <LinkContainer to="/admin/listwarga">
                          <NavDropdown.Item>Lihat data warga</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/listkeluarga">
                          <NavDropdown.Item>
                            Lihat data keluarga
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/listposts">
                          <NavDropdown.Item>Lihat List Post</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/listpengguna">
                          <NavDropdown.Item>
                            Lihat Data Pengguna
                          </NavDropdown.Item>
                        </LinkContainer>
                      </>
                    ) : userInfo.role === 'Lingkungan' ? (
                      <>
                        <LinkContainer to="/admin/listwarga">
                          <NavDropdown.Item>Lihat data warga</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/listkeluarga">
                          <NavDropdown.Item>
                            Lihat data keluarga
                          </NavDropdown.Item>
                        </LinkContainer>
                      </>
                    ) : userInfo.role === 'Sekertaris' ? (
                      <>
                        <LinkContainer to="/admin/listwarga">
                          <NavDropdown.Item>Lihat data warga</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/listkeluarga">
                          <NavDropdown.Item>
                            Lihat data keluarga
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/listposts">
                          <NavDropdown.Item>Lihat List Post</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    ) : null}
                  </NavDropdown>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/admin/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/login">
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
