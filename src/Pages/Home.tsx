import { useUserContext } from "src/hooks/useUserContext";

import PageMarkUp from "src/Components/PageMarkup";
import { useEffect, useState } from "react";
import { getAllUsers } from "src/firebase/api-firebase";

const Home = () => {
  // const [allUsers, setAllUsers] = useState();
  const getUsers = async () => {
    try {
      await getAllUsers();
    } catch (error) {
      console.error(error);
    }
  };
  getUsers();
  useEffect(() => {
    // setAllUsers(getAllUsers());
  }, []);
  //   const { user } = useUserContext();
  return <>Home</>;

  //   return <PageMarkUp user={user} />;
};

export default Home;
