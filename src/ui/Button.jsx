import { Link } from "react-router-dom"


export default function Button({disabled, type, to, onClick, children}) {

  const base = "inline-block text-sm bg-yellow-400 font-semibold tracking-widest rounded-full uppercase text-stone-800 hover:bg-yellow-300 duration-300 transition-colors focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    round: `${base} px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
    secondary: "inline-block text-sm px-4 py-2.5 md:px-6 md:py-3.5 border-2 border-stone-400 font-semibold tracking-widest rounded-full uppercase text-stone-800 hover:bg-stone-300 duration-300 transition-colors hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed"
  }
  if(to){
    return <Link to={to} className={styles[type]}>{children}</Link>
  }

  if(onClick){
    return     <button disabled={disabled} className={styles[type]} onClick={onClick}>
    {children}
  </button>
  }
  return (
    <button disabled={disabled} className={styles[type]} >
      {children}
    </button>
  )
}
