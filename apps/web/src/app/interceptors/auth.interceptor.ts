import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');//todo: muy especifico para el nivel de abstraccion q se usa

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    })
  }

  return next(req);
};
