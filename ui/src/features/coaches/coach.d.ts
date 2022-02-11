export type CoachesState = {
  coaches: IUser[];
  clients: IUser[];
};

export interface ICoachTableData {
  id: string;
  airTableId: string;
  firstName: string;
  lastName: string;
  email: string;
  type: UserType;
  permissions: string;
  createdAt: string;
}
