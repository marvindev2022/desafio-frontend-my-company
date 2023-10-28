import { useCompanyContext } from "../context";
import handleDelete from "../function/handleDelete";

export default function ModalDelete({ id, open, setOpen }: any) {
  const { deleteCompany } = useCompanyContext();

  return (
    <dialog
      id="deleteModal"
      className="min-w-[100vw] min-h-[100vh] absolute top-0 right-0 bg-[#00000005]"
    >
      <div className=" flex justify-center items-center min-w-[100vw] min-h-[100vh]">
        <nav className="flex flex-col justify-between items-center p-5 gap-5 bg-white rounded-md border-2 border-[#630A37]">
          <h1 className="text-[#630A37] font-jost font-bold">
            Tem certeza que deseja excluir?
          </h1>
          <div className="flex  justify-between items-center p-5 gap-5">
            <button
              className="min-w-[6.25rem] border border-[#616161] p-2 rounded-md font-jost text-[#616161]"
              onClick={() => {
                const deleteModal = document.querySelector(
                  "#deleteModal"
                ) as HTMLDialogElement;
                deleteModal?.close();
              }}
            >
              Cancelar
            </button>
            <button
              className="min-w-[6.25rem] bg-[#630A37] p-2 rounded-md font-jost text-white"
              onClick={() => handleDelete(id, open, setOpen, deleteCompany)}
            >
              Deletar
            </button>
          </div>
        </nav>
      </div>
    </dialog>
  );
}
