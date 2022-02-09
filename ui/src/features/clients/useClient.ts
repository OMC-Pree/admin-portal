import { useEffect, useMemo, useState } from "react";
import { useGetUserByIdQuery } from "../../api/users";
import { IUser } from "../user/user";

function useClient(id?: string) {
  const [client, setClient] = useState<IUser | undefined>();
  const { data: clientResponse, isFetching, isSuccess } = useGetUserByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (!id) setClient(undefined);
  }, [id]);

  useEffect(() => {
    if (isSuccess && clientResponse) setClient(clientResponse.data[0]);
  }, [clientResponse, isSuccess]);

  return useMemo(() => ({ client, isFetching }), [client]);
}

export default useClient;
