const cartContainer = document.getElementById("cartContainer");
console.log(cartContainer);


const fetchLoading = () =>{
      fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
      .then((res) => res.json())
      .then((data) => {
        displayCarts(data.data)
    });
}

const displayCarts = (carts) =>{

      carts.forEach(cart => {
          const card = document.createElement("div");
           card.className = "w-full";
           card.innerHTML = `
                  <div class="cart bg-white p-2 space-y-4 rounded-xl shadow-sm hover:shadow-lg transition-all">
                  
                  <!-- Icons and badge --> 
                  <div class="flex justify-between">

                  <img src="./icon/CircleDashed.png" alt="" class="bg-[#CBFADB] p-3 w-12 h-12 rounded-full"> <p class="bg-[#FEECEC] py-2 px-6 rounded-3xl text-[#EF4444] w-fit uppercase text-center">High</p> </div>
                   <!-- Text -->
                   
                   <h2 class="text-[#1F2937] font-semibold text-2xl">Fix navigation menu on mobile devices</h2> 
                   
                   <p class="text-[#64748B]">The navigation menu doesn't collapse <br> properly on mobile devices...</p>
                    <!-- Label --> 

                    <div class="labelContainer flex gap-2"> 
                    
                    <div class="bg-[#FEECEC] flex gap-1 items-center py-1 px-2 rounded-full w-fit border-2 border-red-300"> 
                    
                    <img src="./icon/BugDroid.png" alt="" class="w-6 h-6"> 
                    
                    <p class="text-[#EF4444] uppercase">Bug</p> 
                    </div>

                    <div class="bg-[#FFF8DB] flex items-center gap-1 py-2 px-3 rounded-full border-2 border-yellow-300"> 
                    
                    <img src="./icon/Lifebuoy.png" alt="" class="w-6 h-6"> 
                    
                    <p class="text-[#D97706] uppercase">help wanted</p> 
                    </div> 
                    </div>
                     <hr class="text-gray-300 mt-3">

                      <p class="text-[#64748B]">#1 by john_doe</p> 
                      <p class="text-[#64748B]">1/15/2024</p> 
                      </div>` 


                     cartContainer.appendChild(card);
           
      })
}

fetchLoading();