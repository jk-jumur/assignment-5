const issuesCartContainer = document.getElementById("issuesCartContainer");

const loading = document.getElementById("loading");
 let isLoading = true;


const fetchLoading = () =>{
      isLoading = true;
      loading.style.display = "flex";
      fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
      .then((res) => res.json())
      .then((data) => {
        displayIssueCarts(data.data)
        isLoading = false;
        loading.style.display = "none";
    });
}

const displayIssueCarts = (issueCarts) =>{
        issuesCartContainer.innerHTML = "";
     issueCarts.forEach(cart => {
          const card = document.createElement("div");
         
                // Icons
          const iconMap = {
             high: {
                icon: "./icon/CircleDashed.png",
                bg: "bg-[#CBFADB]"
             },

          medium: {
              icon: "./icon/CircleDashed.png",
             bg: "bg-[#CBFADB]"
             },

              low: {
               icon: "./icon/CheckCircle.png",
              bg: "bg-[#F0E2FF]"
           }
           };
                 
           card.innerHTML = `
                  <div class="cart bg-white p-2 space-y-4 rounded-xl shadow-sm hover:shadow-lg transition-all h-full border-t-2 ${cart.status === "open"? "border-[#00A96E]" : cart.status === "closed"? "border-[#A855F7]" : ""}">
                  
                  <!-- Icons and badge --> 
                  <div class="flex justify-between">

                  <img 
                    src="${iconMap[cart.priority].icon}"
                     alt="${cart.priority}"
                       class="${iconMap[cart.priority].bg} p-2 w-8 h-8 rounded-full" />
                 
                   
                  <p class="${cart.priority === "high"? "bg-[#FEECEC] py-2 px-4 rounded-3xl text-[#EF4444] text-center  w-fit  uppercase " : cart.priority === "medium"? "bg-[#FFF6D1] py-2  px-4 rounded-3xl text-[#D97706] text-center  w-fit  uppercase" : cart.priority === "low"? "bg-[#EEEFF2]  py-2 px-6 rounded-3xl text-[#9CA3AF] text-center  w-fit  uppercase " : ""}">${cart.priority}</p>

                   </div>
                   <!-- Text -->
                   
                   <h2 class="text-[#1F2937] font-semibold text-xl">${cart.title}</h2> 
                   
                   <p class="text-[#64748B] line-clamp-2">${cart.description}</p>
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

                      <p class="text-[#64748B]">#1 by ${cart.assignee}</p> 
                      <p class="text-[#64748B]">1/15/2024</p> 
                      </div>`; 

                    issuesCartContainer.appendChild(card);
           
      })
}

fetchLoading();