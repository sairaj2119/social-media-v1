import { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setvalues] = useState(initialValues);

  return [
    values,
    (e) => {
      console.log('inside the hook', e.target.value);
      setvalues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
};
