import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../services/instance";
import { notifyError } from "../function/toastify";

interface Company {
  id?: string;
  name: string;
  email: string;
  cnpj: string;
}

const initialForm: Company = {
  id: "",
  name: "",
  email: "",
  cnpj: "",
};

interface CompanyContextType {
  companies: Company[];
  loading: boolean;
  render: boolean;
  form: Company;
  setForm: React.Dispatch<React.SetStateAction<Company>>;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  createCompany: (newCompany: Company) => void;
  updateCompany: (companyId: string, updatedCompany: Company) => void;
  deleteCompany: (companyId: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompanyContext = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};

interface CompanyProviderProps {
  children: ReactNode;
}

export function CompanyProvider({
  children,
}: CompanyProviderProps): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const [form, setForm] = useState<Company>(initialForm);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await api.get<Company[]>("/clients");
      setCompanies(response.data);
    } catch (error) {
      notifyError("Erro ao carregar empresas!");
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (newCompany: Company) => {
    try {
      await api.post("/clients", newCompany);
      fetchCompanies();
      setRender(!render);
    } catch (error) {
      notifyError("Erro ao carregar empresas!");
    }
  };

  const updateCompany = async (companyId: string, updatedCompany: Company) => {
    try {
      await api.put(`/clients/${companyId}`, updatedCompany);
      fetchCompanies();
      setRender(!render);
    } catch (error) {
      notifyError("Erro ao carregar empresas!");
    }
  };

  const deleteCompany = async (companyId: string) => {
    try {
      await api.delete(`/clients/${companyId}`);
      fetchCompanies();
      setRender(!render);
      setForm(initialForm);
    } catch (error) {
      notifyError("Erro ao carregar empresas!");
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, [render, setRender]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        loading,
        render,
        form,
        setForm,
        createCompany,
        updateCompany,
        deleteCompany,
        setRender,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
