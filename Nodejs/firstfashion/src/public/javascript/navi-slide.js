document.addEventListener("DOMContentLoaded",()=>{
    var nav = document.querySelectorAll('.navigation ul li');
    for(var i = 0; i < nav.length; i++){
        nav[i].addEventListener('click',function() {
            for(var i = 0; i < nav.length; i++){
                nav[i].classList.remove('active');
            }
            this.classList.add('active');
        })    
    }
})

