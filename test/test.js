const Election_with_ERC721 = artifacts.require("Election_with_ERC721.sol");

contract("Election_with_ERC721",(accounts)=>{
var instance
it("testing createId function",()=>{
	return Election_with_ERC721.deployed().then((ins)=>{
		instance = ins;
		return instance.address;
	}).then((address)=>{
		assert.notEqual(address,0,"Election_with_ERC721 address is 0");
		return instance.balanceOf(accounts[0])
	}).then((balanceOf)=>{
		assert.equal(balanceOf.toNumber(),2,"Your accounts[0] not having 2 tokens");
		return instance.getId()
	}).then((candidates)=>{
		for(i=0;i<candidates.length;i++)
		{
			console.log(candidates[i].toNumber()," : candidates index:",i);

		}
		return instance.transferFrom(accounts[0],accounts[8],8490922037789481);
	}).then((tx)=>{
		return instance.transferFrom(accounts[0],accounts[9],5113588852083291);

	}).then((tx)=>{
		return instance.balanceOf(accounts[0]);
	}).then((balanceOf)=>{
		assert.equal(balanceOf.toNumber(),0,"Your balanceOf is not 0");
	})
});


it("testing createIdForVoters function",()=>{
var instance;
return Election_with_ERC721.deployed().then((ins)=>{
	instance = ins;
	return instance.address
}).then((address)=>{
	assert.notEqual(address,0,"why this instance token address 0");
	return instance.createIdForVoters(8490922037789481);
}).then(function(receipt){
	assert.equal(receipt.logs.length,1,"one trigger event");
	assert.equal(receipt.logs[0].event,"Transfer","Transfer event should trigger");
	assert.equal(receipt.logs[0].args.from,0,"from should be 0");
	assert.equal(receipt.logs[0].args.to,accounts[0],"token to first account");
	assert.equal(receipt.logs[0].args.tokenId.toNumber(),1450912586353163,"Your should receive this 8490922037789481 token id");
	return instance.balanceOf(accounts[0])
}).then((balanceOf)=>{
	assert.equal(balanceOf.toNumber(),1,"accounts[0] should have tokenid one");
	return instance.totalSupply();
}).then((totalSupply)=>{
	assert.equal(totalSupply.toNumber(),3,"not equal 3 totalSupply");
	return instance.createIdForVoters(8490922037789481,{from:accounts[4]});
}).then((receipt)=>{
	return instance.candidates(8490922037789481);
}).then((candidates)=>{
	assert.equal(candidates.votedCount.toNumber(),2,"Kheng Chhaya should have one voted");
	return instance.createIdForVoters(5113588852083291,{from:accounts[5]})
	
}).then((receipt)=>{
	return instance.candidates(5113588852083291);
}).then((candidates)=>{
	assert.equal(candidates.votedCount.toNumber(),1,"Kheng Smeanchey should have 1 votedCount");
	return instance.createIdForVoters(5113588852083291,{from:accounts[6]})
}).then((receipt)=>{
	return instance.candidates(5113588852083291);
}).then((candidates)=>{
	assert.equal(candidates.votedCount.toNumber(),2,"Now Kheng Smeanchey should have two votes");
})



});





})