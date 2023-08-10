import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jmapContext } from "../../contexts/jmap.context";

export function AccountChoose() {
  const { session } = useContext(jmapContext);
  const navigate = useNavigate();
  if (!session?.accounts) {
    return <p>Loading accounts...</p>;
  }
  const accountNumber = Object.keys(session?.accounts).length;
  if (accountNumber === 0) {
    return <p>No accounts found</p>;
  }
  if (accountNumber === 1) {
    navigate("/" + Object.keys(session?.accounts)[0]);
  }

  return (
    <List>
      {Object.entries(session.accounts).map(([key, value]) => (
        <ListItem key={key}>
          <ListItemText>{value.name}</ListItemText>
          <ListItemButton>
            <Link to={key}></Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
