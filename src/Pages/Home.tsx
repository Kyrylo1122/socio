import { useUserContext } from "src/hooks/useUserContext";

import PageMarkUp from "src/Components/PageMarkup";

const Home = () => {
  const { user, friends } = useUserContext();

  return <PageMarkUp friends={friends} user={user} />;
};

export default Home;
