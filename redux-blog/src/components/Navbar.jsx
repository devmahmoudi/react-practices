import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section>
      <nav className="navbar padding-bottom">
        <h1 className="alternate-color">وبلاگ ریداکسی من</h1>
        <div>
          <Link to={"/blogs"} style={{margin: 10}}>پست ها</Link>
          <Link to={"/users"} style={{margin: 10}}>نویسندگان</Link>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
