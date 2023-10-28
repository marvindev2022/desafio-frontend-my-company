import { useEffect, useState } from "react";
import searchImg from "../assets/search.svg";
import list from "../assets/clipboard-list.svg";
import handleClick from "../function/handleClick";
import formatCNPJ from "../function/formatCNPJ";
import Modal from "./modal";
import { useCompanyContext } from "../context";

interface Company {
  id?: string;
  name: string;
  cnpj: string;
  email: string;
}
const initialForm: Company = {
  name: "",
  cnpj: "",
  email: "",
};
export default function MainContainer() {
  const { companies, render, setRender, setForm } = useCompanyContext();
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState("add");
  const [company, setCompany] = useState({} as Company);

  const filteredCompanies = companies.filter((company) => {
    const searchLower = search.toLowerCase();
    return (
      company?.name.toLowerCase().includes(searchLower) ||
      company?.email.toLowerCase().includes(searchLower) ||
      company?.cnpj.toLowerCase().includes(searchLower)
    );
  });
  useEffect(() => {}, [render, setRender]);
  return (
    <main className="w-full h-full flex flex-col p-8">
      <Modal company={company} type={type} />

      <section className="flex flex-col items-end justify-center relative">
        <input
          type="search"
          placeholder="Buscar empresa..."
          className="w-72 h-7 rounded-md border-2 border-gray-300 px-4 top-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={searchImg}
          alt="Buscar empresas"
          className="absolute right-0 top-[-0.3125rem] mt-3 mr-3 z-[99999]"
        />
      </section>

      <section className="w-full h-full flex flex-col p-8 gap-5">
        <article
          onClick={() => {
            handleClick(setType);
            setForm(initialForm);
          }}
          className="w-full h-14 flex justify-center items-center text-center rounded-tl-[35px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[35px] border p-2 gap-5 font-jost text-[.875rem] font-medium text-[#969696] relative"
        >
          <span className="w-10 h-10 border-gray-700 border-[.105rem] rounded-[50%] flex items-center justify-center absolute left-2 ">
            <img
              src={list}
              alt="adicionar empresa"
              className="w-5 h-5 rounded-[50%] "
            />
          </span>
          Adicionar Empresa
        </article>
        <br />

        <article className="w-full  flex flex-col max-h-[80%]  justify-aroitems-centerund overflow-y-auto overflow-x-hidden gap-2 ">
          {filteredCompanies.map((company) => (
            <div
              onClick={() => {
                setCompany(company);
                setType("edit");
                (
                  document.querySelector("#dialog") as HTMLDialogElement
                )?.showModal();
              }}
              key={company?.id}
              className="w-full h-14 flex hover:translate-x-1 justify-start items-center bg-white text-center rounded-tl-[35px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[35px] border p-2 gap-5 "
            >
              <span className="w-10 h-10 min-w-[2.5rem] border-gray-700 border-[.105rem] rounded-[50%] flex items-center justify-center">
                <img
                  src={list}
                  alt="adicionar empresa"
                  className="w-5 h-5 rounded-[50%]"
                />
              </span>
              <div className=" flex flex-col items-start justify-center  overflow-hidden  ">
                <h2 className="flexfont-jost text-[1rem] text-[#616161] overflow-ellipsis overflow-hidden ">
                  {company?.name}
                </h2>
                <div className="grid grid-flow-col gap-5 overflow-auto items-center justify-around ">
                  <h3 className="flex w-full max-w-[9.375rem] font-jost text-[.8125rem] text-[#616161] overflow-hidden overflow-ellipsis ">
                    {formatCNPJ(company?.cnpj)}
                  </h3>
                  <span className="max-w-full flex gap-2 font-josEmail:t text-[.75rem] text-[#616161] overflow-ellipsis overflow-hidden ">
                    <p>Email:</p> <p>{company?.email}</p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
