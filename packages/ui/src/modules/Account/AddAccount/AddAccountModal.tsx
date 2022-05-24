/* eslint-disable sort-keys */
import { AccountEntity } from '@types';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Header = styled.header`
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

const Form = styled.form`
  padding: 0 24px;
`;

const Item = styled.div`
  margin: 20px 0;
  &::first-child{
    margin-top: 0;
  }
`;

const Row = styled.div`
  display: flex;
  max-height: 64px;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font: 400 16px/24px;
`;

const Title = styled.div`
  color: var(--text-primary);

`;

const Description = styled.div`
  color: var(--text-secondary);
`;

const Control = styled.div`
  margin-left: auto;
  max-width: 250px;
  color: var(--text-secondary);
`;

const Input = styled.input`
  display: block;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  outline: none;
  padding: 8px 15px;
  border-radius: 4px;
  min-width: 250px;
  font: 400 16px/24px;
  color: var(--text-primary);
`;

const Select = styled.select`
  display: block;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  outline: none;
  padding: 8px 15px;
  border-radius: 4px;
  min-width: 250px;
  font: 400 16px/24px;
  color: var(--text-primary);
`;
  // box-shadow: var(--modal-shadow);

export default function AddAccountModal (): React.ReactElement {
  const { clearErrors,
    formState: { dirtyFields, errors, isDirty, isValid },
    handleSubmit,
    register } = useForm<Partial<AccountEntity>>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      bank: undefined,
      accountNumber: undefined,
      sortCode: undefined,
      currency: undefined
    }
  });

  return (
    <>
      <Header>
        General settings
      </Header>
      <Form>
        {/* name */}
        <Item>
          <Row>
            <TitleContainer>
              <Title>Name</Title>
              <Description>Unique name for your bank account</Description>
            </TitleContainer>
            <Control>
              <Input
                type='text'
                {...register('name', {
                  required: 'Name is required'
                })}
              />
            </Control>
          </Row>
        </Item>
        <hr />
        {/* bank */}
        <Item>
          <Row>
            <TitleContainer>
              <Title>Bank</Title>
              <Description>Bank/financial institution maintaining this account</Description>
            </TitleContainer>
            <Control>
              <Select
                {...register('bank', {
                  required: 'Bank is required'
                })}
              >
                <option></option>
                <optgroup label='Poland'>
                  <option>mBank</option>
                </optgroup>
                <optgroup label='United Kingdom'>
                  <option>Lloyds Bank</option>
                </optgroup>
              </Select>
            </Control>
          </Row>
        </Item>
        <hr />
        {/* number */}
        <Item>
          <Row>
            <TitleContainer>
              <Title>Number</Title>
              <Description>Bank account number (optional)</Description>
            </TitleContainer>
            <Control>
              <Input
                inputMode='numeric'
                type='text'
                {...register('accountNumber')}
              />
            </Control>
          </Row>
        </Item>
        <hr />
        {/* sort code */}
        <Item>
          <Row>
            <TitleContainer>
              <Title>Sort Code</Title>
              <Description>UK only (optional)</Description>
            </TitleContainer>
            <Control>
              <Input
                inputMode='numeric'
                type='text'
                {...register('sortCode')}
              />
            </Control>
          </Row>
        </Item>
        <hr />
        {/* currency */}
        <Item>
          <Row>
            <TitleContainer>
              <Title>Currency</Title>
              <Description>Currency for this bank account</Description>
            </TitleContainer>
            <Control>
              <Select
                {...register('currency')}
              >
                <option></option>
                <option>GBP</option>
                <option>PLN</option>
                <option>USD</option>
              </Select>
            </Control>
          </Row>
        </Item>
      </Form>
    </>
  );
}
