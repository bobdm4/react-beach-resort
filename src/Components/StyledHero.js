import styled from "styled-components";
import defaultBg from "../images/room-1.jpeg";

export const StyledHero = styled.div`
  min-height: 60vh;
  background: url(${(props) => (props.img ? props.img : defaultBg)})
    center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;
