import styled from "styled-components";
import { DropdownButton, Dropdown } from 'react-bootstrap';

export const StyledDropdownButton= styled(DropdownButton)`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledDropdown = styled(Dropdown)`
  text-align: center;
  background: #f3f3f3;
  border-radius: 10px;
  border: 2px solid #f3f3f3;
  color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
`;
