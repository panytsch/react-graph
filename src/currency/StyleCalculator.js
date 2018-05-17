import styled from "react-emotion";

const DIVA = styled("div")`
  ${"form"} {
    width: 60%;
    margin: 0 auto;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    align-items: center;
    padding: 2em 0;
    justify-content: space-around;
    background-color: rgb(208, 208, 121);
    ${"div"} {
      margin: 1em 0;
      padding: 1em 1em;
      flex-direction: column;
      background-color: rgb(147, 226, 207);
      border-radius: 10px;
      ${"div p"} {
        font-size: 1.5em;
      }
      ${"select"} {
        width: 10em;
        border: none;
        padding: 0.3em 1em;
        text-align: center;
        border-radius: 10px;
        background-color: #f1f1f1;
        font-size: 1em;
      }
      ${"input"} {
        width: 10em;
        padding: 0.3em 0.3em;
        font-size: 1em;
      }
      ${"input:focus, select:focus"} {
        outline: none;
      }
      ${"button"} {
        font-size: 2em;
        padding: 0.05em 0.3em;
        background-color: rgb(4, 185, 0);
        border: 1px solid rgb(4, 185, 0);
        border-radius: 4px;
      }
      ${"button:focus"} {
        outline: none;
      }
    }
    ${"div:nth-child(2)"} {
      padding: 0;
    }
  }
`;

export default DIVA;
