import styled from "styled-components";
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';

export const CreateArticleForm = styled(Form)``;
export const CreateArticleButton = styled(Button)``;
export const CreateArticleContainer = styled(Container)`
  justify-content: center;
  position: relative;
  min-height: 100vh;
`;
export const CreateArticleJumbotron = styled(Jumbotron)`
  background: #6A1EDF;
  color: #f3f3f3;
  text-align: center;
`;
export const ItemGrid = styled.ul`

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;

  li {
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    border-radius: 16px;
    padding: 32px 24px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    cursor: pointer;
  }

  li span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    align-items: center;
    color: var(--title-color)
  }

  li.selected {
    background: #f3f3f3;
    border: 2px solid #6A1EDF;
  }

`;
