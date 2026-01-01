console.log("JS is ready");

function addTask() {
    // 获取表格元素
    var table = document.getElementById("table");
    // 检查表格是否存在
    if (!table) {
    console.error('Table element not found! Check your HTML structure.');
    return;
    }
    // 获取表格的当前行数
    var length = document.getElementsByTagName("tr").length;
    console.log(length);


    // 在表格末尾插入新行
    var newRow = table.insertRow(length);
    console.log(newRow);
    // 在新行中插入单元格
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    // 向单元格中添加内容
    cell1.innerHTML = "新任务";
    cell2.innerHTML = "未完成";
    cell3.innerHTML = "<button onclick='markComplete(this)'>完成</button> <button onclick='deleteTask(this)'>删除</button>";
}

// 标记任务为完成
function markComplete(btn) {
    // 获取按钮所在的行
    var row = btn.parentNode.parentNode;
    // 修改状态单元格的内容
    row.cells[1].innerHTML = "已完成";
}




// 删除任务
function deleteTask(btn) {
    // 获取按钮所在的行
    var row = btn.parentNode.parentNode;
    // 删除该行
    row.parentNode.removeChild(row);
}

// 清除所有任务
function clearTasks() {
    var table = document.getElementById("table");
    // 删除除表头外的所有行
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    console.log("所有任务已清除");
}

// 数据的本地保存
function saveTasks() {
    var table = document.getElementById("table");
    var tasks = [];
    // 遍历表格的每一行，跳过表头
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var task = {
            name: row.cells[0].innerText,
            status: row.cells[1].innerText
        };
        tasks.push(task);
    }
    // 将任务数组保存到本地存储
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("任务已保存到本地存储");
}

// 页面加载时从本地存储加载任务
window.onload = function() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            addTask();
            var table = document.getElementById("table");
            var row = table.rows[table.rows.length - 1];
            row.cells[0].innerText = task.name;
            row.cells[1].innerText = task.status;
            console.log("任务已从本地存储加载");
        }
    }
}
