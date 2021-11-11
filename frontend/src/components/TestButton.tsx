import { useQuery } from 'react-query';
import { fetchAccount } from '../api/account';
import { getNewRefreshToken } from '../api/auth';

export function Button(): JSX.Element {
  const id = 'c70555fc-d994-44fb-ac91-4cfbf72070f5';
  const { isLoading, isFetching, data, refetch } = useQuery('account', () => fetchAccount(id), {
    enabled: false,
  });
  const refreshToken = async (): Promise<void> => getNewRefreshToken();

  return (
    <>
      <button type="button" onClick={() => refetch()}>
        Fetch account
      </button>

      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div>{JSON.stringify(data)}</div>

          <div>{isFetching ? 'Fetching...' : null}</div>
        </>
      )}
      <button type="button" onClick={refreshToken}>
        Refresh Token
      </button>
    </>
  );
}
