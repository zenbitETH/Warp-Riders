import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import editionsABI from "@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json"
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'
import { useAppContext } from "../context/useAppContext"
import MintQuantity from '../components/MintQuantity'
import PostMintDialog from '../components/PostMintDialog'
import tumb from '../assets/test2.png'

import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
import { Networks, Strategies } from "@zoralabs/nft-hooks"


const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
    Networks.MAINNET
  )

const heavenly = "#40bedc00"

const Mint: NextPage = () => {

    const { mintQuantity, setMintQuantity } = useAppContext()

    // ZORA NFT Edition "purchase" Write
    const perMintPrice = 0.01
    const totalMintPrice = String(mintQuantity.queryValue * perMintPrice)
    const mintValue = BigNumber.from(ethers.utils.parseEther(totalMintPrice)).toString()
    console.log("mint VAlue", mintValue)

    


    const { data: totalSupplyData, isLoading, isSuccess, isFetching  } = useContractRead({
        addressOrName: "0xcaa316D4831e5486f05fAD91D55910Bc6B369438", // Sofja Collection
        contractInterface: editionsABI.abi,
        functionName: 'totalSupply',
        args: [],
        watch: true,
        onError(error) {
            console.log("error: ", error)
        },
        onSuccess(data) {
            console.log("success! --> ", totalSupplyData)
        }  
    })    

    const totalSupply = totalSupplyData ? totalSupplyData.toString() : "loading"

    

    // useContractWrite Mint Call
    const { data: mintData, isError: mintError, isLoading: mintLoading, isSuccess: mintSuccess, status: mintStatus, write: mintWrite  } = useContractWrite({
        addressOrName: "0xcaa316D4831e5486f05fAD91D55910Bc6B369438", // Sofja Collection
        contractInterface: editionsABI.abi,
        functionName: 'purchase',
        args: [
            mintQuantity.queryValue
        ],
        overrides: {
            value: mintValue
        },
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(cancelData, variables, context) {
            console.log("Success!", cancelData)
        },
    })
    
    // useWaitforTransaction
    const { data: mintWaitData, isError: mintWaitError, isLoading: mintWaitLoading } = useWaitForTransaction({
        hash:  mintData?.hash,
        onSuccess(holderMintWaitData) {
            console.log("txn complete: ", mintWaitData)
            console.log("txn hash: ", mintWaitData.transactionHash)
        }
    })        
    
    

    return (
        <div className='flex flex-col justify-center mt-20 h-screen min-h-screen'>
            <Head>
            <title>Warp Riders Collection</title>
            <meta name="description" content="NFTs collection to bridge IRL with the metaverse" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="w-full items-center justify-center  ">
                <div className="flex flex-col items-center">

               

                    <div className={`text-white `}>
                        <div className='md:w-1/2 mx-auto text-center font-lex font-light p-3'>
                        <div className="text-center text-col-300 font-ps text-7xl justify-center mt-28 md:mt-0" >
                                Warp Riders
                            </div>
                            <a href='https://create.zora.co/editions/0xcaa316d4831e5486f05fad91d55910bc6b369438'>
                                <Image src="https://ipfs.io/ipfs/bafybeicwiyesnrznxhsyedw46wfsxue47j43alunreacw2zpj7mqu3gady"
                             width={500}
                             height={500}
                             className="rounded-xl"
                             />
                             </a>
                            <div className="text-center text-col-100 font-ps text-5xl justify-center mt-5" >
                                Web3 Citizen
                            </div>
                            <div className="w-full text-center relative font-bold">
                                {`Minted  ${totalSupply}` + " from 100"}
                            </div>
                            <div className="text-2xl text-left text-col-100 font-bold">Description:</div>
                            <div className='text-justify rounded-xl mb-10'>
                            By getting the Web3 Citizen you are supporting the development of digital public goods for web3 cities. As web3 Citizen you will have to bridge IRL places with the metaverse using Punk Cities. Go outside and collect the public places in your city, just remember to use sunscreen!
                            <br/><br/>
                            Bonus:
                            Boost x2 for Energy Rewards on 5 places minted on Punk Cities.
                            </div>
                             <div className='grid gap-5'>
                                 <MintQuantity colorScheme={heavenly}/>
                                 <button 
                                    className=" text-2xl font-ps p-3 bg-col-200 rounded-xl text-back-500"
                                    onClick={() => mintWrite()}>
                                    Mint for  0.01 Ξ
                                </button>
                            </div>
                         </div>
                        
                        <div className="mt-8 w-full flex flex-row justify-center">
                            
                        </div>
                        <PostMintDialog 
                            publicTxnLoadingStatus={mintWaitLoading}
                            publicTxnSuccessStatus={mintStatus}
                            publicTxnHashLink={mintWaitData}
                            colorScheme={heavenly}
                        />               
                        { mintWaitLoading == true ? (
                            <div className="text-xl justify-center text-center">           
                            <img
                                className="bg-col-100 p-1 rounded-3xl w-fit flex flex-row justify-self-center items-center"
                                width="20px" 
                                src="/SVG-Loaders-master/svg-loaders/tail-spin.svg"
                            />
            

                            </div>   
                            ) : (                  
                            <>       
                            </>                                          
                        )}                         
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Mint
