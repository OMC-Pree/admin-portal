import { useEffect, useMemo, useState } from "react";
import { useGetUsersByTypeQuery, useLazyGetUsersByTypeQuery } from "../../api/users";
import { GetUsersResponse } from "../../models/httpCalls";
import { UserType } from "../user/userEnums";
import { IUser } from "../user/userModels";

export type CoachAutoCompleteOpts = {
  label: string;
  id: IUser["id"];
};

const numResultsPerCall = 100;

function useCoaches(): {
  coaches: IUser[];
  coachOptions: CoachAutoCompleteOpts[];
} {
  const [coaches, setCoaches] = useState<IUser[]>([]);

  const { data: response } = useGetUsersByTypeQuery({
    type: UserType.COACH,
    max: numResultsPerCall,
  });
  const [loadCoaches, { isLoading }] = useLazyGetUsersByTypeQuery();

  const doLoad = async (firstBatch: IUser[] = []) => {
    let _coaches: IUser[] = [...firstBatch];
    let keepLoading = _coaches.length === numResultsPerCall;
    let lastCoachId: string | undefined = _coaches[_coaches.length - 1]?.id;
    while (keepLoading) {
      const { data, meta } = (await loadCoaches({
        type: UserType.COACH,
        max: numResultsPerCall,
        lastEvaluatedKey: lastCoachId,
      }).unwrap()) as GetUsersResponse;
      if (data.length) {
        lastCoachId = meta.lastEvaluatedKey;
        _coaches = _coaches.concat(data);
      } else {
        lastCoachId = undefined;
      }
      keepLoading = data.length === numResultsPerCall;
    }
    setCoaches(_coaches || []);
  };

  useEffect(() => {
    if (response?.data) doLoad(response.data);
    return () => {
      setCoaches([]);
    };
  }, [response]);

  return useMemo(
    () => ({
      coaches: coaches,
      isLoading,
      coachOptions: coaches.map((coach) => ({
        label: `${coach.firstName} ${coach.lastName}`,
        id: coach.id,
      })),
    }),
    [coaches, isLoading],
  );
}

export default useCoaches;
