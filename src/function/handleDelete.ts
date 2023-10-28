import { notifyError, notifySucess } from "./toastify";

export default function handleDelete(
  id: string,
  open: boolean,
  setOpen: any,
  deleteCompany: any
) {
  try {
    async function deleteData() {
      deleteCompany(id);
      setOpen(!open);
      return notifySucess("Cliente deletado com sucesso!");
    }
    deleteData();
    const deleteModal = document.querySelector(
      "#deleteModal"
    ) as HTMLDialogElement;
    deleteModal.close();
    const dialog = document.querySelector("#dialog") as HTMLDialogElement;
    dialog.close();
  } catch (error: any) {
    notifyError(error.message);
  }
}
