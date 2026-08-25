import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

export function middleware() {
  return NextResponse.next();
}
