const { ethers } = require("hardhat");
const fs = require("fs");

const step = 50;

describe("GoldTier", function() {
    const SUPPLY_MAX = 9500;
    const oldContractAddress = "0x450BF41e6F793e2940dE5a05473E19BB0fE5ccc9";
    let res = [];
    let oldContract;
    it("Getting old Contract", async function() {
        oldContract = await ethers.getContractAt("GoldTier", oldContractAddress);
    })

    for(let index = 0 ; index < SUPPLY_MAX; index += step) {
        it("Getting holder's address per tokenid " + (index + step), async function() {
            let trx;
            for(let i = index ;i < index + step ; i ++) {
                trx = await oldContract.ownerOf(i);
                console.log(i, trx);
                res.push({tokenid: i, address: trx});
            }        
        })
    }

    it("Saving", async function() {        
        fs.writeFile("buyerInformationForGold_Staging.json", JSON.stringify(res), function(err, result) {
            if(err) console.log('error', err);
        });
    })
})

describe("PlatinumTier", function() {
    const SUPPLY_MAX = 500;
    const oldContractAddress = "0xF3aCb08217714C802574aE4E03F5a21FB71636BB";
    let res = [];
    let oldContract;
    it("Getting old Contract", async function() {
        oldContract = await ethers.getContractAt("PlatinumTier", oldContractAddress);
    })

    for(let index = 0 ; index < SUPPLY_MAX; index += step) {
        it("Getting holder's address per tokenid " + (index + step), async function() {
            let trx;
            for(let i = index ;i < index + step ; i ++) {
                trx = await oldContract.ownerOf(i);
                console.log(i, trx);
                res.push({tokenid: i, address: trx});
            }        
        })
    }

    it("Saving", async function() {        
        fs.writeFile("buyerInformationForPlatinum_Staging.json", JSON.stringify(res), function(err, result) {
            if(err) console.log('error', err);
        });
    })
})
