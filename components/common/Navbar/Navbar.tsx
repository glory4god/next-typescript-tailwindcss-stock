import { FC } from 'react';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
  className?: string;
  title: string;
}

const Navbar: FC<Props> = ({ className, title }) => {
  return (
    <div className={cn(className, 'fixed z-10')}>
      <Paper className="w-full fixed h-16 flex md:hidden text-3xl font-bold justify-between pt-3">
        <div>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <MenuIcon
                  {...bindTrigger(popupState)}
                  className="mx-4 cursor-pointer">
                  Menu
                </MenuIcon>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>
                    <Link href="/chart/line">
                      <a className="w-full">CHART</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={popupState.close}>
                    <Link href="/news">
                      <a className="w-full">NEWS</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={popupState.close}>
                    <Link href="/ai">
                      <a className="w-full">AI</a>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/report/total">
                      <a className="w-full">REPORT</a>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      window.alert('not launching');
                    }}>
                    <Link href="/my">
                      <a className="w-full">MY</a>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
          <Link href="/">
            <a className="text-4xl font-bold">{title}</a>
          </Link>
        </div>
        <div className="mr-6 space-x-4 pt-1">
          <span>IC</span>
          <span>IC</span>
        </div>
      </Paper>
      <Paper className="w-full xl:px-44 lg:px-32 lg:h-16 px-10 fixed md:h-16 md:flex hidden text-4xl font-bold justify-between  pt-3">
        <h1>
          <Link href="/">
            <a className="text-4xl font-bold">{title}</a>
          </Link>
        </h1>
        <div className="font-bold space-x-10 text-xl pt-3 ">
          <Link href="/chart/line">
            <a className="hover:text-indigo-400">CHART</a>
          </Link>
          <Link href="/news">
            <a className="hover:text-indigo-400">NEWS</a>
          </Link>
          <Link href="/ai">
            <a className="hover:text-indigo-400">AI</a>
          </Link>
          <Link href="/report/total">
            <a className="hover:text-indigo-400">REPORT</a>
          </Link>
        </div>
        <div className="space-x-4">
          <span>IC</span>
          <span>IC</span>
        </div>
      </Paper>
    </div>
  );
};

export default Navbar;
