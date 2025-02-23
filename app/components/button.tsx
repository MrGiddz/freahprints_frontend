import React from "react";
import styled from "styled-components";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;

};

const StyledButton = styled.button`
  width: 100%;
  background-color: #00bb94;
  font-weight: 500;
  color: white;
  padding: 0.5rem 1rem;
  margin-top: 2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00bb94007;
  }
`;

const Button = ({ onClick, className, children,  }: Props) => {
  return (
    <StyledButton onClick={onClick} className={className}>
      {children}
    </StyledButton>
  );
};

export default Button;
