import Standings from "./components/Standings";
import styled from "styled-components";

function App() {
  return (
    <StyledApp>
      <Standings />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  font-family: "Open Sans", sans-serif;

  display: flex;
  justify-content: center;
`;

export default App;
