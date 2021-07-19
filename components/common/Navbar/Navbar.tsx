import { FC } from 'react';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuIcon from '@material-ui/icons/Menu';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  kakaoLogout,
  selectKakaoLogin,
} from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';

interface Props {
  className?: string;
  title: string;
}

const Navbar: FC<Props> = ({ className, title }) => {
  const page = useRouter();
  const { login } = useSelector(selectKakaoLogin);
  const dispatch = useDispatch();

  return (
    <div className={cn(className, 'fixed z-10')}>
      <Paper className="w-full fixed h-16 flex md:hidden text-3xl font-bold justify-between">
        <div className="flex items-center">
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
                    <Link href="/report/chart">
                      <a className="w-full">REPORT</a>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      window.alert('not launching');
                    }}>
                    <Link href="/report/my">
                      <a className="w-full">MY</a>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      window.alert('not launching');
                    }}>
                    <Link href="/login">
                      <a
                        onClick={() => {
                          localStorage.setItem('prevUrl', page.asPath);
                        }}
                        className="w-full">
                        LOG IN
                      </a>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
          <Link href="/">
            <a>
              <Image
                src={'/title.png'}
                alt={'mainlogo'}
                width={160}
                height={50}
              />
            </a>
          </Link>
        </div>
        <div className="flex mr-4 space-x-4 pt-2">
          {login ? (
            <Link href={page.asPath}>
              <a
                className="pt-1"
                onClick={() => {
                  localStorage.setItem('prevUrl', page.asPath);
                  const token = localStorage.getItem('token');
                  if (token !== null) {
                    dispatch(kakaoLogout(token));
                  }
                  localStorage.setItem('token', '');
                }}>
                out
              </a>
            </Link>
          ) : (
            <Link
              href={
                'https://kauth.kakao.com/oauth/authorize?client_id=536a201af32aa0d66156738f15380b36&redirect_uri=http://localhost:3000/login&response_type=code'
              }>
              <a
                className="pt-1"
                onClick={() => {
                  localStorage.setItem('prevUrl', page.asPath);
                }}>
                in
              </a>
            </Link>
          )}
          <span>
            {login ? (
              <div className="cursor-pointer">
                <Image
                  src={'/mainlogo2.png'}
                  alt="userimage"
                  width={48}
                  height={48}
                />
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => {
                  alert('로그인 후 이용 가능합니다.');
                }}>
                <Image
                  src={'/mainlogo2.png'}
                  alt="userimage"
                  width={48}
                  height={48}
                />
              </div>
            )}
          </span>
        </div>
      </Paper>
      <Paper className="w-full xl:px-44 lg:px-16 lg:h-16 px-10 fixed md:h-16 md:flex hidden text-4xl font-bold justify-between pt-1">
        <Link href="/">
          <a>
            <Image
              src={'/title.png'}
              alt={'mainlogo'}
              width={150}
              height={50}
            />
          </a>
        </Link>
        <div className="font-bold space-x-10 text-xl pt-4 lg:pr-20 pr-6">
          <Link href="/chart/line">
            <a className="hover:text-indigo-400">CHART</a>
          </Link>
          <Link href="/news">
            <a className="hover:text-indigo-400">NEWS</a>
          </Link>
          <Link href="/ai">
            <a className="hover:text-indigo-400">AI</a>
          </Link>
          <Link href="/report/chart">
            <a className="hover:text-indigo-400">REPORT</a>
          </Link>
        </div>
        <div className="flex space-x-4 pt-1">
          {login ? (
            <Link href={page.asPath}>
              <a
                className="pt-1"
                onClick={() => {
                  localStorage.setItem('prevUrl', page.asPath);
                  const token = localStorage.getItem('token');
                  if (token !== null) {
                    dispatch(kakaoLogout(token));
                  }
                  localStorage.setItem('token', '');
                }}>
                out
              </a>
            </Link>
          ) : (
            <Link
              href={
                'https://kauth.kakao.com/oauth/authorize?client_id=536a201af32aa0d66156738f15380b36&redirect_uri=http://localhost:3000/login&response_type=code'
              }>
              <a
                className="pt-1"
                onClick={() => {
                  localStorage.setItem('prevUrl', page.asPath);
                }}>
                in
              </a>
            </Link>
          )}
          <span>
            {login ? (
              <div className="cursor-pointer">
                <Image
                  src={'/mainlogo2.png'}
                  alt="userimage"
                  width={48}
                  height={48}
                />
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => {
                  alert('로그인 후 이용 가능합니다.');
                }}>
                <Image
                  src={'/mainlogo2.png'}
                  alt="userimage"
                  width={48}
                  height={48}
                />
              </div>
            )}
          </span>
        </div>
      </Paper>
    </div>
  );
};

export default Navbar;
