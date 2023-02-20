import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';
import useThemeChange from '../../hooks/useThemeChange';
import { themeOptions } from '../../staticData/themeOptions';
import Select from '../Select';

const Header = ({ buttonClick, links, isMobileMenuOpen }) => {
  const [value, onChange] = useThemeChange(themeOptions[0], true);
  return (
    <React.Fragment>
      <header className="fixed w-full h-24 bg-base-200 p-5 z-99999999">
        <div className="w-full h-full flex justify-center items-center">
          <button
            className="flex-1 md:flex-none flex justify-start cursor-pointer text-primary"
            onClick={buttonClick}
          >
            <BiMenu className="w-7 h-7 md:hidden" />
          </button>
          <nav className="flex-row gap-5 flex-1 justify-center items-center hidden md:flex">
            {links}
          </nav>
          <div>
            <Select
              themeOptions={themeOptions}
              onChange={onChange}
              defaultValue={value}
            />
          </div>
        </div>
      </header>
      <div
        className={`${
          !isMobileMenuOpen && 'hidden'
        } z-99999999 fixed w-full h-full`}
      >
        <div className="h-full w-11/12 bg-base-100 py-10 px-5 flex flex-col items-center">
          <div className="w-full h-auto flex justify-start">
            <button
              className="w-auto h-auto text-primary"
              onClick={buttonClick}
            >
              <BiX className="w-7 h-7" />
            </button>
          </div>
          <div className="h-auto flex flex-col gap-5 pt-20">{links}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
