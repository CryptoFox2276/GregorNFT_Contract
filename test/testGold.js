const { expect } = require("chai");
const { ethers } = require("hardhat");

const fs = require("fs");

describe("GoldTier", function() {
    const SUPPLY_MAX = 9500;
    const oldContractAddress = "0x450BF41e6F793e2940dE5a05473E19BB0fE5ccc9";
    let owner, addr1, addr2, addr3, addr4;
    let contractOwner;
    let res = [];
    let GOLD, gold, PLATINUM, platinum, oldContract;
    it("Getting old Contract", async function() {
        oldContract = await ethers.getContractAt("GoldTier", oldContractAddress);
    })

    it("Deploying new contract", async function() {
        // GOLD = await ethers.getContractFactory("GoldTier");
        // gold = await GOLD.deploy();
        // await gold.deployed();
        // contractOwner = await gold.owner();
    })

    it("Setting baseURI", async function() {
        // [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    })

    it("Getting buyer information", async function() {
        fs.readFile("buyerInformationForGold.json", function(err, buf) {
            if(err) console.error("Error while reading buyerInformationForGold.json file:", err)
            else {
                console.log(buf.toString());
            }
        })
    })

    it("Minting 9500 Gold NFT", async function() {
        // await gold.mint(SUPPLY_MAX);
    })

    // for(let index = 0 ; index < 170; index += 50) {
    //     it("Getting holder's address per tokenid " + index, async function() {
    //         let trx;
    //         for(let i = index ;i < index + 50 ; i ++) {
    //             trx = await oldContract.ownerOf(i);
    //             console.log(i, trx);
    //             res.push({tokenid: i, address: trx});
    //         }        
    //     })
    // }

    it("Result", async function() {
        
        // console.log(res);
        // fs.writeFile("res.json", JSON.stringify(res), function(err, result) {
        //     if(err) console.log('error', err);
        // });
    })
})