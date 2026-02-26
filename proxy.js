import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function proxy(request) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  let role = user?.user_metadata?.role
  if (user && !role) {
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()
    
  role = profile?.role
}

  const url = request.nextUrl.clone()

  // 1. REVERSE PROTECTION: If logged in and trying to access Login page
  if (user && (url.pathname === '/' || url.pathname === '/login')) {
    // Redirect to their specific dashboard based on role
    if (role === 'tp_admin') url.pathname = '/dashboard/tp-admin'
    else if (role === 'teacher') url.pathname = '/dashboard/teacher'
    else if (role === 'student') url.pathname = '/dashboard/student'
    else url.pathname = '/dashboard'
    
    return NextResponse.redirect(url)
  }

  // 2. AUTH PROTECTION: If not logged in and trying to access Dashboard
  if (!user && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/login' // Or '/' depending on where your form is
    return NextResponse.redirect(url)
  }

  // 3. BASE DASHBOARD REDIRECT: If at exactly '/dashboard', push to role-specific subfolder
  if (user && url.pathname === '/dashboard') {
    if (role === 'tp_admin') url.pathname = '/dashboard/tp-admin'
    else if (role === 'teacher') url.pathname = '/dashboard/teacher'
    else if (role === 'student') url.pathname = '/dashboard/student'
    return NextResponse.redirect(url)
  }

  // 4. ROLE PROTECTION: Prevent users from accessing other roles' folders
  if (user) {
    if (url.pathname.startsWith('/dashboard/tp-admin') && role !== 'tp_admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (url.pathname.startsWith('/dashboard/teacher') && role !== 'teacher') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (url.pathname.startsWith('/dashboard/student') && role !== 'student') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  // 5. STRICT DASHBOARD VALIDATION
if (user && url.pathname.startsWith('/dashboard/')) {
  const allowedPaths = {
    tp_admin: '/dashboard/tp-admin',
    teacher: '/dashboard/teacher',
    student: '/dashboard/student',
  }

  const userBasePath = allowedPaths[role]

  // If path does NOT start with their allowed base path
  if (!url.pathname.startsWith(userBasePath)) {
    return NextResponse.redirect(new URL(userBasePath, request.url))
  }
}

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/', '/login'],
}