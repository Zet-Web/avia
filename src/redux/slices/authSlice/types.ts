export interface LoginForms {
  email: string
  password: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  keepLogged: boolean
}

export interface LoginPayload {
  username: string
  password: string
}

export enum AuthStatus {
  DEFAULT = 'Default',
  REQUESTED = 'Requested',
  ERROR = 'Error',
  SUCCESS = 'Success',
}

export enum SignUpStatus {
  DEFAULT = 'Default',
  REQUESTED = 'Requested',
  ERROR = 'Error',
  SUCCESS = 'Success',
  VERIFY = 'Verify',
  VERIFICATION = 'Verification',
}

export interface LoginRequest {
  type: 'auth/loginUserRequested'
  payload: LoginForms
}

export interface SignUpForm {
  name: string
  email: string
  password: string
  repeatPassword: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  keepLogged: boolean
}

export interface RegisterPayload {
  email: string
  first_name: string
  password: string
}

export interface RegisterRequested {
  type: 'auth/registerRequested'
  payload: SignUpForm
}

export interface RequestVerification {
  type: 'auth/requestVerification'
  payload: VerificationRequestBody
}

export interface VerificationRequestBody {
  email: string
  code: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  keepLogged?: boolean
}
