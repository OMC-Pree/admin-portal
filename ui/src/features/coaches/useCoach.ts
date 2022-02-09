import { useEffect, useMemo, useState } from "react";
import { useLazyGetUserByIdQuery } from "../../api/users";
import { useAppSelector } from "../../hooks/store";
import { IUser } from "../user/user";
import { selectCoaches } from "./coachesSlice";

function useCoach(id?: string) {
  const storedCoaches = useAppSelector(selectCoaches);
  const [getCoach] = useLazyGetUserByIdQuery();
  const [coach, setCoach] = useState<IUser | undefined>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!id) setCoach(undefined);
  }, [id]);

  async function loadCoach(_id: string) {
    setIsFetching(true);
    const userResponse = await getCoach(_id).unwrap();
    if (userResponse.data.length) setCoach(userResponse.data[0]);
    setIsFetching(false);
  }

  useEffect(() => {
    const storedCoach = storedCoaches.find((user) => user.id === id);
    if (storedCoach) {
      setCoach(storedCoach);
    } else if (id) {
      loadCoach(id);
    }
  }, [id, storedCoaches]);

  return useMemo(() => ({ coach, isFetching }), [coach, isFetching]);
}

export default useCoach;
