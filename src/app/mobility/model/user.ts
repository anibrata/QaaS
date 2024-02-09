/*export interface User {
  isSelected: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  isEdit: boolean;
}*/
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
}

export const UserColumns = [
  {
    key: 'firstName',
    type: 'text',
    label: 'First Name',
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Last Name',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    key: 'birthDate',
    type: 'date',
    label: 'Date of Birth',
  },
  /*{
    key: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'username',
    type: 'text',
    label: 'User Name',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
  },*/
];
