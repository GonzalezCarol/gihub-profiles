import './nav.css';

export interface NavProps{
  title:string
}

const NavComponent = (props: NavProps) => {
  const {title} = props;

  return(
  <nav
    className="nav"
  >
    {title}
  </nav>
  )
};

export default NavComponent;
