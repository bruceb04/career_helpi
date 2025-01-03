import { Button } from 'react-bootstrap';
import "../CSSFolder/Person.css";

type AboutLink = {site: string, url: string};
type PersonJ = {name: string, pronouns: string[], gradSem: string, schoolEmail: string, image: string, links: AboutLink[]};
type Props = {person: PersonJ};

export default function Person({person}: Props) {
  return (
    <div className='about-div'>
        <h2 className='h2'>{person.name}</h2>
        <h4>Graduating {person.gradSem}</h4>
        <img className="image-with-border" src={person.image} alt={`${person.name}`}/>
        <div className='links-container'>
        {person.links.map((link) => (
            <p>
                <a href={link.url}>{link.site}</a>
            </p>
            
        ))}
        </div>
        <Button className="button" onClick={(e) => {
            e.preventDefault();
            window.location.href=`mailto:${person.schoolEmail}`;
          }}>
            <text>Contact</text>
        </Button>
    </div>
  )
}