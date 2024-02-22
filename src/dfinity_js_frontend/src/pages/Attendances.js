import React from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy } from "../utils/auth";
import Wallet from "../components/Wallet";
import AllAttendances from "../components/attendanceManager/AllAttendances";
import Cover from "../components/utils/Cover";
import coverImg from "../assets/img/cover.jpg";
import { Notification } from "../components/utils/Notifications";

const AttendancesPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;

  const principal = window.auth.principalText;

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                principal={principal}
                symbol={"ICP"}
                isAuthenticated={isAuthenticated}
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            <AllAttendances />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default AttendancesPage;
