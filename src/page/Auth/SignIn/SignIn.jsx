import signinImage from "/public/Auth/login.png";
import authLogo from "../../../assets/auth/auth-logo.png";
import logoimage from '/public/logo/Logo-Orange.png';

import { Link, useNavigate } from "react-router-dom";
import { Form, Checkbox } from "antd";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loggedUser } from "../../../redux/features/auth/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (values) => {
    const { email, password } = values;
    const data = {
      email, password
    }
    try {
      const res = await login(data).unwrap();
      console.log(res);

      // navigate("/dashboard-home");

      if (res.error) {
        console.log(res.error.data.message);
        toast.error(res.error.data.message);
        console.log(res.error.data.message);
      }
      if (res) {
        dispatch(
          loggedUser({
            token: res?.accessToken
          })
        );
        localStorage.setItem("token", res?.accessToken);

        toast.success('Login Successfully');
        navigate("/");
      }

      // navigate("/");


    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
        <div className=" lg:w-1/2 lg:mx-auto mx-5 py-12 lg:py-0">
          <div className="mb-8">
            <h1 className="font-semibold text-3xl text-gray-800">
              Login Now
            </h1>
          </div>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
              ]}
            >
              <CustomInput
                type="email"
                className={"border border-[#fff080]"}
                icon={HiOutlineMail}
                placeholder={"Enter Email"}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <CustomInput
                type="password"
                className={"border border-[#fff080]"}
                icon={HiOutlineLockClosed}
                placeholder={"Enter password"}
                isPassword
              />
            </Form.Item>

            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/auth/forget-password" className={" underline"} >
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <button loading={isLoading} className="w-full bg-[#fff050] text-xl font-semibold text-[#1b2428]  rounded-md py-2" border={true}>
                Login
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="lg:flex hidden  items-center justify-end">
          <img className=" h-screen" src="/Auth/auth-banner.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;