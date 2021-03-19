import Driver from "./Driver";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";
import loading from "../assets/loading.gif";

const Standings = () => {
  const [title, setTitle] = useState("Title");
  const [drivers, setDrivers] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(
        "http://ergast.com/api/f1/2019/last/driverStandings.json"
      );
      const data = response.data.MRData.StandingsTable.StandingsLists[0];
      setDrivers(data.DriverStandings);
      setTitle(data.season);
    } catch (error) {
      console.error(error);
    }
  }

  function openModal(driverId) {
    const driverStandings = drivers;

    setCurrentDriver(driverStandings[driverId]);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="container">
      {drivers ? (
        <div className="standings">
          <StyledHeading>Standings ({title})</StyledHeading>
          <StyledDriverContainer>
            <Driver heading />
            {drivers.map((driver, index) => (
              <Driver
                key={index}
                id={index}
                position={driver.position}
                points={driver.points}
                name={`${driver.Driver.givenName} ${driver.Driver.familyName}`}
                manufacturer={driver.Constructors[0].name}
                openModal={openModal}
              />
            ))}
          </StyledDriverContainer>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            ariaHideApp={false}
          >
            {currentDriver ? (
              <div>
                <StyledHeading>
                  {currentDriver.Driver.givenName}{" "}
                  {currentDriver.Driver.familyName}
                </StyledHeading>
                <StyledSubheading>
                  Nationality: {currentDriver.Driver.nationality}
                </StyledSubheading>
                <StyledSubheading>
                  Date-of-birth: {currentDriver.Driver.dateOfBirth}
                </StyledSubheading>
                <StyledSubheading>
                  Permament Number: #{currentDriver.Driver.permanentNumber}
                </StyledSubheading>
                <StyledLink
                  href={currentDriver.Driver.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more on wikipedia
                </StyledLink>
              </div>
            ) : null}
          </Modal>
        </div>
      ) : (
        <img src={loading} alt="loading..." />
      )}
    </div>
  );
};

const StyledDriverContainer = styled.div`
  width: 50vw;
`;

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "30px",
    fontFamily: "'Open Sans', sans-serif",
  },
};

const StyledHeading = styled.h1`
  margin-bottom: 10px;
  margin-top: 0;
  font-size: 40px;
`;

const StyledSubheading = styled.h2`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 20px;
`;

const StyledLink = styled.a`
  margin-top: 0;
  font-size: 20px;
  font-weight: bold;
`;

export default Standings;
