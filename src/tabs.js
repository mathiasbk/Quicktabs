class Tabs
{

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

        this.settings = {
            ...defaultOptions,
            ...options
        };
        this.container = document.getElementById(this.settings.containerid);
        this.links = document.querySelectorAll(this.settings.tablinksclass);
        this.linkArray = Array.from(this.links);

        if (!this.container)
        {
            console.error("Tab container not found");
            return;
        }

        if (!this.links)
        {
            console.error("Tab links not found");
            return;
        }

        if (this.settings.loadinganimation)
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

        // Add event listeners for click
        this.links.forEach((link, index) =>
        {
            link.addEventListener("click", (event) =>
            {
                event.preventDefault();
                this.LoadingAnimation(true);
                this.UpdateURL(link.textContent);

                if (!this.PrefetchedQued)
                {
                    this.setActiveTab(index);
                }
                else
                {
                    this.UpdateContentAfterPrefetch = true
                }
            });
        });

        //Add eventlistners for mouseover for prefetching the content
        if (this.settings.prefetching)
        {
            this.links.forEach((link, index) =>
            {
                link.addEventListener("mouseover", (event) =>
                {
                    this.PrefetchedID = index;
                    this.PrefetchActive = true;
                    this.Prefetchcontent = this.PrefetchContent(link.getAttribute("href"), index);
                });
            })
        }

        //Check if there is a hash in the url on pageload.
        if (window.location.hash)
        {
            var requestedHash = decodeURIComponent(window.location.hash.substring(1));

            console.log("Hash:", requestedHash);
            this.setActiveTab(requestedHash);
        }
        else
        {
            this.setActiveTab(0);
        }
    }

    //set the active tab
    setActiveTab(tabIdentifier)
    {
        let tabIndex;
        // Choose tab index based on input (indeks or name)
        if (typeof tabIdentifier === "number")
        {
            tabIndex = tabIdentifier;
        }
        else if (typeof tabIdentifier === "string")
        {
            tabIndex = this.linkArray.findIndex(
                (link) => link.textContent.trim() === tabIdentifier
            );
        }
        else
        {
            console.error("Invalid tab identifier");
            return;
        }
        if (tabIndex < 0 || tabIndex >= this.linkArray.length)
        {
            console.error("Tab index out of range");
            return;
        }

        const link = this.linkArray[tabIndex];
        this.UpdateURL(link.textContent);

        this.linkArray.forEach((link) =>
        {
            link.classList.remove("active");
        });

        link.classList.add("active");

        this.LoadingAnimation(true);

        const pagelink = link.getAttribute("href");
        if (!pagelink || pagelink === "#")
        {
            this.LoadingAnimation(false);
            return;
        }

        this.GetContent(link, tabIndex)
            .then((content) =>
            {

                this.container.innerHTML = this.decodeHTML(content);
            })
            .catch((error) =>
            {
                console.error("Error getting content:", error);
            })
            .finally(() =>
            {});

    }
    async GetContent(clickedtab, tabindex)
    {
        var pagelink = clickedtab.getAttribute("href");

        if (!pagelink || pagelink == "#")
        {
            return Promise.resolve(null);
        }


        if (!this.PrefetchActive && this.PrefetchedID == tabindex && this.Prefetchcontent)
        {
            return Promise.resolve(this.Prefetchcontent);
        }

        return this.FetchContent(pagelink).then((content) =>
        {
            console.log("test2 - " + pagelink + " - " + content);
            return content;
        });

    }

    //Gets the tabcontent from backend
    FetchContent(pagelink)
    {
        return fetch(pagelink)
            .then(response => response.text())
            .then(data =>
            {
                return data
            })
            .catch(error => console.error('Error:', error));
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

        if (this.UpdateContentAfterPrefetch)
        {
            this.UpdateContentAfterPrefetch = false;
            //this.UpdateContent(this.links[this.PrefetchedID], this.PrefetchedID);
            this.setActiveTab(this.PrefetchedID);
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
        this.container.innerHTML = "";
        this.container.appendChild(loadingdiv);

    }
    decodeHTML(html)
    {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
}