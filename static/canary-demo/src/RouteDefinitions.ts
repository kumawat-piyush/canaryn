export interface MainRoutes {
  toSignIn: () => string
  toSignUp: () => string
}

export interface ComponentRoutes {}

export const routes: MainRoutes & ComponentRoutes = {
  toSignIn: (): string => '/signin',
  toSignUp: (): string => '/signup'
}
