import { useAtom } from "jotai";
import { currentUserAtom } from "../../services/Atoms/currentUser";
import ClassicDashboard from "./ClassicDashboard";
import GestionPraticienTitulaire from "./GestionPraticienTitulaire";

const IndexDashboard = () => {
  const [currentUser] = useAtom(currentUserAtom);
  const currentUserStatus = JSON.parse(currentUser).status;

  if (currentUserStatus === "holder")
    return (
      <>
        <GestionPraticienTitulaire />
      </>
    );

  return (
    <>
      <ClassicDashboard />
    </>
  );
};

export default IndexDashboard;
