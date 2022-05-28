/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable sort-keys */
import { AccountEntity, CreateAccountDto } from '@types';
import { createAccount } from 'core/api/account';
import { useContextData } from 'core/api/context';
import { queryClient } from 'core/lib/react-query';
import { renderOptions } from 'core/utils/form.util';
import { removeEmptyFields } from 'core/utils/helpers';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { Control, Description, Form, Header, Input, Item, Row, Select, Title, TitleContainer } from './styled';

type Props = {
  closeModal: () => void;
}

export default function AddAccountForm ({ closeModal }: Props): React.ReactElement<Props> {
  const { data } = useContextData();
  const [banks, setBanks] = useState(data?.banks);
  const [currency, setCurrency] = useState(data?.currency);

  useEffect(() => {
    if (data) {
      const { banks, currency } = data;

      setBanks(banks);
      setCurrency(currency);
    }
  }, [data]);

  const { clearErrors,
    formState: { dirtyFields, errors, isDirty, isValid },
    handleSubmit,
    register } = useForm<CreateAccountDto>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      bank: -1,
      accountNumber: '',
      currency: -1
    }
  });

  const submitForm = useMutation((newAccountData: CreateAccountDto) => createAccount(newAccountData), {
    onSuccess: async () => {
      await queryClient.refetchQueries('accounts');
      closeModal();
    }
  });

  const onSubmit: SubmitHandler<CreateAccountDto> = (formData: CreateAccountDto, evt) => {
    evt?.preventDefault();
    removeEmptyFields(formData);
    submitForm.mutate(formData);
  };

  return (
    <>
      <Header>
        General settings
      </Header>
      <Form
        id='add-account'
        onSubmit={handleSubmit(onSubmit)}
      >
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
                  required: 'Bank is required',
                  valueAsNumber: true
                })}
              >
                <option value=''></option>
                {banks ? renderOptions(banks) : null}
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
        {/* currency */}
        <Item>
          <Row>
            <TitleContainer>
              <Title>Currency</Title>
              <Description>Currency for this bank account</Description>
            </TitleContainer>
            <Control>
              <Select
                {...register('currency', {
                  valueAsNumber: true
                })}
              >
                <option value=''></option>
                {currency ? renderOptions(currency) : null}
              </Select>
            </Control>
          </Row>
        </Item>
      </Form>
    </>
  );
}
