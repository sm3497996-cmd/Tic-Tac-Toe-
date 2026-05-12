let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")
let turnO = true; // player X, player Y abhi turn O ki h to agr ture to O print ni to X

const WinPatterns = [  // ye 2D array lia h bcz bhut sare win patterns the jinko alg alg array m store krna tha to 2d array li jisse bhut sari array ajaye hame winning patterns chahiye jisse pta chle jite h to ye h vo winpattersn aise line m jeetenge
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetgame = () => {
    let turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {  // ham chahte h ki har ek box ko xlick krke kuch ops perform ho to ham har box mtlb har button ke liye event listner add krdenge to click krne pr vo arrow func ke andr ka kam hoga 
    box.addEventListener("click", () => {
        if (turnO) {  // agr turn O h ture to O print uske bad O ko false krdenge phir ab O ni true to  X phir turn O ko ture krdenge
            box.innerText = "O";  // abhi player 1 ki turn to turn O ture h to O then O ko false bcz ab player 2 ki turn phir vo X dia phir mturn O ko vapis true krdia bcz ab turn O ki chance ayegi
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;   // bcz bar bar fill box m click krte to O ka sign chng hojata X  m and X ka O m but usualyy ek bar fill hogy to vo chng ni hota isly disabled kia
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {  // hamar aek bar winner ajaye to bhi bar bar aur khel ke winner ajate h ek hi game m to vo na aye to disable func bnya jisse ek bar winner ajaye to new game btn pr hi click krna hoga
        box.disabled = true; // sare box means button pr loop chlayege and jaise hi winner ajaye to baki button ko disable krdenge to vo chle gi hi ni
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide"); // jaise hi winner pta chla vaise hi apne msgcontainer se classlist m jo bnay h hide class ko remove krdenge jaise ki winner dikhe and new game
    disableBoxes(); // yha pr apne func ko call krdia
};

const checkWinner = () => {
    for (let pattern of WinPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") { // agr pos1val  pos2val pos3val empty ni hogi to tbhi ham check krnge winning pattern ko
            if (pos1Val === pos2Val && pos2Val === pos3Val) { // agr teeno position ki val same h to winner and konsa pattern h X , O vo bhi pta chlega
                console.log("Winner", pos1Val);  //jeet gye to print winner and pos1val ajayegi mtlb X or O jo bhi jeet vo print ab pos1 ki jo val h vhi pos2 ki and 3 ki h to pos1val print kryi
                showWinner(pos1Val); // ham apne winner ko access kr payege to uske liye ise phle show winner funct bnayege
            }
        }
    }
};

newGamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
