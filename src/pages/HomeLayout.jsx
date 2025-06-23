import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Loading from "../Components/Loading";

const HomeLayout = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  return (
    <>
      <Header />
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <section className="align-elements py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default HomeLayout;
