import { useEffect } from "react";
import { notifyError, notifySucess } from "../function/toastify";
import { fieldMessages } from "../function/fildsMessages";
import closeImg from "../assets/close.svg";
import deleteImg from "../assets/Vector.svg";
import ModalDelete from "./modalDelete";
import { useCompanyContext } from "../context";

interface FieldMessages {
  name: string;
  email: string;
  cnpj: string;
}

export default function Modal({ company, type }: any) {
  const { form, setForm, updateCompany, createCompany } = useCompanyContext();
  useEffect(() => {
    if (type === "edit") {
      setForm(company);
    }
  }, [company]);
  function handleSubmit(e: any) {
    e.preventDefault();

    if (!form.name || !form.email || !form.cnpj) {
      return notifyError("Preencha todos os campos!");
    }
    for (const field in fieldMessages) {
      if (!form[field as keyof FieldMessages]) {
        return notifyError(fieldMessages[field as keyof FieldMessages]);
      }
    }

    async function fetchData() {
      try {
        if (type === "edit") {
          updateCompany(company.id, form);
        } else {
          createCompany(form);
        }
      } catch (err) {
        notifyError("Erro ao cadastrar empresa!");
      }
    }
    fetchData();

    document.querySelector("dialog")?.close();
    setForm({
      name: "",
      email: "",
      cnpj: "",
    });
    notifySucess(
      `Empresa ${type === "edit" ? "editado" : "cadastrado"} com sucesso!`
    );
  }

  function handleCloseDialog() {
    document.querySelector("dialog")?.close();
  }
  return (
    <dialog
      id="dialog"
      className="w-screen min-w-[100vw] min-h-[100vh] bg-black bg-opacity-50 "
    >
      <section className="flex justify-center items-center min-w-[100vw] min-h-[100vh]  bg-black bg-opacity-50  ">
        <div className="w-[19.9375rem] h-[20.625rem] bg-white rounded-xl flex flex-col justify-center items-center relative">
          <span
            className={`justify-around flex  items-center w-full  h-10 border-b py-3`}
          >
            <h1 className="text-2xl font-jost text-[#0000004D]">
              {type === "edit" ? "Editar Empresa" : "Cadastrar Empresa"}
            </h1>
            <img
              className="cursor-pointer"
              onClick={handleCloseDialog}
              src={closeImg}
              alt="Fechar modal"
            />
          </span>
          <ModalDelete id={company.id as string} />
          <form
            onSubmit={handleSubmit}
            className="w-full px-6 flex flex-col justify-center items-center"
          >
            <label
              className="text-start w-full font-robot mt-4 text-[#630A37] text-[.75rem]"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              name="name"
              type="text"
              className="w-[16.9375rem] h-[2.25rem] rounded-md border-2 border-gray-300 px-4"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
            <label
              className="text-start w-full font-robot mt-4 text-[#630A37] text-[.75rem]"
              htmlFor="Cnpj"
            >
              Cnpj
            </label>
            <input
              name="cnpj"
              type="text"
              className="w-[16.9375rem] h-[2.25rem] rounded-md border-2 border-gray-300 px-4"
              value={form.cnpj}
              onChange={(e) =>
                setForm({
                  ...form,
                  cnpj: e.target.value,
                })
              }
            />
            <label
              className="text-start w-full font-robot mt-4 text-[#630A37] text-[12px]"
              htmlFor="E-mail"
            >
              E-mail
            </label>
            <input
              name="email"
              type="text"
              className="w-[16.9375rem] h-[2.25rem] rounded-md border-2 border-gray-300 px-4"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
            <div
              className={`text-start w-full font-robot text-[#630A37] text-[12px] flex my-6 ${
                type !== "edit" ? "justify-around" : "justify-between"
              } items-center`}
            >
              {type === "edit" && (
                <span className="flex justify-center items-center w-8 h-8 border-2 ">
                  <img
                    onClick={() => {
                      const deleteModal = document.querySelector(
                        "#deleteModal"
                      ) as HTMLDialogElement;
                      deleteModal?.showModal();
                      console.log(deleteModal);
                    }}
                    className="w-3 h-4 object-fill"
                    src={deleteImg}
                    alt="Deletar item!"
                  />
                </span>
              )}
              <button
                type="reset"
                className="w-[5.375rem] h-[2.25rem] rounded-md border-2 border-gray-300 px-4 text-[#C7C9CC] font-jost font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-[5.375rem] h-[2.25rem] rounded-md border-2 border-gray-300 px-4 bg-[#630A37] text-white font-jost font-bold"
              >
                {type === "edit" ? "Salvar" : "Cadastrar"}
              </button>
            </div>
          </form>{" "}
        </div>
      </section>
    </dialog>
  );
}
