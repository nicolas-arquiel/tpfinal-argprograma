import Link from 'next/link';
import NavLinks from './NavLinks';
import { Home } from 'react-feather';

export default function SideNav() {
  return (
    <div className=" px-2 flex h-100 flex-column  py-4 md-px-2 border-end">
      <Link
        className="nav-link text-secondary mb-3 flex h-20 items-end justify-start rounded-md bg-blue-600 px4 md-h-40"
        href="/"
      >
              <h4 className=" w-32  md-w-40">
              
          CLINICA
        </h4>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md-flex-col md:space-x-0 md-space-y-2">
        <NavLinks vertical/>
        <div className="hidden h-auto w-100 grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
