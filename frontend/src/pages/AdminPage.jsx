import ModifyClassesSection from "../components/admin/ModifyCLassesSection";
import ModifyGymSection from "../components/admin/ModifyGymSection";
import ModifyHomeSection from "../components/admin/ModifyHomeSection";
import ModifyTrainersSection from "../components/admin/ModifyTrainersSection";

function AdminPage() {
  return (
    <>
      <ModifyHomeSection />
      <ModifyGymSection />
      <ModifyClassesSection />
      <ModifyTrainersSection />
    </>
  );
}

export default AdminPage;
