import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useListMailbox } from "../../hooks/jmap.hook";
import { Link, useParams } from "react-router-dom";

export function MailboxesSidebar() {
  const { accountId } = useParams();
  const { data, isError, isLoading } = useListMailbox(accountId!);
  return (
    <Drawer open={true} variant="persistent">
      <List>
        {data?.list.map((mailbox) => (
          <ListItem key={mailbox.id}>
            <ListItemButton>
              <Link to={"/" + accountId + "/" + mailbox.id}>
                <ListItemText>{mailbox.name}</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
