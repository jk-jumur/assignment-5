const issuesCartContainer = document.getElementById("issuesCartContainer");
const searchBtn = document.getElementById("searchBtn");
const buttons = document.querySelectorAll(".filter-btn");
const issues = document.getElementById("issues");
const loading = document.getElementById("loading");

let isLoading = false;

//  Fetch Data
const fetchLoading = () => {
  isLoading = true;
  loading.style.display = "flex";

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      displayIssueCarts(data.data);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    })
    .finally(() => {
      isLoading = false;
      loading.style.display = "none";
    });
};


// Search Handle
  const handleSearch = (searchValue) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => displayIssueCarts(data.data));
};

//  Filer Buttons 
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-ghoest", "text-[#64748B]");
    });

    button.classList.remove("btn-ghoest", "text-[#64748B]");
    button.classList.add("btn-primary");

    const filterValue = button.dataset.filter.toLowerCase();
    const cards = issuesCartContainer.children;

    let visibleCount = 0;

    Array.from(cards).forEach((card) => {
      const status = card.dataset.status?.toLowerCase();

      if (filterValue === "all" || status === filterValue) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    issues.innerText = `${visibleCount} Issues`;
  });
});


//issues Cards
const displayIssueCarts = (issueCarts) => {
  issuesCartContainer.innerHTML = "";
  issues.innerText = `${issueCarts.length}`;

  issueCarts.forEach((cart) => {
    const card = document.createElement("div");
    card.dataset.status = cart.status;

    // Status Config
    const statusConfig = {
      open: {
        icon: "./icon/CircleDashed.png",
        bg: "bg-[#CBFADB]",
      },
      closed: {
        icon: "./icon/CheckCircle.png",
        bg: "bg-[#F0E2FF]",
      },
    };

    const config =
      statusConfig[cart.status?.toLowerCase()] || statusConfig.open;

    //  Label config 
    const labelConfig = {
      bug: {
        bg: "bg-[#FEECEC]",
        border: "border-red-300",
        text: "text-[#EF4444]",
        icon: "./icon/BugDroid.png",
      },

      "help wanted": {
        bg: "bg-[#FFF8DB]",
        border: "border-yellow-300",
        text: "text-[#D97706]",
        icon: "./icon/Lifebuoy.png",
      },

      documentation: {
        bg: "bg-[#DCFCE7]",
        border: "border-green-300",
        text: "text-[#16A34A]",
        icon: "./icon/Vector (1).png",
      },
    };

    //  labels
    const labelsMarkup = (cart.labels || [])
      .map((label) => {
        const labelData =
          labelConfig[label.toLowerCase()] || {
            bg: "bg-gray-200",
            border: "border-gray-300",
            text: "text-gray-600",
            icon: "",
          };

        return `
          <div class="${labelData.bg} flex gap-1 items-center py-1 px-2 rounded-full w-fit border-2 ${labelData.border}">
            ${
              labelData.icon
                ? `<img src="${labelData.icon}" class="w-6 h-6" />`
                : ""
            }
            <p class="${labelData.text} uppercase text-xs font-semibold tracking-wide">
             ${label.toUpperCase()}
             </p>
          </div>
        `;
      })
      .join("");

    //  card html
    card.innerHTML = `
      <div class="cart bg-white p-2 space-y-4 rounded-xl shadow-sm hover:shadow-lg transition-all h-full border-t-2 ${
        cart.status === "open"
          ? "border-[#00A96E]"
          : cart.status === "closed"
          ? "border-[#A855F7]"
          : ""
      }">

        <!-- status + priority -->
        <div class="flex justify-between">

          <img 
            src="${config.icon}" 
            class="${config.bg} p-2 w-8 h-8 rounded-full" 
          />

          <p 
            onclick="document.getElementById('${cart.id}').showModal()" 
            class="${
              cart.priority === "high"
                ? "bg-[#FEECEC] py-2 px-4 rounded-3xl text-[#EF4444]"
                : cart.priority === "medium"
                ? "bg-[#FFF6D1] py-2 px-4 rounded-3xl text-[#D97706]"
                : "bg-[#EEEFF2] py-2 px-6 rounded-3xl text-[#9CA3AF]"
            } uppercase text-center w-fit"
          >
            ${cart.priority}
          </p>
        </div>

        <h2 class="text-[#1F2937] font-semibold text-xl">${cart.title}</h2>

        <p class="text-[#64748B] line-clamp-2">${cart.description}</p>

        <!--- label --->
         <div class="flex flex-wrap  gap-x-2 gap-y-1 mt-3">
          ${labelsMarkup}
         </div>

        <hr class="text-gray-300 mt-3">

        <p class="text-[#64748B]">#1 by ${cart.assignee || cart.author}</p>
        <p class="text-[#64748B]">1/15/2024</p>
      </div>

  

      <!-- MODAL -->
      <dialog id="${cart.id}" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box max-w-2xl p-8 rounded-2xl">
          <!-- Title -->
          <h2 class="text-2xl font-bold text-[#1F2937] mb-4">${cart.title}</h2>

      
          <div class="flex items-center gap-3 mb-6">
            <span class="${
              cart.status === "open" ? "bg-[#00A96E]" : "bg-purple-300"
            } text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              ${cart.status}
            </span>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <span class="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <p>Opened by <span class="font-semibold text-gray-700">${cart.author}</span></p>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <span class="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <p>${new Date (cart?.updatedAt).toLocaleDateString('en-US', {
                     year: 'numeric',
                     month: '2-digit',
                     day: '2-digit',
                      }) || '22/02/2026'}</p>
                  </div>
              </div>

          <!-- Labels in Modal -->
          <div class="flex flex-wrap gap-2 mb-6">
            ${labelsMarkup}
          </div>

          <!-- Description -->
          <p class="text-[#64748B] text-base leading-relaxed mb-8">
            ${cart.description}
          </p>

          <!-- Details Grid (Assignee & Priority) -->

          <div class="grid grid-cols-2 gap-4 p-6 bg-[#F8FAFC] rounded-xl mb-6">
            <div>
              <p class="text-gray-400 text-xs uppercase font-bold mb-1">Assignee:</p>
              <p class="text-[#1F2937] font-bold">${cart.assignee}</p>
            </div>
            <div>
              <p class="text-gray-400 text-xs uppercase font-bold mb-1">Priority:</p>
              <span class="${
                cart.priority === "high" ? " bg-[#EF4444] text-white py-1 px-3 rounded-full" : 
                cart.priority === "medium" ? " bg-[#D97706] text-white py-1 px-3 rounded-full" : " bg-[#9CA3AF] text-white py-1 px-3 rounded-full"
              } font-extrabold uppercase text-sm">
                ${cart.priority}
              </span>
            </div>
          </div>

          <!-- Close Button -->
          <div class="modal-action">
            <form method="dialog">
              <button class="btn bg-[#4A00FF] hover:bg-[#3b00cc] text-white  border-none outline-none  px-8 rounded-lg capitalize">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    `;

    issuesCartContainer.appendChild(card);
  });
};

//Search Issues

searchBtn.addEventListener("click", ()=>{
       const searchInput = document.getElementById("searchInput").value
       handleSearch(searchInput);
})
// Init 
fetchLoading();