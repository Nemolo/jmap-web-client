import { useContext } from "react";
import { jmapContext } from "../../contexts/jmap.context";
import { MailboxesSidebar } from "../widgets/MailboxesSidebar";
import { useParams } from "react-router-dom";
import { useListEmail } from "../../hooks/jmap.hook";
import { List, ListItem, ListItemText } from "@mui/material";

export function Mailbox() {
  const { accountId, mailboxId } = useParams();
  const { data } = useListEmail(accountId!, mailboxId!);
  return (
    <div>
      <MailboxesSidebar></MailboxesSidebar>
      <List>
        {data &&
          data.ids.map((one) => (
            <ListItem key={one}>
              <ListItemText>{one}</ListItemText>
            </ListItem>
          ))}
      </List>
    </div>
  );
}
