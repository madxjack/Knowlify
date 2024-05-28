import { Link, NavLink } from 'react-router-dom'
import { CircleUser, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/auth'
import { useEffect } from 'react'
import { User } from '@/interfaces/user'

export function Header() {
  const { user, setUser, logout } = useAuth()
  const pages = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Trueques',
      href: '/barters',
    },
    {
      title: 'Habilidades',
      href: '/skills',
    },
    {
      title: 'Transacciones',
      href: '/transactions',
    },
  ]

  const logOut = () => {
    localStorage.removeItem('user')
    logout()
  }

  useEffect(() => {
    if (!user) {
      const userData = localStorage.getItem('user')
      if (userData) {
        const parsedUser = JSON.parse(userData) as User
        setUser(parsedUser)
      }
    }
  }, [user, setUser])

  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 bg-background mx-auto px-10 lg:max-w-screen-xl'>
      <h1 className='flex-1 text-3xl font-bold tracking-tight text-foreground text-orange-600'>
        <Link to='/' className='block'>
          Knowlify
        </Link>
      </h1>
      {user && (
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-1 md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          {pages.map((page) => (
            <NavLink
              key={page.title}
              to={page.href}
              className={({ isActive }) =>
                `transition-colors hover:text-foreground ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`
              }>
              {page.title}
            </NavLink>
          ))}
        </nav>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            {pages.map((page) => (
              <NavLink
                key={page.title}
                to={page.href}
                className={({ isActive }) =>
                  `hover:text-foreground ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`
                }>
                {page.title}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        {!user && (
          <div>
            <Link to='/login'>
              <Button variant='link' size='sm' className='text-black underline'>
                No has iniciado sesión?
              </Button>
            </Link>
            <Link to='/register'>
              <Button variant='link' size='sm' className='text-black underline'>
                Regístrate
              </Button>
            </Link>
          </div>
        )}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                {user ? `Hola ${user.name}!` : 'No has iniciado sesión'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <Link to='/profile'>
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link onClick={logOut} to='/'>
                    <DropdownMenuItem>Salir</DropdownMenuItem>
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/login'>
                    <DropdownMenuItem>Iniciar sesión</DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
