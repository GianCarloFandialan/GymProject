import ModifyClassesSection from "../components/admin/ModifyCLassesSection";
import ModifyGymSection from "../components/admin/ModifyGymSection";
import ModifyTrainersSection from "../components/admin/ModifyTrainersSection";

function AdminPage() {
  return (
    <>
      <ModifyClassesSection />
      <ModifyTrainersSection />
      <ModifyGymSection />
    </>
  );
}

export default AdminPage;
