import { gql, request } from 'graphql-request'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import {
  InitializeMutation,
  InitializeMutationVariables,
} from '../../generated/graphql'
import getBackendUrl from '../../lib/getBackendUrl'
import { stackStyles } from '../Stack'

export type SubmissionStatus = '' | 'inProgress' | 'success' | 'failure'

interface InitializationInProgressProps {
  setSubmissionStatus: Dispatch<SetStateAction<SubmissionStatus>>
}

const Form = styled.form`
  ${stackStyles()}
`

const FormLabel = styled.label`
  ${stackStyles({ space: '4px' })}

  input {
    padding: 8px 12px;
    width: 50%;
  }
`

function InitializationInProgress({
  setSubmissionStatus,
}: InitializationInProgressProps): JSX.Element {
  const [formValues, setFormValues] = useState({
    givenName: '',
    familyName: '',
    email: '',
  })

  function handleChangeFormField(key: string, value: string): void {
    setFormValues((previousValues) => ({
      ...previousValues,
      [key]: value,
    }))
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    setSubmissionStatus('inProgress')
    const { initialize } = await request<
      InitializeMutation,
      InitializeMutationVariables
    >(
      getBackendUrl(),
      gql`
        mutation Initialize(
          $email: String!
          $given_name: String!
          $family_name: String!
        ) {
          initialize(
            email: $email
            given_name: $given_name
            family_name: $family_name
          ) {
            id
          }
        }
      `,
      {
        email: formValues.email,
        given_name: formValues.givenName,
        family_name: formValues.familyName,
      }
    )
    setSubmissionStatus(initialize?.id ? 'success' : 'failure')
  }

  return (
    <>
      <h1>Welcome to Coffee Chat</h1>
      <p>You need to initialize your application</p>
      <p>Please enter details below for an admin user</p>
      <Form onSubmit={handleSubmit}>
        <FormLabel>
          <span>Given name</span>
          <input
            onChange={(event) =>
              handleChangeFormField('givenName', event.target.value)
            }
            type="text"
            value={formValues.givenName}
          />
        </FormLabel>
        <FormLabel>
          <span>Family name</span>
          <input
            onChange={(event) =>
              handleChangeFormField('familyName', event.target.value)
            }
            type="text"
            value={formValues.familyName}
          />
        </FormLabel>
        <FormLabel>
          <span>Email</span>
          <input
            onChange={(event) =>
              handleChangeFormField('email', event.target.value)
            }
            type="email"
            value={formValues.email}
          />
        </FormLabel>
        <input type="submit" value="Submit" />
      </Form>
    </>
  )
}

export default InitializationInProgress
