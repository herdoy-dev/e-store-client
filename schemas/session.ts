export default interface Session {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  address: {
    _id: string;
    street: string;
  };
}
