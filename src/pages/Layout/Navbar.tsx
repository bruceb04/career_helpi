import { Link } from "react-router-dom";

export function Navbar(){
    return (
        <>
        <Link to="/"><button>Home</button></Link>
        <Link to="/basicquestions"><button>Basic Quiz</button></Link>
        <Link to="/detailedquestions"><button>Detailed Quiz</button></Link>
        </>
    )
}