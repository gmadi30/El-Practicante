import Header from "./components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentProfile } from "../../types/types";
import InternshipComponent from "./components/InternshipComponent";
import { getStudentById } from "../../api/api";
import { useAuth } from "../../components/context/AuthContext";
import Loading from "../../components/ui/shared/Loading";
import AddInternshipButton from "./components/AddInternshipButton";
import NotAuthenticatedMessage from "./components/NotAuthenticatedMessage";

export default function Profile() {
  const [student, setStudent] = useState<StudentProfile>({} as StudentProfile);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { authenticated, studentId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (params.studentId !== undefined) {
          const data = await getStudentById(params.studentId);
          setStudent(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.studentId]);

  const handleNewIntershipOnClick = () => {
    navigate(`/student/${params.studentId}/create-internship`, {
      state: { studentId: params.studentId },
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (authenticated && studentId.toString() == params.studentId) {
    return (
      <>
        <div className="font-body md:container md:mx-auto">
          <Header student={student} />
          <h1 className="text-xl font-bold  pb-1 py-1 mb-10 rounded indent-4 text-secondary-100 bg-primary uppercase ">
            Mis prácticas
          </h1>
          {student?.internships?.map((internship, index) => {
            return <InternshipComponent key={index} internship={internship} />;
          })}
          {student?.internships?.length === 0 && (
            <AddInternshipButton onClick={handleNewIntershipOnClick} />
          )}
        </div>
      </>
    );
  } else if (authenticated && studentId.toString() !== params.studentId) {
    console.log("Valor de authenticated no mi perfil: ", authenticated);

    return (
      <>
        <div className="font-body md:container md:mx-auto">
          <Header student={student} />
          {student?.internships?.map((internship, index) => {
            return <InternshipComponent key={index} internship={internship} />;
          })}
        </div>
      </>
    );
  } else {
    console.log("Valor de authenticated no Autenticado: ", authenticated);
    return (
      <>
        <div className="font-body md:container md:mx-auto ">
          <Header student={student} />
          <NotAuthenticatedMessage />
        </div>
      </>
    );
  }
}
