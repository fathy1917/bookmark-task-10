var bookmarkInput = document.querySelector(".bookmark");
var urlInput = document.querySelector(".url");
var myRow = document.querySelector(".myRow")


var websiteList ;

    if(localStorage.getItem("website") == null){
        websiteList = [];
    }else {
        websiteList = JSON.parse(localStorage.getItem("website"));
        display();
    }

function add() {

    if(bookmarkInput.classList.contains("is-valid") && urlInput.classList.contains("is-valid")){
        var  website = {
            name : bookmarkInput.value,
            url : urlInput.value,
        };
    
        websiteList.push(website);
        localStorage.setItem("website" , JSON.stringify(websiteList))
        display();
        clear();
    }else {
        alert(`Site Name or Url is not valid, Please follow the rules :
        Site name must contain at least 3 characters 
        Site URL must be a valid one`)
    }


}

function display(){
    var content = "";
    for(var i = 0; i < websiteList.length; i++){
        content +=
        `<div class="col-3 my-2 ">
                        <span>${i+1}</span>
                    </div>
                    <div class="col-3">
                        <p>${websiteList[i].name}</p>
                    </div>
                    <div class="col-3">
                        <button onclick="visit('${websiteList[i].url}')" class="btn btn-success">
                            <i class="fa-solid fa-eye pe-2"></i>
                            Visit
                        </button>
                    </div>
                    <div class="col-3">
                        <button onclick="Delete(${i})" class="btn btn-danger">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                        </button>
        </div>`
    }
    myRow.innerHTML = content;
}

function clear(){
    bookmarkInput.value = "";
    urlInput.value = "";
}


function Delete(deleteIndex){
    websiteList.splice(deleteIndex , 1);
    localStorage.setItem("website" , JSON.stringify(websiteList));
    display(websiteList);
}

function visit(url) {
        window.open(url, '_blank');
}

function validateInputs(element) {
    var regex = {
        bookmark: /^([A-Z]|[a-z]){3,}$/,
        bookmarkUrl:/^(https?:\/\/)?([a-z\d.-]+)\.([a-z.]{2,6})(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i,
    };

    if(regex[element.id].test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
    }else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
    }
}

