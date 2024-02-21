import { ContactsList } from "src/Components/Contacts/ContactsList";
import { useUserContext } from "src/hooks/useUserContext";

export default function Contacts() {
  const { friends } = useUserContext();
  return <ContactsList friends={friends} />;
}
