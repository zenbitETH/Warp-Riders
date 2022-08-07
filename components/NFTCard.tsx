import { NFTPreview, MediaConfiguration } from "@zoralabs/nft-components";
import { Networks, Strategies } from "@zoralabs/nft-hooks"
import { CreateAsk } from "./Asks/CreateAsk";
import AskWrite_disclosure from "./Asks/AskWrite_disclosure";

const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
    Networks.MAINNET
)

const NFTCard = ({ nfts }) => {

    return (
        <>
            {
            nfts && nfts.length > 0
            ?
            nfts.map((nft, index) => {
                return (
                    <div key={nft.token.tokenId} className=" justify-center">
                        <MediaConfiguration
                        networkId="1"                        
                        strategy={zdkStrategyMainnet}
                        strings={{
                            CARD_OWNED_BY: "OWNED BY",
                            CARD_CREATED_BY: "MINTED BY",                           
                        }}                    
                        >
                        <NFTPreview
                            href={`https://zora.co/collections/0xcaa316D4831e5486f05fAD91D55910Bc6B369438/${nft.token.tokenId}`}
                            contract={nft.token.collectionAddress}
                            id={nft.token.tokenId}
                            showBids={false}
                            showPerpetual={false}                           
                        />
                        </MediaConfiguration>
                        <div className="text-white">
                            { nft.marketsSummary.length === 0 ? (
                            <div className="mb-5">
                                        
                            </div>
                            ) : ( 
                            <div className="mb-5"> 
                                <div>
                                    {"Listing Status: " + nft.marketsSummary[0].properties.v3AskStatus}
                                </div>                            
                                <div>
                                    {"Listing Price: " + nft.marketsSummary[0].properties.askPrice.nativePrice.decimal + " " + nft.marketsSummary[0].properties.askPrice.nativePrice.currency.name}
                                </div>
                                <div>
                                    {"Finders Fee: " + (nft.marketsSummary[0].properties.findersFeeBps / 100) + "%"}
                                </div>                                  
                            </div>
                            )}
                        </div>
                        
                    </div>
                )
            }
            ) : (
                <div>
                    {"::: NO RESULTS :::"}
                </div>
            )
            }
        </>
    )
}

export default NFTCard