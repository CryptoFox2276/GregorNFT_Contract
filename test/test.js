const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LASMBOOST", function() {
    let owner, addr1, addr2, addr3, addr4;
    let LASMBOOST, lasmboost;
    it("Deploy contract", async function() {
        LASMBOOST = await ethers.getContractFactory("LasMetaGameBooster");
        lasmboost = await LASMBOOST.deploy();
        await lasmboost.deployed();
    })

    it("Setting config", async function() {
        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
        await lasmboost.setBaseURI("https://ipfs.io/ipfs/Qmcgp4ojGjH7K4nJJQAzpY8QQLE2VZshci1mrJoW81X537/");
        await lasmboost.setEnableMint(true);
    })

    it("Add whitelist", async function() {
        let whitelist = [];

        whitelist.push(addr1.address);
        whitelist.push(addr2.address);

        await lasmboost.addWhitelist(whitelist);
    })

    it("Starting presale mint", async function() {
        await lasmboost.setPresale();
    })

    it("Whitelist mint", async function() {
        let pre_sale_max = await lasmboost.PRE_SALE_MAX();

        console.log("addr1 balance before wl mint", ethers.utils.formatEther(await addr1.getBalance()));

        await lasmboost.freeMint(parseInt(pre_sale_max));
        await lasmboost.connect(addr1).freeMint(parseInt(pre_sale_max));
        await lasmboost.connect(addr2).freeMint(3);

        console.log("addr1 balance after wl mint", ethers.utils.formatEther(await addr1.getBalance()));
    })

    it("Starting pubsale mint", async function() {
        await lasmboost.setPubsale();
    })


    it("Pubsale mint by addr1", async function() {
        let pubsale_max = await lasmboost.PUB_SALE_MAX();
        console.log("addr1 balance before public mint", ethers.utils.formatEther(await addr1.getBalance()));
        await lasmboost.connect(addr1).mint(parseInt(pubsale_max), {value: ethers.utils.parseEther("1")})
        console.log("addr1 balance after public mint", ethers.utils.formatEther(await addr1.getBalance()));

    })
    it("Pubsale mint by addr2", async function() {
        let pubsale_max = await lasmboost.PUB_SALE_MAX();
        console.log("addr2 balance before public mint", ethers.utils.formatEther(await addr2.getBalance()));
        await lasmboost.connect(addr2).mint(parseInt(pubsale_max), {value: ethers.utils.parseEther("1")})
        console.log("addr2 balance after public mint", ethers.utils.formatEther(await addr2.getBalance()));
    })
    it("Pubsale mint by addr3", async function() {
        let pubsale_max = await lasmboost.PUB_SALE_MAX();
        console.log("addr3 balance before public mint", ethers.utils.formatEther(await addr3.getBalance()));
        await lasmboost.connect(addr3).mint(parseInt(pubsale_max), {value: ethers.utils.parseEther("1")})
        console.log("addr3 balance after public mint", ethers.utils.formatEther(await addr3.getBalance()));
    })

    it("Setting airdrop", async function() {
        await lasmboost.airdrop([addr1.address, addr2.address], [3, 5]);
        let tx = await lasmboost.getClaimableAmount(addr1.address);
        console.log(tx);
        tx = await lasmboost.getClaimableAmount(addr2.address);
        console.log(tx);
    })

    it("Claiming", async function() {
        let tx = await lasmboost.connect(addr1).claim();
        await tx.wait();
        await lasmboost.connect(addr2).claim();
        await tx.wait();
    })

    it("withdrawAll", async function() {
        console.log("owner balance before withdraw", ethers.utils.formatEther(await owner.getBalance()))
        await lasmboost.withdrawAll();
        console.log("owner balance after withdraw", ethers.utils.formatEther(await owner.getBalance()))
    })

    it("Result", async function() {
        console.log("total supply:", await lasmboost.totalSupply())
        console.log("Whitelist mint amount:", await lasmboost.totalPresaleMinted())
        console.log("Pubsale mint amount:", await lasmboost.totalPubsaleMinted())

        console.log("-----------------------");
        let tx0 = await lasmboost.tokensOfOwner(owner.address);
        console.log(tx0);
        let tx1 = await lasmboost.tokensOfOwner(addr1.address);
        console.log(tx1);
        let tx2 = await lasmboost.tokensOfOwner(addr2.address);
        console.log(tx2);
        let tx3 = await lasmboost.tokensOfOwner(addr3.address);
        console.log(tx3);
        // let res = await lasmboost.totalSupply();
        // let tx;
        // for(let i = 1 ; i < parseInt(res) ; i ++) {
        //     tx = await lasmboost.getTokenMintInfo(i);
        //     console.log(tx.creater, new Date(parseInt(tx.mintedTimestamp) * 1000))
        // }
        console.log("-----------------------");
    })

})