import { useEffect } from "react";

export const checkIfWalletIsConnected = async () => {
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
      }
    } else {
      alert("Solana object not found! Get a phantom wallet.");
    }
  } catch (err: any) {
    console.error(err);
  }
};

export const useWeb3 = () => {
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
};
