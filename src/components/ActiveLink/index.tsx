import { ReactElement, cloneElement } from "react";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
 
interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}
 
export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const asPath = usePathname();
 
  const className = asPath === rest.href ? activeClassName : "";
  //Se a rota/pagina que estamos acessando for igual ao link que ele clicou entao ativamos o classname
 
  return (
    <Link legacyBehavior {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
}
 