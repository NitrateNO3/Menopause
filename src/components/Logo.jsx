import { Link } from 'react-router-dom'
import Brandmark from './Brandmark'

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label="Menopause India, home">
      <Brandmark className="logo__mark" />
      <span className="logo__text" aria-hidden="true">
        <span className="logo__top">Menopause</span>
        <span className="logo__bottom">India</span>
      </span>
    </Link>
  )
}
