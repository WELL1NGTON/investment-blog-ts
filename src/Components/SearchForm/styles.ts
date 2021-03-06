import styled from "styled-components";
import { Form , FormControl} from 'react-bootstrap';

export const StyledForm = styled(Form)`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const StyledFormControl = styled(FormControl)`
  text-align: center;
  background: #f3f3f3;
  border-radius: 10px;
  border: 2px solid #f3f3f3;
  color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
`;
