import { useContext } from "react";
import { jmapContext } from "../contexts/jmap.context";
import { useQuery } from "@tanstack/react-query";

export function useListMailbox(accountId: string) {
  const { client } = useContext(jmapContext);
  return useQuery({
    queryKey: ['mailboxes', accountId],
    queryFn: async () => {
      return await client!.mailbox_get({
        ids: null,
        accountId: accountId,
      });
    }
  })
}

export function useListEmail(accountId: string, mailboxId: string) {
  const { client } = useContext(jmapContext);
  return useQuery({
    queryKey: ['list-emails', accountId, mailboxId],
    queryFn: async () => {
      return await client!.email_query({
        filter: {
          inMailbox: mailboxId
        },
        accountId: accountId,
      });
    }
  })
}