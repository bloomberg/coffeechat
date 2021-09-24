import Link from 'next/link'

function InitializationSuccessful(): JSX.Element {
  return (
    <>
      <h1>Initialization Successful</h1>
      <p>
        Please <Link href="/">log in</Link> to proceed
      </p>
    </>
  )
}

export default InitializationSuccessful
