import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../RouteDefinitions'
import { Input, Form, Label, Button } from '@harnessio/canary'
import logo from '../../assets/images/logo.png'

const SignIn: React.FC = () => {
  return (
    <div className="flex bg-black items-center justify-center min-h-screen ">
      <div class="text-center lg:min-w-[340px] pb-32 ">
        {/* <InputCanary type="email" name="email" /> */}
        <img src={logo} alt="Logo" className="mx-auto  w-24 h-24" /> {/* Adjust the classes as needed */}
        <h1 className="font-semibold font-cal-sans text-3xl  text-gradient leading-[40.5px] tracking-[0.01em] text-white text-center">
          Sign in to Gitness
        </h1>
        <Form>
          <div className="flex-col leading-[40.5px] pt-3 text-left">
            <Label className="font-light font-inter text-13px  text-white ">Email</Label>
            <Input
              placeholder={'Enter your username'}
              className="border text-white text-opacity-40 border-white border-opacity-30 bg-white bg-opacity-10"
              type="email"
              name="email"
            />
          </div>
          <div className="flex-col leading-[40.5px] text-left">
            <Label className=" font-light font-inter text-13px text-white ">Password</Label>
            <Input
              placeholder={'Enter the password'}
              className="border text-white text-opacity-40 border-white border-opacity-30 bg-white bg-opacity-10"
              type="password"
              name="password"
            />
          </div>

          <div className="pt-4">
            <Button className="mt-4 w-full  rounded-2xl leading-[40.5px]" variant="secondary" type="submit">
              Sign In
            </Button>
          </div>
          <div className="flex-col pt-2 font-inter text-center">
            <Label className="text-white opacity-50 font-inter  font-light leading-[40.5px] text-center">
              Don't have an account?
            </Label>
            <Button variant="link" type="submit">
              <Link className=" font-normal text-white" to={routes.toSignUp()}>
                Sign Up
              </Link>
            </Button>
          </div>
        </Form>
      </div>
      <div className="absolute bottom-0 w-full text-center mt-32 mb-4 p-4 text-white">
        <Label className="font-inter text-13px font-light opacity-50">
          By joining, you agree to the
          <Link className="px-1 underline" href="#">
            Terms of Service
          </Link>
          and
          <Link className="px-1 underline" href="#">
            Privacy Policy
          </Link>
        </Label>
      </div>
    </div>
  )
}

export default SignIn
