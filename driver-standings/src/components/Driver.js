import styled from "styled-components";

const Driver = ({
  id = 0,
  position = "#",
  points = "Pts.",
  name = "DRIVER",
  manufacturer = "CONSTRUCTOR",
  heading = false,
  openModal,
}) => {
  return (
    <StyledDriver heading={heading}>
      <StyledData colorWhite background="black">
        {position}
      </StyledData>
      <StyledData>{points}</StyledData>
      <StyledData
        colorWhite
        background="purple"
        textAlignLeft
        cursorPointer={heading ? false : true}
        onClick={() => (heading ? null : openModal(id))}
      >
        {name}
      </StyledData>
      <StyledData fontWeightBold>{manufacturer}</StyledData>
    </StyledDriver>
  );
};

const handleColorType = (background) => {
  switch (background) {
    case "black":
      return "#000";
    case "purple":
      return "#660066";
    default:
      return "#daa520";
  }
};

const StyledDriver = styled.tr`
  border-bottom: ${(props) =>
    props.heading ? "3px solid #fff" : "1px solid #fff"};
`;

const StyledData = styled.td`
  padding: 5px;
  text-align: ${(props) => (props.textAlignLeft ? "left" : "right")};
  font-weight: ${(props) => (props.fontWeightBold ? "bold" : "400")};
  color: ${(props) => (props.colorWhite ? "#fff" : "#000")};
  background: ${({ background }) => handleColorType(background)};
  cursor: ${(props) => (props.cursorPointer ? "pointer" : "default")};
`;

export default Driver;
