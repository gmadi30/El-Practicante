import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  // Definimos un mensaje genérico para errores desconocidos
  let errorMessage = "Lo sentimos, ha ocurripo un error inesperado.";
  // Verificamos si hay un error específico para mostrar detalles
  if (error?.statusText || error?.message) {
    errorMessage = error?.statusText || error?.message;
  }

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-full"
    >
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="text-lg text-center text-gray-700 mt-4">{errorMessage}</p>
    </div>
  );
}
