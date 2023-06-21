const { expect } = require("chai");
const { ethers } = require("hardhat");

const fs = require("fs");

const burningAddress = ethers.constants.AddressZero;

describe("GoldTier", function() {
    const SUPPLY_MAX = 9500;
    const oldContractAddress = "0x450BF41e6F793e2940dE5a05473E19BB0fE5ccc9";
    let owner, addr1, addr2, addr3, addr4;
    let contractOwner;
    let buyerInfos;
    let buyerAddressList = [];
    let GOLD, gold, oldContract;
    it("Getting old Contract", async function() {
        oldContract = await ethers.getContractAt("GoldTier", oldContractAddress);
    })

    it("Deploying new contract", async function() {
        GOLD = await ethers.getContractFactory("GoldTier");
        gold = await GOLD.deploy();
        await gold.deployed();
        console.log("Deployed contract address:", gold.address);
        contractOwner = await gold.owner();
        console.log("Owner address:", contractOwner);
    })

    it("Setting baseURI", async function() {
        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    })

    it("Setting buyer information", async function() {
        fs.readFile("buyerInformationForGold_demo.json", async function(err, buf) {
            if(err) console.error("Error while reading buyerInformationForGold_demo.json file:", err)
            else {
                buyerInfos = JSON.parse(buf.toString());

                for(let i = 0 ; i < buyerInfos.length ; i ++) {
                    buyerAddressList.push(buyerInfos[i].address);
                }

                await gold.addBuyerlist(buyerAddressList);
            }
        })
    })

    it("Minting " + SUPPLY_MAX + " Gold NFT", async function() {
        await gold.mint(SUPPLY_MAX);
    })

    it("Migrating NFTs of addr3", async function() {
            let res = buyerInfos?.filter(ele => ele.address == addr3.address);
            let tokenIds = [];
            res?.forEach(element => {
                tokenIds.push(element.tokenid);
            });

            console.log(tokenIds);

            // Burning old nfts
            tokenIds.forEach(id => {
                oldContract.connect(addr3).transferFrom(addr3, burningAddress, id);
            })

            // migrating new nfts
            if(tokenIds.length > 0) {
                await gold.migrate(addr3.address, tokenIds);
            }
    })

    it("Migrating error with invalid tokenid", async function() {
        await gold.migrate(addr3.address, [9500]);
    })

    it("Migrating error with unavailable address", async function() {
        await gold.migrate(addr1.address, [1]);
    })

    it("Result", async function() {
        console.log(await gold.ownerOf(0));
    })
})

describe("PlatinumTier", function() {
    const SUPPLY_MAX = 500;
    const oldContractAddress = "0xF3aCb08217714C802574aE4E03F5a21FB71636BB";
    let owner, addr1, addr2, addr3, addr4;
    let contractOwner;
    let buyerInfos;
    let buyerAddressList = [];
    let PLATINUM, platinum, oldContract;
    it("Getting old Contract", async function() {
        oldContract = await ethers.getContractAt("PlatinumTier", oldContractAddress);
    })

    it("Deploying new contract", async function() {
        PLATINUM = await ethers.getContractFactory("PlatinumTier");
        platinum = await PLATINUM.deploy();
        await platinum.deployed();
        console.log("Deployed contract address:", platinum.address);
        contractOwner = await platinum.owner();
    })

    it("Setting baseURI", async function() {
        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    })

    it("Setting buyer information", async function() {
        fs.readFile("buyerInformationForPlatinum_demo.json", async function(err, buf) {
            if(err) console.error("Error while reading buyerInformationForPlatinum_demo.json file:", err)
            else {
                buyerInfos = JSON.parse(buf.toString());

                for(let i = 0 ; i < buyerInfos.length ; i ++) {
                    buyerAddressList.push(buyerInfos[i].address);
                }

                await platinum.addBuyerlist(buyerAddressList);
            }
        })
    })

    it("Minting " + SUPPLY_MAX + " Platinum NFT", async function() {
        await platinum.mint(SUPPLY_MAX);
    })

    it("Migrating NFTs of addr3", async function() {
            let res = buyerInfos.filter(ele => ele.address == addr3.address);
            let tokenIds = [];
            res?.forEach(element => {
                tokenIds.push(element.tokenid);
            });

            console.log(tokenIds);

            // Burning old nfts
            tokenIds.forEach(id => {
                oldContract.connect(addr3).transferFrom(addr3, burningAddress, id);
            })

            // migrating new nfts
            if(tokenIds.length > 0) {
                await platinum.migrate(addr3.address, tokenIds);
            }
    })

    it("Result", async function() {
        console.log(await platinum.ownerOf(0));
    })
})