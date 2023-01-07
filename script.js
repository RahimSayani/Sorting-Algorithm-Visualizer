function Merge(A, B, start) {
    var D = array.slice(0,array.length);
    A.push(Infinity);
    B.push(Infinity);
    var C = [];
    i = 0, j = 0, k = start;

    while (i < A.length && j < B.length) {
        if (A[i] == Infinity && B[j] == Infinity) {
            A.pop();
            B.pop();
            break;
        }
        if (A[i] < B[j]) {
            C.push(A[i]);
            D[k] = A[i];
            i++;
        }
        else {
            C.push(B[j]);
            D[k] = B[j];
            j++;
        }
        k++;
        buffer.push(D.slice(0,D.length));
    }
    //buffer.push(D);
    return C;
}

function MergeSort(A, s) {
    if (A.length == 1) {
       return A;
    }
    var q = Math.floor(A.length / 2);
    var res = Merge(MergeSort(A.slice(0,q),s), MergeSort(A.slice(q,A.length),q+s), s);
   
    array.splice(s,res.length);
    for (i = s; i-s < res.length; i++) {
        array.splice(i, 0, res[i-s]);
    }
    
    buffer.push(array.slice(0,array.length));

    return res;
}

async function mainMS() {
    buffer=[];
    console.log(MergeSort(array.slice(0,array.length),0));
    for (var i in buffer) {
        drawArr(buffer[i]);
        await wait();
    }
}

function wait() {
    return new Promise((res)=>{setTimeout(()=>{res();},50)});
}

function generateArr(scale) {
    document.getElementById("number").value=scale;
    console.log(scale);
    var A = [];
    var C = [];
    
    while (A.length < scale) {
        var r = Math.floor(Math.random() * (580)) + 1;
        if (A.indexOf(r) == -1) {
            A.push(r);
        }
    }
    array=A;
    console.log(array);
    drawArr(array,-1);
}

function Pivot(A, s, e, x) {
    var i = s;
    var j = s+1;
    var k = A.indexOf(x);
    swap(A, s, k);

    while (j <= e) {
        if (A[j] > x) {
            j++;
        }
        else {
            swap(A, i+1, j);
            i++;
            j++;
        }
    }
    swap(A, i, s);
    return A;
}

function swap(A, i, j) {
    var temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function QuickSort(A, s, e) {
    if (e-s+1 <= 1) {
        return A;
    }
    var x = A[Math.floor(Math.random() * (e - s + 1) + s)];
    Pivot(A, s, e, x);
    var j = A.indexOf(x);
    drawArr(A,j);
    setTimeout(function () {
        QuickSort(A, s, j);
        QuickSort(A, j+1, e);
        return A;
    },delayInMilliseconds);
    
}

function mainQS() {
    QuickSort(array, 0, array.length-1);
}

function SelectionSort(A, s, e, k) {
    var x = A[Math.floor(Math.random() * (e-s + 1)) + s];
    Pivot(A, s, e, x);
    var j = A.indexOf(x);
    drawArr(A,j);
    setTimeout(function () {
        if (j > k) {
            return SelectionSort(A, s, j-1, k);
        }
        if (j < k) {
            return SelectionSort(A, j+1, e, k);
        }
        else {
            console.log(x);
            document.getElementById("result").innerHTML = x;
            return x;
        }
    },delayInMilliseconds);
}

function mainSS() {
    document.getElementById("status").innerHTML = null;
    var k = document.getElementById("orderStat").value;
    if (k.length == 0 || k < 1 || k > array.length) {
        document.getElementById("status").innerHTML = 'Please enter a valid kth order statistic.';
        return;
    }
    
    document.getElementById("resultHeader").innerHTML = k + ' order statistic:';
    SelectionSort(array, 0, array.length-1, k-1);
}

function BubbleSort(A) {
    for (i = 0; i < A.length; i++) {
        for (j = A.length-1; j > i; j--) {
            if (A[j] < A[j-1]) {
                swap(A, j, j-1);
            }
            buffer.push(A.slice(0,A.length));
        }
    }
    return A;
}

async function mainBS() {
    buffer = [];
    BubbleSort(array);
    for (var i in buffer) {
        drawArr(buffer[i]);
        await wait();
    }
}

function InsertionSort(A) {
    for (j = 1; j < A.length; j++) {
        key = A[j];
        i = j-1;
        while (i >= 0 && A[i] > key) {
            A[i+1] = A[i];
            i = i-1;
        }
        A[i+1] = key;
        buffer.push(A.slice(0,A.length));
    }
}

async function mainIS() {
    buffer = [];
    InsertionSort(array);
    for (var i in buffer) {
        drawArr(buffer[i]);
        await wait();
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 1020;
const CANVAS_HEIGHT = canvas.height = 600;
var array;
var buffer = [];
var delayInMilliseconds = 150;

function drawArr(A,j) {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (i = 0; i < A.length; i++) {
        if (i == j) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle="red";
            ctx.rect(10 * (i+1), 10, 5, A[i]);
            ctx.stroke();
        }
        else {
            ctx.fillRect(10 * (i+1), 10, 5, A[i]);
        }
    }
}
