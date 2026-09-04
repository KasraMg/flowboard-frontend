import useUser, { useUpdateUser } from "@/src/hooks/useUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type SettingsFormValues = {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

const useSetting = () => {
  const { data } = useUser();

  const { mutate, isPending } = useUpdateUser();

  const user = data?.data?.user;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, errors },
  } = useForm<SettingsFormValues>({
    defaultValues: {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
    },
  });
  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name,
      email: user.email,
      currentPassword: "",
      newPassword: "",
    });
  }, [user, reset]);

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");

  const updateUserHandler = (values: SettingsFormValues) => {
    mutate(
      {
        name: values.name,
        email: values.email,
        currentPassword: values.currentPassword || undefined,
        newPassword: values.newPassword || undefined,
      },
      {
        onSuccess: () => {
          reset({
            ...values,
            currentPassword: "",
            newPassword: "",
          });
        },
      },
    );
  };

  return {
    user,
    isPending,
    errors,
    isDirty,
    updateUserHandler,
    handleSubmit,
    register,
    newPassword,
    currentPassword,
  };
};

export default useSetting;
