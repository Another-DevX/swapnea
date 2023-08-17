
import { useEffect, useState } from "react";


export function useIsFuelConnected() {
  //@ts-expect-error
  const { fuel } = window;

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    async function handleConnection() {
      const isConnected = await fuel.isConnected();

      setIsConnected(isConnected);
    }

    if (fuel) {
      handleConnection();
    }

    /* eventConnection:start */

    fuel?.on(fuel.events.connection, handleConnection);

    return () => {
      fuel?.off(fuel.events.connection, handleConnection);
    };

    /* eventConnection:end */
  }, [fuel]);

  return [isConnected];
}
