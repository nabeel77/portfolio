import React, { useEffect } from 'react';
import Input from '../../components/Input';
import { useRouter } from 'next/router';
import useForm from '../../hooks/useForm';
import globalDesigns from '../../staticData/globalDesigns';
import Head from 'next/head';
import { authenticateUser } from '../../helpers';

const AdminLogin = () => {
  const router = useRouter();
  const [formState, inputHandler] = useForm({
    username: { value: '' },
    password: { value: '' },
  });

  const inputStyles = `${globalDesigns.responsiveFontStyles} bg-transparent w-full py-3 px-2 border-b border-solid border-primary uppercase  outline-none`;

  const submitHandler = async (event) => {
    event.preventDefault();
    const result = await fetch('/api/user/login', {
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
    <React.Fragment>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className="flex flex-col justify-center items-center gap-10 w-full h-screen">
        <h2 className="text-base lg:text-2xl font-OrbitronBold">Admin Login</h2>
        <div className="login-form-container bg-base-200 z-50 my-0 ml-[395px] p-5 flex m-4 rounded shadow shadow-3xl -translate-y-4/4 -translate-x-2/4 hover:shadow-5xl h-50vh w-full max-w-sm lg:w-1/3">
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
              className={`${globalDesigns.responsiveFontStyles} text-primary bg-accent w-1/2 rounded py-2.5 uppercase hover:btn-ghost`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLogin;
