import styled from "styled-components";

const Driver = ({
  id,
  position,
  points,
  name,
  constructor,
  heading = false,
  openModal,
}) => {
  return (
    <StyledDriver heading={heading}>
      <StyledData width="10" colorWhite background="black">
        {position}
      </StyledData>
      <StyledData width="15">{points}</StyledData>
      <StyledData
        colorWhite
        background="purple"
        textAlignLeft
        cursorPointer={id ? true : false}
        onClick={() => (id ? openModal({ id }) : null)}
      >
        {name}
      </StyledData>
      <StyledData width="40" fontWeightBold>
        {constructor}
      </StyledData>
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

const StyledDriver = styled.div`
  display: flex;
  border-bottom: ${(props) =>
    props.heading ? "3px solid #fff" : "1px solid #fff"};
`;

const StyledData = styled.div`
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};
  padding: 5px;
  text-align: ${(props) => (props.textAlignLeft ? "left" : "right")};
  font-weight: ${(props) => (props.fontWeightBold ? "bold" : "400")};
  color: ${(props) => (props.colorWhite ? "#fff" : "#000")};
  background: ${({ background }) => handleColorType(background)};
  cursor: ${(props) => (props.cursorPointer ? "pointer" : "default")};
`;

export default Driver;
