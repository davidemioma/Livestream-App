import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { createViewerToken } from "@/lib/actions/token";

const useViewerToken = (hostIdentity: string) => {
  const [name, setName] = useState("");

  const [token, setToken] = useState("");

  const [identity, setIdentity] = useState("");

  const creteToken = async () => {
    try {
      const token = await createViewerToken(hostIdentity);

      setToken(token);

      const jwtData = jwtDecode(token) as JwtPayload & {
        name: string;
        sub: string;
      };

      setName(jwtData?.name || "");

      setIdentity(jwtData?.sub || "");
    } catch (err) {
      throw new Error("Something went wrong");
    }
  };

  useEffect(() => {
    creteToken();
  }, [hostIdentity]);

  return { token, identity, name };
};

export default useViewerToken;
