pragma solidity 0.6.7;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Election_with_ERC721 is ERC721
{
	using SafeMath for uint256;
	//set the name and the symbol of our token through openzeppelin contract
	constructor() ERC721("ElectionToken","ETK") public
	 {
         createIDForCandidates(uint(0xb560daA22c3C307a4fcEE0503311a608aa28661E),20,0,"Kheng Chhaya");
         createIDForCandidates(uint(0x9810C947f78bE8edcAB4E56d474960c3eE4495d5),21,0,"Kheng Smeanchey");

	 }

	// struct the candidates properties
	struct Candidates
	{
		uint256 id;
		uint256 age;
		uint256 votedCount;
		string name;
	}
	uint256 private idLimiit = 10**16;
	mapping(address => uint[])private idOwner;
	mapping(uint256 => Candidates) public candidates;
	//create a function to generate the id for candidates
	function generateID(uint256 _id) private view returns(uint256)
	{
		uint256 id = uint(keccak256(abi.encodePacked(_id)));
		return id.mod(idLimiit);
	}
	//create a function to create id
	function createIDForCandidates(uint256 _id,uint256 _age,uint256 _votedCounts,string memory _name) private 
	{

		uint id = generateID(_id);
		assert(_exists(id) != true);
		idOwner[msg.sender].push(id);
		candidates[id] = Candidates(_id,_age,_votedCounts,_name);
		_mint(msg.sender,id);

	}
	function getId() public view returns(uint[] memory _id)
	{
		return idOwner[msg.sender];
	}
	//create ID for voters
	function createIdForVoters(uint256 _candidateId) public
	{
		uint256 id = generateID(uint256(msg.sender));
		require(_exists(id) != true,"this account already voted");
		idOwner[msg.sender].push(id);
		candidates[_candidateId].votedCount++;
		_mint(msg.sender,id);
	
	}

	
	


}