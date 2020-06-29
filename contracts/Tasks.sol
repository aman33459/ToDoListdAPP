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
	//
	// mapping[address] =>info
	// address info { count and mapping[cout]=>list }   
	/*
		List
		id
		string
		completed
	*/
	event Taskadded(string _task ,uint id , bool completed ,  uint _value);
	event tasktoggle(string _task ,uint id , bool completed ,  uint _value);
	mapping (address => Info)  public value;
	function getTask(uint id) public view  returns (string memory){
			return value[msg.sender].task[id].task;
	}
	function getCompleted(uint id) public view  returns (bool){
			return value[msg.sender].task[id].completed;
	}
	function addTask(string memory _task) public{
		Info memory info;
		info  =  value[msg.sender];
		value[msg.sender].task[info.count+1] = TaskList(info.count+1 , _task, false);
		value[msg.sender] = Info(info.count+1);
		emit Taskadded(value[msg.sender].task[info.count+1].task , value[msg.sender].task[info.count+1].id , value[msg.sender].task[info.count+1].completed , info.count+1);
	}
	function toggleTask(uint id) public {
		value[msg.sender].task[id].completed= true;
		emit tasktoggle(value[msg.sender].task[id].task , value[msg.sender].task[id].id , value[msg.sender].task[id].completed , id);
	}
	/*
	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}*/
}
