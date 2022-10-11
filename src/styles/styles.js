import styled from "styled-components";

export const TodoTable = styled.main`
  display: table;
  width: 700px;
  height: 100%;

  ul {
    display: table-row;
  }
  ul.subject {
    display: table-header-group;
  }
  li {
    display: table-cell;
    width: 80px;
    text-align: center;
  }
`;