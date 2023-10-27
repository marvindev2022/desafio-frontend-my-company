import searchImg from "../assets/search.svg";
import list from "../assets/clipboard-list.svg";
import React, { useState, useEffect } from "react";
import api from "../services/instance";
export default function MainContainer() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    async function loadCompanies() {
      const { data } = await api.get("/clients");

      setCompanies(data);
    }
    loadCompanies();
  }, []);
  function handleClick() {
    document.querySelector("dialog")?.showModal();
  }
  return (
    <main className="w-screen h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center justify-center relative">
        <input
          type="search"
          placeholder="Buscar empresa..."
          className="w-1/2 h-10 rounded-md border-2 border-gray-300 px-4"
        />
        <img
          src={searchImg}
          alt="Buscar empresas"
          className="absolute right-0 top-0 mt-3 mr-3"
        />
      </div>
      <section className="flex flex-col items-center justify-center">
        <span className="flex flex-col items-center justify-center rounded-xl">
          <img
            src={list}
            alt="adicionar empresa"
            className="w-32 h-32 rounded-full"
          />
          Adicionar empresa
        </span>
        <span
          onClick={handleClick}
          className="flex flex-col items-center justify-center rounded-xl"
        >
          <img
            src={list}
            alt="adicionar empresa"
            className="w-32 h-32 rounded-full"
          />
          <h2>Nome da empresa</h2>
          <p>CNPJ: 121351335153</p>
        </span>
      </section>
    </main>
  );
}
