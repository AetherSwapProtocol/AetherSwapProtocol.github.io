import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction } from '@solana/web3.js';
export default function Swap() {
  const { publicKey, sendTransaction } = useWallet();
  const handleSwap = async () => {
    if (!publicKey) return;
    const connection = new Connection('https://api.devnet.solana.com');
    const transaction = new Transaction();
    const signature = await sendTransaction(transaction, connection);
    console.log("Transaction sent:", signature);
  };
  return (<button onClick={handleSwap}>Swap</button>);
}