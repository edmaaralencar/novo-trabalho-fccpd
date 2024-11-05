import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useUser } from '@/hooks/use-user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { LayoutDashboard, LogOut, ShoppingCart } from 'lucide-react'

type HeaderProps = {
  totalItems: number
}

export function Header({ totalItems }: HeaderProps) {
  const { userId, logout } = useUser()

  return (
    <header className="flex items-center justify-between px-8 py-3">
      <Link to="/" className="text-3xl font-bold">
        Logo
      </Link>

      <div className="flex items-center gap-4">
        {userId ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Minha conta</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/pedidos">
                      <LayoutDashboard />
                      <span>Pedidos</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/pagamento">
                      <ShoppingCart />
                      <span>Carrinho ({totalItems})</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button asChild>
            <Link to="/autenticacao/login">Entre agora</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
