import styled from "react-emotion";

const DIVA = styled("div")`
  ${"h2"} {
    font-size: 2.5em;
    margin: 0 0 0.5em;
    padding: 0.8em 0;
    text-align: center;
    background-color: rgb(179, 215, 153);
  }
  ${"form div"} {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    ${"select"} {
      width: 20em;
      border: none;
      padding: 1em 1em;
      text-align: center;
      border-radius: 10px;
      background-color: #f1f1f1;
      font-size: 1em;
    }
    ${"select:focus"} {
      outline: none;
    }
    ${"nav"} {
      margin: 2em 0;
      ${"li"} {
        display: inline-block;
        list-style-type: none;
        margin-right: 8em;
        margin-bottom: 1em;
      }
    }
  }
`;

export default DIVA;
