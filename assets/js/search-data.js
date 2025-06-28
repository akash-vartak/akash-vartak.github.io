// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "my open-source repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-started-masters-in-computer-science-at-umbc",
          title: 'Started Masters in Computer Science at UMBC.',
          description: "",
          section: "News",},{id: "news-successfully-defended-masters-thesis",
          title: 'Successfully defended Masters Thesis.',
          description: "",
          section: "News",},{id: "news-started-phd-in-computer-science-at-umbc",
          title: 'Started PhD in Computer Science at UMBC.',
          description: "",
          section: "News",},{id: "news-successfully-passed-comprehensive-portfolio-1st-milestone-towards-phd",
          title: 'Successfully passed Comprehensive Portfolio - 1st milestone towards PhD.',
          description: "",
          section: "News",},{id: "news-paper-on-using-gcns-as-meta-classifiers-to-detect-trojaned-dnn-models-published-on-arxiv",
          title: 'Paper on using GCNs as meta-classifiers to detect trojaned DNN models published on...',
          description: "",
          section: "News",},{id: "news-paper-on-using-gcns-as-meta-classifiers-to-detect-trojaned-dnn-models-accepted-at-international-joint-conference-on-neural-networks-2025",
          title: 'Paper on using GCNs as meta-classifiers to detect trojaned DNN models accepted at...',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%6B%61%73%68%76%61%72%74%61%6B@%75%6D%62%63.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/akash-vartak", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/akash-vartak", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0002-0378-9150", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=aM2LUQYAAAAJ", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/akash_vartak", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/akash_vartak", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
