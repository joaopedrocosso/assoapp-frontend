export interface UserType {
  uid: string | undefined;
  profilePhoto: string | undefined;
  name: string | undefined;
  email: string | undefined;
  accessToken: string | undefined;
}

export interface UserObject {
  id: string;
  data: UserType;
}
