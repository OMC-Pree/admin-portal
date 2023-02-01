import { useMemo } from "react";
import { useGetUserByIdQuery } from "../../api/users";

function useCoach(id?: string) {
  const { data } = useGetUserByIdQuery(id);
  return useMemo(() => data?.data[0], [data]);
}

export default useCoach;
