import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export const Header = () => {

  return (
      <div className="text-white fixed grid grid-cols-4 text-center font-ps z-10 top-0 right-0 left-0">
        <Link
          href="/"
        >
          <a className="pages">
          HOME
          </a>
        </Link>
        <Link
          href="/mint"
        >
          <a className="pages">
            MINT
          </a>
        </Link>
        <Link
          href="/gallery"
        >
          <a className="pages">
            GALLERY
          </a>
        </Link>
        <ConnectButton 
          accountStatus="address" 
          showBalance={false}
        />
      </div>
  )

};