import CommonLogin from "./CommonLogin";

const ManagerLogin = () => {
  return (
    <CommonLogin
      role="Manager"
      signupPath="/signup"
      forgotPath="/forgot"
    />
  );
};

export default ManagerLogin;
