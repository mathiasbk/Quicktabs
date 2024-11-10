class Tabs  {

  //TODO: Check if the tab is active fetching already, and dont fetch it again.
    PrefetchActive = false;
    Prefetchcontent = "";
    PrefetchedID;
    PrefetchedQued = false;
    UpdateContentAfterPrefetch = false;

    constructor(options = {}) 
    {

      const defaultOptions = {
        activetab: 0,
        tablinksclass: "tablink",
        containerid: "tab-container",
        prefetching: true,
        loadinganimation: true
      };

      this.settings = { ...defaultOptions, ...options };
      this.container = document.getElementById(this.settings.containerid);
      this.links = document.querySelectorAll(this.settings.tablinksclass);

      if (!this.container) {
        console.error("Tab container not found");
        return;
      }

      if (!this.links) {
        console.error("Tab links not found");
        return;
      }
      
      if(this.settings.loadinganimation)
      {
          // Add css animation for the loading animation
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(styleSheet);
      } 

      console.log(this.links);

      // Add event listeners for click
      this.links.forEach((link, index) => {
        console.log("clicked", link);
        link.addEventListener("click", (event) => {
          

          event.preventDefault();

          //Show loadinganimation
          this.LoadingAnimation(true);

          this.UpdateURL(link.textContent);
          if(!this.PrefetchedQued)
          {
            this.UpdateContent(link, index);
          }
          else
          {
            this.UpdateContentAfterPrefetch = true
          }

        });
      });

      //Add eventlistners for mouseover for prefetching the content
      if(this.settings.prefetching)
      {
          this.links.forEach((link, index) => {
          link.addEventListener("mouseover", (event) => {
            this.PrefetchedID = index;
            this.PrefetchActive = true;
            this.Prefetchcontent = this.PrefetchContent(link.getAttribute("href"), index);
  
          });
        })
      }
    }

    UpdateContent(clickedtab, tabindex)
    {
      console.log("clickedtab", clickedtab);

      var pagelink = clickedtab.getAttribute("href");
      if(!pagelink || pagelink == "#")
      {
        return;
      }
      console.log("pagelink", pagelink);

      if(!this.PrefetchActive && this.PrefetchedID == tabindex && this.Prefetchcontent)
      {
        //console.log("using prefetched content");
        this.container.innerHTML = this.Prefetchcontent;
        return;
      }

      this.FetchContent(pagelink).then((content) => {
        this.container.innerHTML = content;
      });
    
    }

    //Gets the tabcontent from backend
    FetchContent(pagelink)
    {
      return fetch(pagelink)
        .then(response => response.text())
        .then(data => 
          { 
            return data;
          }
        )
        .catch(error => console.error('Error:', error)
      );
    }

    //prefetch the content when the user hovers over the link
    async PrefetchContent(pagelink, linkindex)
    {
      //console.log("prefetching", pagelink);
      this.PrefetchedQued = true;

      const response = await fetch(pagelink);
      const data = await response.text();

      this.Prefetchcontent = data;
      this.PrefetchedID = linkindex;
      this.PrefetchActive = false;

      this.PrefetchedQued = false;

      if(this.UpdateContentAfterPrefetch)
      {
        this.UpdateContentAfterPrefetch = false;
        this.UpdateContent(this.links[this.PrefetchedID], this.PrefetchedID);
      }

      //Hide loadingamination

      return data;
    }

    UpdateURL(sitename)
    {
      //window.location.hash = this.Cleanurl(sitename);
      window.location.hash = sitename;
    }

    Cleanurl(string)
    {
      return string.replace('[^.]*$', '');
    }

    LoadingAnimation(status)
    {

      var loadingdiv = document.createElement("div");
      loadingdiv.classList.add("loadinganimation");
      loadingdiv.style = `
        display: block; 
        position: absolute;
        left: 50%;
        top: 50%;
        animation: spin 1s linear infinite;
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 80px;
        height: 80px;
        animation: spin 2s linear infinite;
      `;

      

      this.container.appendChild(loadingdiv);

    }
}