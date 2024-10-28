console.log("Hello World");
// Reference Counting: Tracks the number of references to each object. When an object has no references, it is considered unreachable and is removed from memory.

// Mark-and-Sweep: Most JavaScript engines use this method.
// It identifies objects that are reachable (or "alive") from root references (e.g., global scope or currently executing functions).
// Unreachable objects are marked for garbage collection.


// Bad practice: Using global variables
let data = [];

function addData() {
    data.push(new Array(1000).fill('memory intensive data'));
}

// Calling addData multiple times accumulates data in memory
addData();
addData();
// In this example, the data array is global and keeps accumulating elements, increasing memory usage. Since it’s global, it won’t be garbage-collected.



function outer() {
    let bigData = new Array(1000).fill('big data'); // Large array

    return function inner() {
        console.log(bigData[0]); // Inner function retains reference to bigData
    };
}

const innerFunc = outer();
innerFunc();

// In this example, bigData will stay in memory as long as innerFunc exists, even though outer() has completed execution.
// This happens because innerFunc holds a closure that retains access to bigData.


function processData() {
    let tempData = new Array(1000).fill('temporary data');
    console.log('Processing data...');

    // tempData is eligible for garbage collection after processData() finishes
}
processData();
// Here, tempData is local to processData and will be marked for garbage collection as soon as the function completes.

function loadData() {
    let data = new Array(1000).fill('data to be cleared');
    console.log('Loaded data...');
    
    // Set data to null to allow garbage collection
    data = null;
}
loadData();
// Setting data to null here signals that the memory occupied by data can be freed up, even if loadData is still in execution, helping to optimize memory usage.


function createButton() {
    const button = document.createElement('button');
    button.textContent = 'Click me';

    function onClick() {
        console.log('Button clicked');
    }

    button.addEventListener('click', onClick);
    document.body.appendChild(button);

    // Remove button but forget to remove event listener - Bad practise.
    // document.body.removeChild(button);


    // Good practise.
    button.removeEventListener('click', onClick);
    document.body.removeChild(button);
}

createButton();

// Summary
// Avoid excessive global variables and long-lived references.
// Be cautious with closures that hold references to large objects.
// Use local variables in functions for better memory optimization.
// Manually set objects to null when they’re no longer needed.
// Remove event listeners to prevent memory leaks in dynamic DOM manipulation.
