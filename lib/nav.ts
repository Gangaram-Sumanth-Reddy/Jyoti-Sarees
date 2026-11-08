/** Active nav match for section routes (e.g. /sarees and /sarees/[slug]). */
export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
