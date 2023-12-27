import { useUserContext } from "src/hooks/useUserContext";

import PageMarkUp from "src/Components/PageMarkup";
import { useGetUsersById } from "src/lib/react-query";

const Home = () => {
  const { user } = useUserContext();

  const { data } = useGetUsersById(user?.uid);
  if (!data) return;
  return <PageMarkUp user={data} />;
};

export default Home;
