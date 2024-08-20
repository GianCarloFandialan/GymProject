import Closer from "../components/footer/Closer";
import MyAccounFirstSection from "../components/myaccount/MyAccountFirstSection";
import MyAccountSecondSection from "../components/myaccount/MyAccountSecondSection";

function MyAccount() {
  return (
    <>
      <main className="-mb-20">
        <MyAccounFirstSection />
        <MyAccountSecondSection />
      </main>
      <Closer />
    </>
  );
}

export default MyAccount;
