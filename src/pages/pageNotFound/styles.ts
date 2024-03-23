import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh;
  min-height: 100vh;

  header {
    margin-bottom: 9vh;
  }
  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin-bottom: 8vh;

    img {
      width: 90%;
      min-width: 280px;
      margin-bottom: 8vh;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h1 {
        margin-bottom: 3vh;
      }
      p {
        margin-bottom: 7vh;
        align-self: flex-start;
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 216px;
        height: 68px;
        background-color: var(--e-global-color-text);
        color: var(--e-global-color-button-text);
        text-decoration: none;
        font-size: 0.875rem;
        line-height: 21px;
        letter-spacing: -0.035em;
        transition: 0.4s ease-in-out opacity;
        text-transform: uppercase;
        font-weight: 700;
        align-self: flex-start;
      }
    }
  }
  footer {
    display: flex;
    justify-content: center;
    margin-bottom: 2vh;

    strong {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.875rem;
      line-height: 17px;
      font-weight: 600;
      color: var(--e-global-color-text);
    }
  }

  @media (min-width: 850px) {
    padding: 4vh 5vw;

    section {
      flex-direction: row;
      align-items: center;
      justify-content: center;

      img {
        max-width: 539px;
        max-height: 447px;
      }
      div {
        width: 50%;

        p {
          width: 58%;
        }
      }
    }
  }
`;