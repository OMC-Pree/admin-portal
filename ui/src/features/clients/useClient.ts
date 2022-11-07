import { useEffect, useMemo, useState } from "react";
import { useLazyGetUserByIdQuery } from "../../api/users";
import { IdpErrorResponse } from "../../models/httpCalls";
import { IUser } from "../user/userModels";

function useClient(id: string | undefined) {
  const [client, setClient] = useState<IUser | undefined>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<IdpErrorResponse | void>();
  const [getClient] = useLazyGetUserByIdQuery();

  async function loadClient(_id: string) {
    setIsFetching(true);
    setError();
    try {
      const result = await getClient(_id);
      if (result.data && result.data.data.length) setClient(result.data.data[0]);
      setIsFetching(false);
    } catch (error) {
      setError(error as IdpErrorResponse);
    }
    setIsFetching(false);
  }

  useEffect(() => {
    if (id) loadClient(id);
  }, [id]);

  return useMemo(() => ({ client, isFetching, error }), [client, isFetching, error]);
}

export default useClient;
