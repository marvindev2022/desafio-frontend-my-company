import { useState } from "react";
import { notifyError } from "../utils/toastify";
import { fieldMessages } from "../function/fildsMessages";
import deleteImg from "../assets/Vector.svg";
import closeImg from "../assets/close.svg";
interface FieldMessages {
  name: string;
  email: string;
  cnpj: string;
}

export default function Modal() {
  const [form, setForm] = useState({
    name: "",
    cnpj: "",
    email: "",
  });
  function handleSubmit(e: any) {
    e.preventDefault();

    for (const field in fieldMessages) {
      if (!form[field as keyof FieldMessages]) {
        return notifyError(fieldMessages[field as keyof FieldMessages]);
      }
    }
  }
  function handleCloseDialog() {
    document.querySelector("dialog")?.close();
  }
  return (
    <dialog className="min-w-[100vw] min-h-[100vh] bg-black bg-opacity-50 relative ">
      <div className="w-[19.9375rem] h-[20.625rem] bg-white rounded-xl flex flex-col justify-center items-center absolute left-[40%] top-[40%] ">
        <span className="flex justify-around items-center w-full border-b">
          <h1 className="text-2xl font-jost text-[#0000004D]">
            Cadastrar Empresa
          </h1>
          <img
            className="cursor-pointer"
            onClick={handleCloseDialog}
            src={closeImg}
            alt="Fechar modal"
          />
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <label htmlFor="name">Nome da empresa</label>
          <input
            name="name"
            type="text"
            className="w-1/2 h-10 rounded-md border-2 border-gray-300 px-4"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <label htmlFor="Cnpj">Cnpj</label>
          <input
            name="cnpj"
            type="text"
            className="w-1/2 h-10 rounded-md border-2 border-gray-300 px-4"
            onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
          />
          <label htmlFor="E-mail">E-mail</label>
          <input
            name="email"
            type="text"
            className="w-1/2 h-10 rounded-md border-2 border-gray-300 px-4"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label className="flex gap-5">
            <img src={deleteImg} alt="Deletar item!" />
            <button
              type="reset"
              className="w-1/2 h-10 rounded-md border-2 border-gray-300 px-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-1/2 h-10 rounded-md border-2 border-gray-300 px-4"
            >
              Cadastrar
            </button>
          </label>
        </form>
      </div>
    </dialog>
  );
}
