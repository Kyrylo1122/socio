import { useUserContext } from "src/hooks/useUserContext";

import PageMarkUp from "src/Components/PageMarkup";

const Home = () => {
  const { user } = useUserContext();

  return <PageMarkUp user={user} />;
};

export default Home;
