import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Company,
  CompanySortBy,
  Degree,
  RegisterFormValues as FormValues,
  School,
} from "../../../types/types";
import Loading from "../../../components/ui/shared/Loading";
import SuccesfulResponse from "../../../components/ui/shared/SuccesfulResponse";
import {
  getAllCompaniesSortedByFilter,
  getAllDegrees,
  getAllSchools,
  postStudent,
} from "../../../api/api";
import validatePassword, { FetchError } from "../../../utils/errorUtils/errors";
import InputField from "./InputField";
import SelectField from "./SelectField";
import PasswordField from "./PasswordField";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { watch, control, register, handleSubmit, formState, setError } =
    useForm<FormValues>();
  const { errors } = formState;
  const [isStudentCreated, setIsStudentCreated] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorThrown, setErrorThrown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const password = watch("password");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsData = await getAllSchools();
        setSchools(schoolsData.schools);

        const companiesData = await getAllCompaniesSortedByFilter(
          CompanySortBy.ALPHABETICALLY
        );
        setCompanies(companiesData.companies);

        const degreesData = await getAllDegrees();
        setDegrees(degreesData.degrees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const addStudent = async (data: FormValues) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("birthday", data.birthday);
      formData.append("city", "Madrid");
      formData.append("autonomousCommunity", "Comunidad de Madrid");
      formData.append("zipcode", "28033");
      // formData.append("dni", data.dni);
      formData.append("mobile", data.mobile);
      formData.append("schoolId", data.schoolId);
      formData.append("companyId", data.companyId);
      formData.append("degreeId", data.degreeId);
      if (data.profilePicture[0]) {
        formData.append("profilePicture", data.profilePicture[0]);
      }
      await postStudent(formData);
      setIsStudentCreated(true);
      setLoading(false);
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    } catch (error) {
      setLoading(false);
      if (error instanceof FetchError) {
        if (error.status === 409) {
          if (error.errorResponseCode === 102) {
            setError("email", { type: "custom", message: error.message });
          }
          if (error.errorResponseCode === 103) {
            setError("mobile", { type: "custom", message: error.message });
          }
        }
      }
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => addStudent(data);

  if (loading) return <Loading />;

  if (isStudentCreated)
    return <SuccesfulResponse message="¡Registro completado con éxito!" />;

  return (
    <div className="mx-5 my-10 md:container md:mx-auto md:w-fit">
      <header className="bg-primary mx-3 my-24 tracking-[0.5rem]">
        <h1 className="text-5xl py-4 font-bold text-center">REGISTRO</h1>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-4 border-primary rounded-xl font-body flex flex-col mt-3 mb-10 px-20 space-y-7 py-10"
        noValidate
      >
        <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-2">
          <InputField
            label="Nombre"
            id="name"
            register={register}
            errors={errors}
            validation={{
              required: "Este campo es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 20,
                message: "El nombre no puede exceder los 20 caracteres",
              },
            }}
          />
          <InputField
            label="Apellido"
            id="lastName"
            register={register}
            errors={errors}
            validation={{
              required: "Este campo es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 20,
                message: "El nombre no puede exceder los 20 caracteres",
              },
            }}
          />
        </div>
        <InputField
          label="Email"
          id="email"
          register={register}
          errors={errors}
          validation={{
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Introduce un email valido",
            },
          }}
        />
        <PasswordField
          label="Contraseña"
          id="password"
          register={register}
          errors={errors}
          showPassword={showPassword}
          togglePassword={togglePassword}
          validation={{
            required: "Este campo es obligatorio",
            validate: (value) => validatePassword(value, setPasswordIsValid),
          }}
        />
        <PasswordField
          label="Confirmar contraseña"
          id="confirmPassword"
          register={register}
          errors={errors}
          showPassword={showPassword}
          togglePassword={togglePassword}
          validation={{
            required: "Este campo es obligatorio",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          }}
        />
        <InputField
          label="Fecha de nacimiento"
          id="birthday"
          register={register}
          errors={errors}
          type="date"
          validation={{
            required: "Este campo es obligatorio",
            validate: (value) => {
              const birthdayDate = new Date(value);
              const currentDate = new Date();
              const minimumAgeDate = new Date(
                currentDate.getFullYear() - 18,
                currentDate.getMonth(),
                currentDate.getDate()
              );
              return (
                birthdayDate < minimumAgeDate ||
                "Debes tener al menos 18 años para registrarte"
              );
            },
          }}
        />
        <InputField
          label="Foto de perfil"
          id="profilePicture"
          register={register}
          errors={errors}
          type="file"
        />
        <InputField
          label="Móvil"
          id="mobile"
          register={register}
          errors={errors}
          type="tel"
          validation={{
            required: "Este campo es obligatorio",
            pattern: {
              value: /^(\+\d{1,3})?\d{9,13}$/,
              message: "Por favor, introduce un número de teléfono válido",
            },
          }}
        />
        <SelectField
          label="Centro de educación"
          id="schoolId"
          register={register}
          errors={errors}
          options={schools.map((school) => ({
            value: school.id,
            label: school.name,
          }))}
        />
        <SelectField
          label="Grado profesional"
          id="degreeId"
          register={register}
          errors={errors}
          options={degrees.map((degree) => ({
            value: degree.id,
            label: degree.name,
          }))}
        />
        <SelectField
          label="Empresa"
          id="companyId"
          register={register}
          errors={errors}
          options={companies.map((company) => ({
            value: company.companyId,
            label: company.companyName,
          }))}
        />
        {errorThrown && (
          <p className="font-bold text-red">
            {" "}
            ❌ ¡Ha ocurrido un error revisa el formulario!
          </p>
        )}
        <button
          type="submit"
          className="md:text-xl rounded border-cyan-600 bg-secondary-100 text-white  py-2 font-bold uppercase tracking-[0.3rem] my-5 hover:bg-secondary-200"
        >
          Crear cuenta
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default RegisterForm;
