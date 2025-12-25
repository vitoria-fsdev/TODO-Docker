// app/components/Navbar.tsx

"use client";

import Link from 'next/link';
import { NavLinks } from '../nav-links';
import { usePathname } from 'next/navigation';
import { Button } from '@mui/material';
import { logout } from '@/services/auth';

export default function Navbar() {
  const pathname = usePathname();

  const handleLogout = () => {
    logout().then(() => {
      window.location.href = '/';
    });
  }

  return (
    <nav className="flex gap-6">
      {NavLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        if (link.name === 'Sair') {
          return (
            <Button
              key={link.name}
              variant={isActive ? 'contained' : 'text'}
              startIcon={link.icon}
              color="primary"
              onClick={handleLogout}
            >
              {link.name}
            </Button>
          );
        }

        return (
          <Link key={link.name} href={link.href}>
            <Button
              variant={isActive ? 'contained' : 'text'}
              startIcon={Icon}
              color="primary"
            >
              {link.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}