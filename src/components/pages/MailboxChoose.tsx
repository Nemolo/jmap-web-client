import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useListMailbox } from "../../hooks/jmap.hook";

export function MailboxeChooser() {
  const { accountId } = useParams();
  const { data } = useListMailbox(accountId!);
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.list[0]?.id) {
      navigate(data?.list[0]?.id);
    }
  }, [data?.list[0]?.id]);

  return <p>Loading Mailboxes...</p>;
}
