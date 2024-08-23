import styled from '@emotion/styled';

const StyledIconButton = styled.button`
  background-color: #f1f1f1;
  border: none;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;
  color: #7d7d7d;
  &:hover {
    background-color: #ccc;
  }
  &.small {
    width: 15px;
    height: 15px;
  }
  &.medium {
    width: 24px;
    height: 24px;
  }
  &.large {
    width: 32px;
    height: 32px;
  }
  &.rounded-small {
    border-radius: 4px;
  }

  &.rounded-medium {
    border-radius: 8px;
  }

  &.rounded-full {
    border-radius: 100%;
  }
`;

export default StyledIconButton;
