import { useUserContext } from "src/hooks/useUserContext";

import PageMarkUp from "src/Components/PageMarkup";

// $collectionId
// :
// "653ec2f742926176e790"
// $createdAt
// :
// "2023-11-13T19:57:52.271+00:00"
// $databaseId
// :
// "653d5ca4d34be06380fa"
// $id
// :
// "65527fc041809b37c95e"
// $permissions
// :
// (3) ['read("user:6547d8b6e3a98e5cc79c")', 'update("user:6547d8b6e3a98e5cc79c")', 'delete("user:6547d8b6e3a98e5cc79c")']
// $updatedAt
// :
// "2023-11-13T19:57:52.271+00:00"
// caption
// :
// "All good, but not always"
// creator
// :
// {name: 'Pedro', accountId: '6547d8b6e3a98e5cc79c', email: 'ko@ma.com', bio: null, imageId: null, …}
// imageId
// :
// "65527fbfc16340f26b51"
// imageUrl
// :
// "https://cloud.appwrite.io/v1/storage/buckets/653ec1b13a369ef1507f/files/65527fbfc16340f26b51/preview?project=653d5c81e6f55aa196c8"
// likes
// :
// []
// location
// :
// "Ryga"
// save
// :
// []
// tags
// :
// (3) ['all', 'new', 'tags']

const Home = () => {
  const { user } = useUserContext();

  return <PageMarkUp user={user} />;
};

export default Home;
