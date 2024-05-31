<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$guards)
{
    foreach ($guards as $guard) {
        if (Auth::guard($guard)->check()) {
            // Si el usuario está autenticado, simplemente continuar con la solicitud
            return $next($request);
        }
    }

    // Si el usuario no está autenticado, no realizar ninguna redirección
    // simplemente continuar con la solicitud y dejar que el middleware 'auth:api' maneje la autenticación
    return $next($request);
}

}
