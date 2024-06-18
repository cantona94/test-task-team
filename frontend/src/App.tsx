import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Item } from './Item';
import { IForm } from './types';

function App() {
  const [formattedNumber, setFormattedNumber] = useState<string>('');
  const [data, setData] = useState<IForm[] | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);

  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: 'onChange',
  });

  const emailError = formState.errors['email']?.message;
  const numberError = formState.errors['number']?.message;

  const onSubmit: SubmitHandler<IForm> = (dataForm) => {
    setData(null);
    setIsloading(true);
    dataForm.number = dataForm.number?.replace(/-/gi, '');
    axios
      .post<IForm[]>('http://localhost:3000/submit', dataForm, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      })
      .finally(() => setIsloading(false));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex flex-col items-center mt-5"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white text-left"
          >
            email
          </label>
          <input
            type="text"
            id="email"
            className="border rounded-lg block w-full p-2.5 bg-gray-700
        border-gray-600 text-white focus:border-blue-500 focus:outline-none"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {emailError && (
            <p className="mt-1 text-red-600 text-sm">{emailError}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white text-left"
          >
            number
          </label>
          <InputMask
            type="text"
            id="number"
            className="border rounded-lg block w-full p-2.5 bg-gray-700
        border-gray-600 text-white focus:border-blue-500 focus:outline-none"
            value={formattedNumber}
            mask="99-99-99"
            maskChar=""
            {...register('number', {
              required: false,
              minLength: {
                value: 8,
                message: 'Minimum 6 number required',
              },
            })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormattedNumber(e.target.value)
            }
          />
          {numberError && (
            <p className="mt-1 text-red-600 text-sm">{numberError}</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white focus:ring-4 focus:outline-none font-medium 
        rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
      bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      {isloading && (
        <h3 className="text-white text-center mt-3">Is loading...</h3>
      )}
      {data && data.length === 0 ? (
        <h3 className="text-red-600 text-center mt-3">No data</h3>
      ) : (
        data && (
          <div>
            {data.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </div>
        )
      )}
    </>
  );
}

export default App;
