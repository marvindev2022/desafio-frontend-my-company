export default function formatCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, "");

  cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

  return `CNPJ:${cnpj}`;
}
