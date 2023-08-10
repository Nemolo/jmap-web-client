import { Client } from "jmap-client-ts";
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FetchTransport } from "jmap-client-ts/lib/utils/fetch-transport";
import { ISession } from "jmap-client-ts/lib/types";

export const jmapContext = createContext<{
  client?: Client;
  session?: ISession;
}>({});

export function JmapProvider({
  children,
  sessionUrl,
  accessToken,
}: PropsWithChildren<{ sessionUrl: string; accessToken: string }>) {
  const [session, setSession] = useState<ISession | undefined>();
  const client = useMemo(() => {
    const fetch = window.fetch.bind(window);
    return new Client({
      accessToken,
      sessionUrl,
      transport: new FetchTransport(fetch),
    });
  }, [sessionUrl, accessToken]);
  useEffect(() => {
    client?.fetchSession().then(() => setSession(client.getSession()));
  }, [client]);
  const jmapContextValue = {
    client,
    session,
  };
  return (
    <jmapContext.Provider value={jmapContextValue}>
      {children}
    </jmapContext.Provider>
  );
}
