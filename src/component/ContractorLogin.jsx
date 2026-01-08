import CommonLogin from "./CommonLogin";

const ContractorLogin = () => {
  return (
    <CommonLogin
      role="Contractor"
      signupPath="/signup"
      forgotPath="/forgot"
    />
  );
};

export default ContractorLogin;
