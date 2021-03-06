import styled  from 'styled-components';
import { Container, Jumbotron, Row, Col, Card , Badge, InputGroup} from 'react-bootstrap';

interface CardProps {
  types: 'IMPACTO SOCIAL' | 'ALTERNATIVOS' | 'DICAS' | 'IDEIAS';
}

export const HomeContainer = styled(Container)`
  justify-content: center;
  position: relative;
  min-height: 100vh;
`;

export const HomeJumbotron = styled(Jumbotron)`
  background: #6A1EDF;
  color: #f3f3f3;
  text-align: center;
`;
export const HomeRow = styled(Row)`
`;
export const HomeCol = styled(Col)`
  padding: 20px;
  text-align: center;
  a {
    text-decoration: none;
    color: #f3f3f3;
  }
`;

export const HomeBadge = styled(Badge)`
  font-weight: normal;
  color: #F62967;
  border: 5px solid #F62967;
  border-radius: 10px;
  padding: 5px 70px;
`;

export const HomeInputGroup =  styled(InputGroup)`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

export const HomeCard = styled(Card)<CardProps>`
  margin-top: 8px;
  background: #222;
  color: #f3f3f3;
  text-align: center;
   width: '8rem';
  a {
    text-decoration: 'none';
    color: #f3f3f3;
  }

  p {
    text-align: justify;
  }
`;

export const AdContainer = styled.div`
  padding: 48px;
`;

