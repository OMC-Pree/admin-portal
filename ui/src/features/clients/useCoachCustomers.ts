import { useEffect, useMemo, useState } from "react";
import { useGetUsersByCoachIdQuery, useLazyGetUsersByCoachIdQuery } from "../../api/users";
import { GetUsersResponse } from "../../models/httpCalls";
import { IUser } from "../user/userModels";

// Max number of users we can get with a single request
const MAX_USERS_PER_REQUEST = 100;

type UseCoachClientsReturnValue = { customers: IUser[]; refetchCustomers: () => void };

const useCoachCustomers = (coachId = ""): UseCoachClientsReturnValue => {
  const [customers, setCustomers] = useState<IUser[]>([]);
  const { data, refetch } = useGetUsersByCoachIdQuery(
    { coachId: coachId, max: MAX_USERS_PER_REQUEST },
    { skip: !coachId },
  );
  const [getUsers] = useLazyGetUsersByCoachIdQuery();

  const doLoad = async (firstBatch: IUser[] = []) => {
    let _customers: IUser[] = [...firstBatch];
    let keepLoading = _customers.length === MAX_USERS_PER_REQUEST;
    let lastCustomerId: string | undefined = _customers[_customers.length - 1]?.id;
    while (keepLoading) {
      const { data, meta } = (await getUsers({
        coachId: coachId,
        max: MAX_USERS_PER_REQUEST,
        lastEvaluatedKey: lastCustomerId,
      }).unwrap()) as GetUsersResponse;
      if (data.length) {
        lastCustomerId = meta.lastEvaluatedKey;
        _customers = _customers.concat(data);
      } else {
        lastCustomerId = undefined;
      }
      keepLoading = data.length === MAX_USERS_PER_REQUEST;
    }

    setCustomers(_customers || []);
  };

  useEffect(() => {
    if (data?.data) doLoad(data.data);
    return () => {
      setCustomers([]);
    };
  }, [data]);

  return useMemo(() => ({ customers, refetchCustomers: refetch }), [customers]);
};

export default useCoachCustomers;
