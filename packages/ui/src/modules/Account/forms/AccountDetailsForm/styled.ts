import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  max-width: 500px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: inline-block;
  font-weight: 300;
  line-height: 1.5;
  font-size: 14px;
  color: rgb(var(--gray100));
  word-break: break-word;
  margin-bottom: 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  position: relative;
  border: 1px solid var(--line);
  border-radius: 4px;
  transition: all 0.15s ease 0s;
  background: rgb(var(--gray0));
`;

export const Input = styled.input`
  flex: 1 1 0px;
  width: 100%;
  margin: 0px;
  padding: 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;
  font-size: 18px;
  font-weight: 400;
  color: rgb(var(--gray100));
  border: 1px solid transparent;
`;

export const Select = styled.select`
  flex: 1 1 0px;
  width: 100%;
  margin: 0px;
  padding: 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;
  font-size: 18px;
  font-weight: 400;
  color: rgb(var(--gray100));
  border: 1px solid transparent;
`;
