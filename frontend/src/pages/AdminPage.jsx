import ModifyClassesSection from "../components/admin/ModifyCLassesSection";
import ModifyGymSection from "../components/admin/ModifyGymSection";
import ModifyHomeSection from "../components/admin/ModifyHomeSection";
import ModifySubscriptionsSection from "../components/admin/ModifySubscriptionsSection";
import ModifyTrainersSection from "../components/admin/ModifyTrainersSection";

function AdminPage() {
  return (
    <>
      <ModifyHomeSection />
      <ModifyGymSection />
      <ModifyClassesSection />
      <ModifySubscriptionsSection />
      <ModifyTrainersSection />
    </>
  );
}

export default AdminPage;
