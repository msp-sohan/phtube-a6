// Category Menu Function
const loadTubeData = async () => {
   const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');  
   const data = await response.json();
   const categories = data.data;

   const categoryMenuDiv = document.getElementById('category-menu');

   // Loop Throw to All Category
   categories.forEach((category) => {
      const categoryMenu = document.createElement('div') 
      
      categoryMenu.innerHTML = `
      <button onclick="categoryBtnHandler(${category.category_id})" class="py-3 px-4 md:px-5 rounded-lg font-medium text-xl btn-active active active:text-white active:bg-[#FF1F3D] hover:bg-[#FF1F3D] hover:text-white focus:font-bold focus:bg-[#FF1F3D] focus:text-white focus:outline-none">${category.category}</button>
      `;
      // append Category on The UI
      categoryMenuDiv.appendChild(categoryMenu);
   });
   // Active Button Method 
   const firstCategoryButton = document.querySelector('#category-menu button');
   if (firstCategoryButton) {
      firstCategoryButton.focus();
   }
   categoryBtnHandler('1000'); 

}

// All Card Display Function
const categoryBtnHandler = async (categoryID) => {
   const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
   const data = await response.json();
   const categoryData = data.data;

   displayCard(categoryData);
}

   const displayCard = (categoryData) => {

      const displaySection = document.getElementById('display-section')
      displaySection.textContent = '';

      // No Content Message Method Here
      const noDataMessage = document.getElementById("no-data-message"); 
      if (categoryData.length === 0) {
         noDataMessage.classList.remove("hidden");
      } else {
            noDataMessage.classList.add("hidden");
      }

      // Applying Short View Method Here
      document.getElementById("shortViews").addEventListener("click", function () {
         categoryData.sort((a, b) => {
           const viewA = a.others.views.split('K')[0];
           const viewB = b.others.views.split('K')[0];
           return viewB - viewA;
         });
         displayCard(categoryData);
      });

      // Loop Throw to All Video Card Item
      categoryData.forEach((card) => {
         // create a Div
         const display = document.createElement('div')
         display.classList = `card card-compact bg-base-100 shadow-xl`
         display.innerHTML = `
         <div class="relative">
         <figure class="bg-gray-200 rounded-t-lg">
            <img src="${card.thumbnail}" alt="PH Tube" class="h-52 w-full"/>
         </figure>
         ${card.others.posted_date? 
            `<p id='timeID' class="absolute bottom-2 right-4 bg bg-black text-[12px] text-white p-2 rounded-lg"><span>${Math.floor(card.others.posted_date.slice(0,5) / 3600)}</span> hrs <span>${Math.floor(card.others.posted_date.slice(0,5) % 60)}</span> min ago</p>`: ''}
         </div>
         <div class="flex gap-4 py-5 px-3">
            <div>
               <img src="${card.authors[0].profile_picture}" alt="" class="w-10 h-10 rounded-full">
            </div>
            <div>
               <h2 class="card-title">${card.title}</h2>
               <p class="py-1">${card.authors[0].profile_name}<span class="ml-3">${card.authors[0].verified?`<i class="fa-solid fa-certificate relative text-2xl text-blue-700"><i class="fa-solid fa-check text-white absolute top-[25%] left-[30%] text-xs"></i></i>
               `:""}</span></p>
               <p>${card.others.views} views</p>
            </div>
         </div>
         `;
            // show all video on the UI
         displaySection.appendChild(display);
      });
   }

loadTubeData()
categoryBtnHandler('1000')

