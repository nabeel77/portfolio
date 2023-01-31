import React from 'react';
import Link from 'next/link';

const Menu = (props) => {
  const links = props.menuItems.map((item, index) => {
    return (
      <Link
        className="text-blue-darker hover:text-white"
        key={index}
        href={item.path}
      >
        {item.title}
      </Link>
    );
  });
  return (
    <div className="h-20 w-full bg-blue-greenishBlue mt-0 fixed flex justify-center items-center gap-10">
      {links}
    </div>
  );
};

export default Menu;
