import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .topDiv, .bottomDiv {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rebeccapurple;
  }

  .topDiv {
    background-color: rgba(0, 255, 217, 0.25);
  }

  .bottomDiv {
    background-color: rgba(83, 223, 242, 0.25);
  }
`;
