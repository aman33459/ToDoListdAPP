pragma solidity >=0.4.21 <0.7.0;


contract Tasks {

	struct TaskList{
		uint id;
		string task;
		bool completed;
	}
	struct Info{
		uint count;
		mapping (uint => TaskList) task;
	}
	constructor () public{
		addTask('Aman');
		addTask('ok');
	}
	
	// mapping[address] =>info
	// address info { count and mapping[cout]=>list }   
	/*
		List
		id
		string
		completed
	*/
	event Taskadded(string _task ,uint id , bool completed ,  uint _value);
	mapping (address => Info)  public value;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	/*function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}*/
	function addTask(string memory _task) public{
		Info memory info;
		info  =  value[msg.sender];
		value[msg.sender].task[info.count+1] = TaskList(info.count+1 , _task, false);
		value[msg.sender] = Info(info.count+1);
		emit Taskadded(value[msg.sender].task[2].task , value[msg.sender].task[2].id , value[msg.sender].task[2].completed , info.count+1);
	}
	/*
	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}*/
}
