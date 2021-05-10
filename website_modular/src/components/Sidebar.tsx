import React from 'react';
import { Link } from '../components/Link';

/**
 * Represents a single Sidebar Item.
 *
 * [Title, URL | ISidebarItem, Icon]
 */
export type ISidebarItem = [string, string | ISidebar, string | undefined];

export type ISidebar = ISidebarItem[];

export type ISidebarProps = {
  sidebar: ISidebar;
};

export function Sidebar({ sidebar }: ISidebarProps) {
  return (
    <div className="relative">
      <div className="sticky top-16">
        <div className="overflow-y-auto pb-16 pt-4" style={{ height: 'calc(100vh - 4rem)' }}>
          <ul className="pt-4 pl-1">
            <Title
              href="/"
              title="Documentation"
              gradient="from-green-400 to-blue-500"
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
            <Title
              href="/reference"
              title="Reference API"
              gradient="from-yellow-500 to-yellow-600"
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
              }
            />
            <Title
              href="/screencasts"
              title="Screencasts"
              gradient="from-yellow-500 via-pink-400 to-pink-800"
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              }
            />
          </ul>
          <SidebarItems sidebar={sidebar} />
        </div>
      </div>
    </div>
  );
}

type ITitleProps = {
  title: string;
  href: string;
  svg: React.ReactElement;
  gradient: string;
};

function Title(props: ITitleProps) {
  return (
    <li className="mb-3">
      <Link href={props.href}>
        <a className="flex items-center group">
          <div
            className={
              'w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br ' +
              props.gradient
            }
          >
            {props.svg}
          </div>

          <div className="font-semibold pl-2 group-hover:opacity-75 transition-opacity">
            {props.title}
          </div>
        </a>
      </Link>
    </li>
  );
}

function SidebarItems({ sidebar }: ISidebarProps) {
  return (
    <ul className="text-sm font-medium">
      {sidebar.map(([title, urlOrNested, icon]) => {
        if (typeof urlOrNested === 'string') {
          return (
            <li key={title}>
              <Link href={urlOrNested}>
                <a className="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500">
                  {title}
                </a>
              </Link>
            </li>
          );
        }

        return (
          <li key={title}>
            <div className="px-3 pt-4 font-bold flex items-center">
              {!!icon && <img src={icon} alt="" className="h-5 pr-2" />}
              {title}
            </div>
            <div className="pl-3 pt-2">
              <SidebarItems sidebar={urlOrNested} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}