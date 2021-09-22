import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import queryString from 'query-string';
import React, { useState } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSearchParams = (search: string) => {
  const parsed = queryString.parse(search);

  return parsed;
};

export const useForm = <T>(
  initialValues: T,
  callback: (args: T) => any,
): {
  values: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onHide: (name: string) => void;
} => {
  const [formState, setFormState] = useState<T>(initialValues);

  const editFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setFormState((prev) => {
      switch (prev[e.target.name].type) {
        //CASE FOR NOT STANDARD INPUTS

        default:
          return {
            ...prev,
            [e.target.name]: {
              ...prev[e.target.name],
              value: e.target.value,
            },
          };
      }
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback(formState);
  };

  const hideHandler = (name: string) => {

    if (formState[name].type === 'password')
      setFormState((prev) => {
        return {
          ...prev,
          [name]: {
            ...prev[name],
            hidden: !prev[name].hidden,
          },
        };
      });
  };

  return {
    values: formState,
    onChange: editFormHandler,
    onSubmit: submitHandler,
    onHide: hideHandler,
  };
};
