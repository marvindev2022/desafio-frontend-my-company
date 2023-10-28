export default function handleClick(setType: any) {
  const dialog = document.querySelector("dialog");
  if (dialog) {
    dialog.showModal();
    setType("add");
  }
}
