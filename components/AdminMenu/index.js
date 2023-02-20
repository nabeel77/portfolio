import React from 'react';
import Link from 'next/link';
import Button from '../Button';
import { BiMenu } from 'react-icons/bi';
import useAdminMenu from './useAdminMenu';

const AdminMenu = (props) => {
  const { handleLogout } = useAdminMenu();
  const links = (
    <div className="flex-1 flex justify-center items-center">
      {props.menuItems.map((item, index) => {
        return (
          <Link
            className="btn-ghost active:bg-green px-4 py-2 rounded"
            key={index}
            href={item.path}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
  return (
    <div className="h-20 w-full bg-base-100 mt-0 fixed flex justify-center items-center z-99999999">
      <Button styles="w-auto h-auto text-primary">
        <BiMenu className="w-7 h-7 md:hidden" />
      </Button>
      <div className="hidden md:flex w-full justify-center items-center gap-10 px-10">
        {links}
        <Button
          styles="btn bg-primary hover:btn-ghost"
          handleClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminMenu;
