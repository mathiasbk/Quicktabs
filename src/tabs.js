class Tabs  {

    constructor(options = {}) 
    {

      const defaultOptions = {
        activeTab: 0,
        tablinksClass: "tablink",
        containerId: "tab-container",
      };

      this.settings = { ...defaultOptions, ...options };
      this.container = document.getElementById(this.settings.containerId);
      this.links = document.querySelectorAll(this.settings.tablinksClass);

      if (!this.container) {
        console.error("Tab container not found");
        return;
      }

      if (!this.links) {
        console.error("Tab links not found");
        return;
      }

      console.log(this.links);
      // Add event listeners for click
      this.links.forEach((link, index) => {
        link.addEventListener("click", (event) => {

          event.preventDefault();

          this.UpdateURL(link.textContent);
          this.UpdateContent(link);

        });
      });

      //TODO: Add event listeners for mouseover for prefetching the content.

    }

    UpdateContent(clickedtab)
    {
      console.log("clickedtab", clickedtab);

      var pagelink = clickedtab.getAttribute("href");
      if(!pagelink || pagelink == "#")
      {
        return;
      }
      console.log("pagelink", pagelink);

      this.FetchContent(pagelink).then((content) => {
        this.container.innerHTML = content;
      });
      
    }

    //Gets the tabcontent from backend
    FetchContent(pagelink)
    {
      return fetch(pagelink)
        .then(response => response.text())
        .then(data => {
          return data;
      })
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
}