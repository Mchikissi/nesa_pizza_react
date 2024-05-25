import { Link, Navigate } from "react-router-dom";


export default function LinkButton({to, children}) {
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline'

  if(to === "-1"){
    return <button onClick={() => Navigate(-1)} className={className}>{children}</button>
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
