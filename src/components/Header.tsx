import logo from "../assets/logo.svg";
import profile from "../assets/profile.svg";
export default function Header() {
  return (
    <header
      className="w-full flex justify-between items-center h-16 p-8 bg-white text-black  shadow-sm font-jost fixed"
    >
      <img src={logo} alt="Logo" className="h-16 w-16" />
      <span className="flex justify-between items-center text-2xl ">
        <h1 className="font-jost text-[1rem] font-medium leading-14 tracking-wide text-right">Nome do Usuário</h1>
        <img className="w-28 h-8 object-fill" src={profile} alt="Imagem do usuário" />
      </span>
    </header>
  );
}
