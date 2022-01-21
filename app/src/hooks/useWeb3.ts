import { useCallback, useEffect, useState } from "react";

export const useWeb3 = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found");

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with public key:",
            response.publicKey.toString()
          );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a phantom wallet.");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const connect = useCallback(async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connected with public key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  }, []);

  return { walletAddress, connect };
};
