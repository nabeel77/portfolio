import React from 'react';
import Input from '../../components/input';
import { useRouter } from 'next/router';
import useForm from '../../components/hooks/useForm';
import globalDesigns from '../../constants/globalDesigns';

const AdminLogin = () => {
  const router = useRouter();
  const [formState, inputHandler] = useForm({
    username: { value: '' },
    password: { value: '' },
  });

  const inputStyles = `${globalDesigns.responsiveFontStyles} bg-transparent w-full py-3 px-2 border-b border-solid border-blue-darker uppercase text-blue-darker placeholder-blue-darker outline-none`;

  const submitHandler = async (event) => {
    event.preventDefault();
    const result = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formState.inputs.username.value,
        password: btoa(formState.inputs.password.value),
      }),
    }).then((res) => res.json());
    if (result.status === 'ok') {
      router.push('/admin/dashboard');
    }
  };
  return (
    <div className="login-form-container z-50 my-0 mx-auto p-5 flex m-4 rounded shadow bg-blue-greenishBlue shadow-3xl absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 hover:shadow-5xl h-50vh w-full max-w-sm lg:w-1/3">
      <form
        onSubmit={submitHandler}
        className="p-5 w-full flex flex-col justify-center items-center gap-4"
      >
        <Input
          id="username"
          element="input"
          type="text"
          placeholder="Username"
          onInput={inputHandler}
          classNames={inputStyles}
        />
        <Input
          id="password"
          element="input"
          type="password"
          placeholder="Password"
          onInput={inputHandler}
          classNames={inputStyles}
        />
        <button
          type="submit"
          className={`${globalDesigns.responsiveFontStyles} bg-blue-darker w-1/2 rounded py-2.5 uppercase border border-solid border-blue-darker hover:bg-transparent hover:text-blue-darker`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
