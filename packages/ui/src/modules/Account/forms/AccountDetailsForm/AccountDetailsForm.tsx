/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable sort-keys */
import { UpdateAccountDto } from '@types';
import { Button } from 'components/buttons/Buttons';
import { updateAccount } from 'core/api/account';
import { useContextData } from 'core/api/context';
import { queryClient } from 'core/lib/react-query';
import { renderOptions } from 'core/utils/form.util';
import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMatch } from 'react-location';
import { useMutation } from 'react-query';
import { LocationGenerics } from 'routes';

import { H2, Header } from '../styled';
import { Field, Form, Input, InputContainer, Label, Select, Wrapper } from './styled';

export default function AccountDetailsForm () {
  const { data } = useContextData();
  const [banks, setBanks] = useState(data?.banks);
  const [currency, setCurrency] = useState(data?.currency);
  const { data: { account } } = useMatch<LocationGenerics>();

  useEffect(() => {
    if (data) {
      const { banks, currency } = data;

      setBanks(banks);
      setCurrency(currency);
    }
  }, [data]);

  const { formState,
    handleSubmit,
    register } = useForm<UpdateAccountDto>({
    defaultValues: {
      name: account?.name,
      bank: account?.bank.id,
      accountNumber: account?.accountNumber,
      currency: account?.currency.id
    }
  });

  const { dirtyFields } = formState;

  const submitForm = useMutation((updatedAccountData: UpdateAccountDto) => updateAccount(account!.id, updatedAccountData), {
    onSuccess: async () => {
      await queryClient.refetchQueries('accounts');
    }
  });

  const onSubmit: SubmitHandler<Partial<UpdateAccountDto>> = (formData, evt) => {
    evt?.preventDefault();

    const modifiedValues = pick(formData, Object.keys(dirtyFields));

    submitForm.mutate(modifiedValues);
  };

  return (
    <Wrapper>
      <Header>
        <H2>Account Details</H2>
      </Header>
      <Form
        id='update-account'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label>Display name</Label>
          <InputContainer>
            <Input
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect='off'
              placeholder='Display name'
              type='text'
              {...register('name')}
            />
          </InputContainer>
        </Field>
        <Field>
          <Label>Bank</Label>
          <InputContainer>
            <Select
              {...register('bank', {
                required: 'Bank is required',
                valueAsNumber: true
              })}
            >
              <option value=''></option>
              {banks ? renderOptions(banks) : null}
            </Select>
          </InputContainer>
        </Field>
        <Field>
          <Label>Account number</Label>
          <InputContainer>
            <Input
              inputMode='numeric'
              type='text'
              {...register('accountNumber')}
            />
          </InputContainer>
        </Field>
        <Field>
          <Label>Currency</Label>
          <InputContainer>
            <Select
              {...register('currency', {
                valueAsNumber: true
              })}
            >
              <option value=''></option>
              {currency ? renderOptions(currency) : null}
            </Select>
          </InputContainer>
        </Field>
        <Button
          filled
          form='update-account'
        >
          Save
        </Button>
      </Form>
    </Wrapper>
  );
}
