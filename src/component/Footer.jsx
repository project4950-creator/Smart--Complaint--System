import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} Smart Waste Complaint & Collection Portal.&nbsp;&nbsp;
        <br></br>Developed by{" "}
        <a href="https://www.linkedin.com/in/meghraj-solanki-0003a639b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
          Meghraj
        </a>
        ,{" "}
        <a href="https://www.linkedin.com/in/mayur-chavda-367562367?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
          Mayur
        </a>
         &nbsp;&{" "}
        <a href="https://www.linkedin.com/in/kiran-n-thakor-2573323a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
          Kiran
        </a>
      </p>
    </footer>
  );
};

export default Footer;
