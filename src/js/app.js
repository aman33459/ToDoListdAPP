App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Tasks.json", function(tasks) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Tasks = TruffleContract(tasks);
      // Connect provider to interact with contract
      App.contracts.Tasks.setProvider(App.web3Provider);
      //App.listenForEvents();
      return App.render();
    });
  },
  addTask : function (){
    var task = $("#taskAdded").val();
    console.log(task);
    $('#taskAdded').val('');
    //$("#taskAdded").empty();
    
     App.contracts.Tasks.deployed().then(function(instance) {
    taskInstance = instance;
    return taskInstance;
  }).then(function (taskIn){
    taskIn.addTask(task).then(function(val) {
        console.log(val);
        return App.render();
    });
  });
  },
  
toggle: function (){
  console.log("called");
  $("#pendingTask input").each(function (){
      if($("#"+this.id).prop('checked') == true){
        var val = this.value;
          App.contracts.Tasks.deployed().then(function(instance) {
          taskInstance = instance;
          return taskInstance;
        }).then(function(taskIn) {
          console.log(val);
          taskIn.toggleTask(val).then(function(val){
            console.log(val);
          return App.render();
          });
        });
      }
  });
  
},
render: function() {
  var taskInstance;
  var loader = $("#loader");
  var content = $("#content");
  loader.show();
  content.hide();
  // Load account data
  web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
      App.account = account;
      $("#accountAddress").html("Your Account: " + account);
    }
  });
  App.contracts.Tasks.deployed().then(function(instance) {
    taskInstance = instance;
    return taskInstance;
  }).then(function(taskIn) {
    var count;
    taskIn.value(App.account).then(function(val){
      count = val.c[0];
      var completedTask = $("#CompletedTask");
      completedTask.empty();
      var pendingTask = $("#pendingTask");
      pendingTask.empty();
      for(var i = 1 ; i <= count;i++){
      var taskList;
      var status;
      taskIn.getTask(i).then(function (task){
          //console.log(task);
          taskList = task;
          
      });
      taskIn.getCompleted(i).then(function (check){
          //console.log(check);
          //console.log(taskList);
          /*if(check){
              completedTask.append("<p>" + taskList + "</p>");
          }
          else{
              pendingTask.append('<div class="checkbox">  <label><input type="checkbox"  id="toggleBox'+ ok +'"  value="'+ok+'">' + taskList + "</label></div>");
              console.log(i);
              ok++;
          }*/
          status = check;
      });
      taskIn.getId(i).then(function(id){
          if(status){
              completedTask.append("<p>" + taskList + "</p>");
          }
          else{
              pendingTask.append('<div class="checkbox">  <label><input type="checkbox"  id="toggleBox'+ id +'"  value="'+id+'">' + taskList + "</label></div>");
          }
      });
      }
    });
    loader.hide();
    content.show();
  }).catch(function(error) {
    console.warn(error);
  });
}
};
$(function() {
  $(window).load(function() {
    App.init();
  });
});
