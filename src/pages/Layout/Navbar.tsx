import { Link } from "react-router-dom";

export function Navbar(){
    return (
        <>
        <Link to="/"><button>Home</button></Link>
        <Link to="/basicquestions"><button>Basic Questions</button></Link>
        <Link to="/detailedquestions"><button>Detailed Questions</button></Link>
        <Link to= "/AboutUs"><button>About Us</button></Link>
        </>
    )
}