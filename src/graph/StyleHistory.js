import styled from "react-emotion";

const DIVA = styled("select")`
  width: 10em;
  border: none;
  padding: 0.3em 1em;
  text-align: center;
  border-radius: 10px;
  background-color: #f1f1f1;
  font-size: 1em;
  margin: 2em 5em;
  ${":focus"} {
    outline: none;
  }
`;
export default DIVA;
