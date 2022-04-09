import { useState, Dispatch, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { Link, useNavigate } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { register, success } from '../actions';
import { makeSelectLoading, makeSelectRegisterFail, makeSelectSuccess } from '../selectors';
import Carousel from "../../../Components/Carousel";
import Input from "../../../Components/Input";
import CustomButton from "../../../Components/Button";
import { UserType } from '../../../globalTypes';
import Spinner from '../../../Components/Spinner';


const SignUp: React.FC<SignUpProps> = ({ loading, registerFail, success, handleRegister, handleSuccess }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState<UserType>({ name: "", username: "", password: "" });
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const regExpPassword = new RegExp(
    // eslint-disable-next-line
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const userData = { ...user, [e.currentTarget.name]: e.currentTarget.value }
    setUser(userData);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmited(true);
    if (user.name && user.name.length > 4 && user.username && user.username.length > 5 && regExpPassword.test(user.password)) {
      handleRegister(user)
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/auth/login", { replace: true });
        handleSuccess()
      }, 1000)
    }
  })



  return (
    <>
      <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className='my-auto w-full hidden lg:block'>
          <Carousel />
        </div>
        <div className="mx-auto w-11/12">
          <br></br><br></br><br></br><br></br>
          <div className="">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600 mb-8">
                Or if you already have an account,{' '}
                <Link to="/auth/login" className="font-medium text-azul1 hover:text-azul2">login here</Link>
              </p>
            </div>
            <div className='text-errorColor text-sm flex justify-center'>
              {registerFail &&
                <div>{registerFail}</div>}
            </div>
            <div className='text-verde3 text-sm flex justify-center'>
              {success &&
                <div>{success}</div>}
            </div>
            <form className="space-y-6">
              <div className="rounded-md shadow-sm space-y-2">
                <div className="">
                  <label htmlFor="name" className="sr-only"> Name </label>
                  <Input name="name" type="text" className="focus:ring-azul1 focus:border-azul2 
                  focus:z-10 sm:text-sm rounded-lg max-w-md m-auto"
                    placeholder="Name" onChange={onChange}
                  />
                  <div className='text-errorColor text-sm text-center'>
                    {isSubmited && user.name && user.name.length <= 4 &&
                      'Name must have at least 5 characters'
                    }
                    {isSubmited && user.name === '' &&
                      'This input is required'
                    }
                  </div>
                </div>

                <div className="">
                  <label htmlFor="username" className="sr-only">Username</label>
                  <Input
                    name="username"
                    type="text"
                    className="focus:ring-azul1 focus:border-azul2 focus:z-10 sm:text-sm rounded-lg max-w-md m-auto"
                    placeholder="Username"
                    onChange={onChange}
                  />
                  <div className='text-errorColor text-sm text-center'>
                    {isSubmited && user.username && user.username.length <= 5 &&
                      'Username must have at least 6 characters'
                    }
                    {isSubmited && user.username === '' &&
                      'This input is required'
                    }
                  </div>

                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Input name="password" type="password" autoComplete="current-password"
                    placeholder="Password" className="rounded-lg max-w-md m-auto" onChange={onChange}
                  />
                  <div className='text-errorColor text-sm text-center'>
                    {isSubmited && user.password && !regExpPassword.test(user.password) &&
                      'Password must contain at least 8 characters, including minimum of 1 lower case letter [a-z] and. a minimum of 1 upper case letter [A-Z] and. a minimum of 1 numeric character [0-9] and minimun 1 special character'
                    }
                    {isSubmited && user.password === '' &&
                      'This input is required'
                    }
                  </div>
                </div>
              </div>
              <br></br>
              <div className="flex justify-center">
                <CustomButton type="submit" onClick={(e) => handleSubmit(e)}
                  className="text-gray-50 bg-azul4 hover:bg-verde1 max-w-sm 
                focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span className="absolute left-0 inset-y-0  pl-3">
                  </span>
                  Sign up
                </CustomButton>


              </div>


            </form>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    dispatch,
    handleRegister: (userData: UserType) => dispatch(register(userData)),
    handleSuccess: () => dispatch(success('')),
  };
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  registerFail: makeSelectRegisterFail(),
  success: makeSelectSuccess()
})


const connector = connect(mapStateToProps, mapDispatchToProps);

type SignUpProps = ConnectedProps<typeof connector>;

export default compose(connector)(SignUp)