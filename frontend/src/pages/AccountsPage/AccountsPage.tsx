import { useMatch } from 'react-location';

function AccountPage(): React.ReactElement {
  const {
    data: { accounts },
    params: { accountId },
  } = useMatch();

  return (
    <>
      <div>{JSON.stringify(accounts)}</div>
      <div>{accountId}</div>
    </>
  );
}
export default AccountPage;
