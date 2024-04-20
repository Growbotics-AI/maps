import { LucideProps } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

type LinkAnchorIntersection = LinkProps & HTMLAnchorElement;

interface NavMenuItemProps {
  href: LinkAnchorIntersection['href'];
  external?: boolean;
  label: string;
  icon: LucideProps;
}

const NavMenuItem = ({ icon, href, external = false, label }: NavMenuItemProps) => {
  const router = useRouter();

  return (
    <li className={`px-4 py-2 text-lg ${router.pathname === (href || '/') ? 'underline underline-offset-1' : ''}`}>
      <Link href={href} target={external ? '_blank' : '_self'} className="flex items-center gap-2 hover:text-blue-500">
        <>
          {icon}
          {label}
        </>
      </Link>
    </li>
  );
};

export default NavMenuItem;