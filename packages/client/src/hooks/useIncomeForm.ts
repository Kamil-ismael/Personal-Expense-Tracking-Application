import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { incomeApi } from "../lib/api/income";

interface IncomeFormData {
  amount: number;
  date: string;
  source: string;
  description: string;
}

export function useIncomeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IncomeFormData>();

  useEffect(() => {
    if (isEdit) {
      loadIncome();
    }
  }, [isEdit, id]);

  const loadIncome = async () => {
    if (!id) return;

    try {
      const income = await incomeApi.getIncome(id);
      setValue("amount", income.amount);
      setValue("date", income.date);
      setValue("source", income.source);
      setValue("description", income.description);
    } catch (error) {
      console.error("Failed to load income:", error);
      setError("Failed to load income");
    }
  };

  const onSubmit = async (data: IncomeFormData) => {
    setLoading(true);
    setError("");

    try {
      if (isEdit && id) {
        await incomeApi.updateIncome(id, data);
      } else {
        await incomeApi.createIncome(data);
      }
      navigate("/incomes");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save income"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    navigate("/incomes");
  };
  const handleGoBack = () => {
    navigate("/incomes");
  };

  return {
    isEdit,
    loading,
    error,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleCancel,
    handleGoBack,
  };
}
