import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--border-color);
  border-left: none;
  border-right: none;
  background-color: rgba(232, 234, 237, 0.05);
  padding: 8px 24px;
  font-weight: 600;
`;

export const Form = styled.form`
  padding: 0 24px;
`;

export const Item = styled.div`
  margin: 20px 0;
  &::first-child{
    margin-top: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  max-height: 64px;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font: 400 16px/24px;
`;

export const Title = styled.div`
  color: var(--text-primary);

`;

export const Description = styled.div`
  color: var(--text-secondary);
`;

export const Control = styled.div`
  margin-left: auto;
  max-width: 250px;
  color: var(--text-secondary);
`;

export const Input = styled.input`
  display: block;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  /* outline: none; */
  padding: 8px 15px;
  border-radius: 4px;
  min-width: 250px;
  font: 400 16px/24px;
  color: var(--text-primary);
`;

export const Select = styled.select`
  display: block;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  /* outline: none; */
  padding: 8px 15px;
  border-radius: 4px;
  min-width: 250px;
  font: 400 16px/24px;
  color: var(--text-primary);
`;
  // box-shadow: var(--modal-shadow);
