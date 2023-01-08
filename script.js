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
        highlight.push(i+start); // shows cycling through array A
        highlight2.push(j+A.length+start); // shows cycling through array B
        pvt.push(k); // shows progress in creating C (sorted A+B)
    }
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
    
    return res;
}

async function mainMS() {
    buffer=[];
    highlight = [];
    highlight2 = [];
    pvt = [];
    MergeSort(array.slice(0,array.length),0);
    for (var i in buffer) {
        drawArr(buffer[i],highlight[i],highlight2[i],pvt[i]);
        await wait();
    }
    drawArr(array);
}

function wait() {
    return new Promise((res)=>{setTimeout(()=>{res();},50)});
}

function generateArr(scale) {
    document.getElementById("number").value=scale;
    var A = [];
    
    while (A.length < scale) {
        var r = Math.floor(Math.random() * (580)) + 1;
        if (A.indexOf(r) == -1) {
            A.push(r);
        }
    }
    array=A;
    drawArr(array);
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
        buffer.push(A.slice(0, A.length));
        highlight.push(i); // everything to the left of h1 is < pivot
        highlight2.push(j); // everything between i and j is > pivot
        pvt.push(s); // everything to the right of pvt is sorted
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
    QuickSort(A, s, j);
    QuickSort(A, j+1, e);
    return A;
}

async function mainQS() {
    buffer = [];
    highlight = [];
    highlight2 = [];
    pvt = [];
    QuickSort(array, 0, array.length-1);
    for (var i in buffer) {
        drawArr(buffer[i], highlight[i], highlight2[i], pvt[i]);
        await wait();
    }
    drawArr(array);
}

function SelectionSort(A, s, e, k) {
    var x = A[Math.floor(Math.random() * (e-s + 1)) + s];
    Pivot(A, s, e, x);
    var j = A.indexOf(x);
    if (j > k) {
        return SelectionSort(A, s, j-1, k);
    }
    if (j < k) {
        return SelectionSort(A, j+1, e, k);
    }
    else {
        return x;
    }
}

async function mainSS() {
    document.getElementById("status").innerHTML = null;
    var k = document.getElementById("orderStat").value;
    if (k.length == 0 || k < 1 || k > array.length) {
        document.getElementById("status").innerHTML = 'Please enter a valid kth order statistic.';
        return;
    }
    
    buffer = [];
    highlight = [];
    highlight2 = [];
    pvt = [];

    var x = SelectionSort(array, 0, array.length-1, k-1);

    for (var i in buffer) {
        drawArr(buffer[i], highlight[i], highlight2[i], pvt[i]);
        await wait();
    }
    drawArr(array, array.indexOf(x));
    document.getElementById("resultHeader").innerHTML = k + ' order statistic:';
    document.getElementById("result").innerHTML = x;
}

function BubbleSort(A) {
    for (i = 0; i < A.length; i++) {
        for (j = A.length-1; j > i; j--) {
            if (A[j] < A[j-1]) {
                swap(A, j, j-1);
            }
            buffer.push(A.slice(0,A.length));
            highlight.push(j-1);
        }
    }
    return A;
}

async function mainBS() {
    buffer = [];
    highlight = [];
    BubbleSort(array);
    for (var i in buffer) {
        drawArr(buffer[i],highlight[i]);
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
            buffer.push(A.slice(0,A.length));
            highlight.push(i);
        }
        A[i+1] = key;
    }
}

async function mainIS() {
    buffer = [];
    highlight = [];
    InsertionSort(array);
    for (var i in buffer) {
        drawArr(buffer[i],highlight[i]);
        await wait();
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 1020;
const CANVAS_HEIGHT = canvas.height = 600;
var array;
var buffer = [];
var highlight = [];
var highlight2 = [];
var pvt = [];
var delayInMilliseconds = 150;

function drawArr(A,h1,h2,pvt) {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (i = 0; i < A.length; i++) {
        if (i == pvt) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle="blue";
            ctx.rect(10 * (i+1), 10, 5, A[i]);
            ctx.stroke();
        }
        else if (i == h1 || i == h2) {
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
