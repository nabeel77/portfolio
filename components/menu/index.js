import React from 'react';
import Link from 'next/link';

const Menu = (props) => {
  const links = props.menuItems.map((item, index) => {
    return (
      <Link className="btn-ghost" key={index} href={item.path}>
        {item.title}
      </Link>
    );
  });
  return (
    <div className="h-20 w-full bg-base-100 mt-0 fixed flex justify-center items-center gap-10 z-99999999">
      {links}
    </div>
  );
};

export default Menu;
