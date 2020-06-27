var tasks = artifacts.require("./Tasks.sol");

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })


  it('lists tasks', async () => {
    const tasks = await this.todoList.value("0x7F586200E08cE4DdcBedb8cA42A0B143948Feaa0")
    //const task = await this.todoList.tasks(taskCount)
    assert.equal(tasks.count.toNumber(), 2)
    assert.equal(tasks.task(1).task, 'Aman')
    assert.equal(tasks.task(1).completed, false)
    assert.equal(tasks.task(1).id, 1)
    assert.equal(tasks.task(2).task, 'ok')
    assert.equal(tasks.task(2).completed, false)
    assert.equal(tasks.task(2).id, 2)
  })

  it('creates tasks', async () => {
    const result = await this.todoList.addTask('A new task',{from: "0xc5698F977689e6479635Feff82B930e74921Eb97"})
    const result1 = await this.todoList.addTask('A new task1',{from: "0x7F586200E08cE4DdcBedb8cA42A0B143948Feaa0"})
    const tasks = await this.todoList.value("0x7F586200E08cE4DdcBedb8cA42A0B143948Feaa0")
    //const task = await this.todoList.tasks(taskCount)
    assert.equal(tasks.count.toNumber(), 3)
    assert.equal(tasks.task(1).task, 'Aman')
    assert.equal(tasks.task(1).completed, false)
    assert.equal(tasks.task(1).id, 1)
    assert.equal(tasks.task(2).task, 'ok')
    assert.equal(tasks.task(2).completed, false)
    assert.equal(tasks.task(2).id, 2)
	assert.equal(tasks.task(3).task, 'A new task1')
    assert.equal(tasks.task(3).completed, false)
    assert.equal(tasks.task(3).id, 3)
	const tasks1 = await this.todoList.value("0xc5698F977689e6479635Feff82B930e74921Eb97")
    //const task = await this.todoList.tasks(taskCount)
    assert.equal(tasks1.count.toNumber(), 1)
    assert.equal(tasks1.task(1).task, 'A new task')
    assert.equal(tasks1.task(1).completed, false)
    assert.equal(tasks1.task(1).id, 1)    
/*

    assert.equal(taskCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'A new task')
    assert.equal(event.completed, false)*/
  })

})
